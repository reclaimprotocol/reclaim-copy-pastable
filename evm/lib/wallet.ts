import { ethers } from "ethers";
import { ABI, ADDRESS } from "../config/constants";

interface Window {
  ethereum: any;
}

export const handleSwitchToOptGoerli = async () => {
  (window as unknown as Window).ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [
      {
        chainId: "0x1a4",
      },
    ],
    id: 0,
  });
};

export const getCurrentChainId = () => {
  return (window as unknown as Window).ethereum.chainId;
};

export const callContract = async (data: string) => {
  try {
  const provider = new ethers.BrowserProvider(
    (window as unknown as Window).ethereum
  );
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(ADDRESS, ABI, signer);
  const data_json = [JSON.parse(data)];
  const tx = await contract.verifyProof(data_json);
  return tx.hash;
  }
  catch(e){
    return '0x'
  }
};

export const formatAddress = (address: String) => {
  return address.slice(2, 6) + ".." + address.slice(38, 42);
};
