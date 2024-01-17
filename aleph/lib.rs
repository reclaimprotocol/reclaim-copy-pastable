#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod aleph {

    use hex_literal::hex;
    use ink::prelude::format;
    use ink::prelude::string::ToString;
    use ink::prelude::vec::Vec;
    use k256::ecdsa::SigningKey;
    use k256::ecdsa::VerifyingKey;
    use keccak_hash::keccak256;
    use reclaim_ink::reclaim::*;
    use reclaim_ink::ReclaimRef;
    use sha2::{Digest, Sha256};

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum AttestorError {
        ProofNotVerified,
    }

    #[ink(storage)]
    pub struct Attestor {
        verifications_count: u8,
        reclaim: Option<AccountId>,
    }

    impl Attestor {
        #[ink(constructor)]
        pub fn new(version: u8, reclaim_hash: Hash) -> Self {
            use ink::ToAccountId;

            let reclaim_ref = ReclaimRef::new()
                .endowment(0)
                .code_hash(reclaim_hash)
                .salt_bytes(
                    &[
                        version.to_le_bytes().as_ref(),
                        Self::env().caller().as_ref(),
                    ]
                    .concat()[..4],
                )
                .instantiate();
            let reclaim =
                <ReclaimRef as ToAccountId<super::aleph::Environment>>::to_account_id(&reclaim_ref);
            Self {
                verifications_count: 0_u8,
                reclaim: Some(reclaim),
            }
        }

        #[ink(constructor)]
        pub fn default() -> Self {
            let code_hash =
                hex!("b0e8d45b4914a03efc2ee4d55ee9001c446a65210df739cac1b7520d64ec2181");
            Self::new(0, code_hash.into())
        }

        #[ink(message)]
        pub fn attestor_verify_proofs(&mut self) -> Result<(), AttestorError> {
            let code_hash =
                hex!("b0e8d45b4914a03efc2ee4d55ee9001c446a65210df739cac1b7520d64ec2181");
            let signing_key = SigningKey::from_slice(&code_hash).unwrap();
            let verifying_key = VerifyingKey::from(&signing_key);
            let str_verifying_key = format!("{:?}", verifying_key);
            let w1 = Witness {
                address: str_verifying_key.clone(),
                host: [1_u8; 32],
            };
            let mut witnesses_vec = Vec::<Witness>::new();
            witnesses_vec.push(w1);
            let minimum_witness = 1;
            if let Some(reclaim) = self.reclaim {
                let _ = <ReclaimRef as ink::env::call::FromAccountId<super::aleph::Environment, > >::from_account_id(reclaim).add_epoch(witnesses_vec, minimum_witness);
            }

            let claim_info = ClaimInfo {
                provider: "provider".to_string(),
                parameters: "{}".to_string(),
                context: "context".to_string(),
            };
            let hashed = claim_info.hash();
            let now = ink::env::block_timestamp::<ink::env::DefaultEnvironment>();
            let complete_claim_data = CompleteClaimData {
                identifier: hashed,
                owner: str_verifying_key,
                epoch: 1_u128,
                timestamp_s: now,
            };
            let mut hasher = Sha256::new();
            let serialised_claim = complete_claim_data.serialise();
            hasher.update(serialised_claim);
            let mut result = hasher.finalize().to_vec();
            keccak256(&mut result);
            let mut sigs = Vec::new();
            let (signature, recid) = signing_key.sign_prehash_recoverable(&result).unwrap();
            let str_signature = format!("{:?}", signature);

            let recid_8: u8 = recid.try_into().unwrap();
            sigs.push((str_signature, recid_8));

            let signed_claim = SignedClaim {
                claim: complete_claim_data,
                bytes: sigs,
            };

            if let Some(reclaim) = self.reclaim {
                let _ = <ReclaimRef as ink::env::call::FromAccountId<super::aleph::Environment, > >::from_account_id(reclaim).verify_proof(claim_info, signed_claim);
            }

            self.verifications_count = self.verifications_count + 1_u8;
            Ok(())
        }

        #[ink(message)]
        pub fn get_verification_count(&self) -> u8 {
            self.verifications_count
        }
    }
}
