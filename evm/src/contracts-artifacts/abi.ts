export const abi = [
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "string",
                    name: "provider",
                    type: "string",
                  },
                  {
                    internalType: "string",
                    name: "parameters",
                    type: "string",
                  },
                  {
                    internalType: "string",
                    name: "context",
                    type: "string",
                  },
                ],
                internalType: "struct Claims.ClaimInfo",
                name: "claimInfo",
                type: "tuple",
              },
              {
                components: [
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "identifier",
                        type: "bytes32",
                      },
                      {
                        internalType: "address",
                        name: "owner",
                        type: "address",
                      },
                      {
                        internalType: "uint32",
                        name: "timestampS",
                        type: "uint32",
                      },
                      {
                        internalType: "uint32",
                        name: "epoch",
                        type: "uint32",
                      },
                    ],
                    internalType: "struct Claims.CompleteClaimData",
                    name: "claim",
                    type: "tuple",
                  },
                  {
                    internalType: "bytes[]",
                    name: "signatures",
                    type: "bytes[]",
                  },
                ],
                internalType: "struct Claims.SignedClaim",
                name: "signedClaim",
                type: "tuple",
              },
            ],
            internalType: "struct Reclaim.Proof",
            name: "proof",
            type: "tuple",
          },
        ],
        internalType: "struct DemoEVMIntegration.Proof",
        name: "proof",
        type: "tuple",
      },
    ],
    name: "verifyProof",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
