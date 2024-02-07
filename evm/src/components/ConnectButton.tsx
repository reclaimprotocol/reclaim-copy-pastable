import { SetStateAction, useEffect, useState } from "react";
import {
  formatAddress,
  getCurrentChainId,
  handleSwitchToOptGoerli,
} from "../../lib/wallet";
import { OPT_GOERLI } from "../../config/constants";
import SwitchNetwork from "./SwtichNetwork";

interface Window {
  ethereum: any;
}

const ConnectButton = () => {
  const [userAddress, setUserAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [networkChange, setNetworkChange] = useState(false);

  useEffect(() => {
    (window as unknown as Window).ethereum &&
      (window as unknown as Window).ethereum.on(
        "accountsChanged",
        (accounts: SetStateAction<string>[]) => {
          setUserAddress(accounts[0]);
        }
      );
  }, []);

  useEffect(() => {
    (window as unknown as Window).ethereum &&
      setUserAddress((window as unknown as Window).ethereum.selectedAddress);
  }, []);

  useEffect(() => {
    const chain = getCurrentChainId();
    if (chain == OPT_GOERLI) {
      setNetwork(chain);
    } else {
      setNetwork("");
    }
  }, [networkChange]);

  useEffect(() => {
    (window as unknown as Window).ethereum &&
      (window as unknown as Window).ethereum.on(
        "chainChanged",
        (chain: any) => {
          if (chain == OPT_GOERLI) {
            setNetwork(chain);
          }
          {
            setNetwork("");
          }
        }
      );
  }, []);
  useEffect(() => {}, [userAddress]);
  const handleConnect = async () => {
    try {
      if (!(window as unknown as Window).ethereum)
        return alert("Please install metamask ");

      const accounts = await (window as unknown as Window).ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAddress(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object.");
    }
  };
  return (
    <div>
      {userAddress ? (
        <div>{formatAddress(userAddress)}</div>
      ) : (
        <div
          onClick={() => {
            handleConnect();
          }}
        >
          {" "}
          Connect MetaMask{" "}
        </div>
      )}
      <SwitchNetwork isOpt={network != ""} setNetwork={setNetwork} />
    </div>
  );
};

export default ConnectButton;
