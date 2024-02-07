import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { formatAddress, getCurrentChainId, handleSwitchToOptGoerli } from "../../lib/wallet";
import { OPT_GOERLI } from "../../config/constants";

interface Window {
  ethereum: any;
}

interface Props {
isOpt: boolean,
setNetwork: Dispatch<SetStateAction<string>>,
}

const SwitchNetwork = ({isOpt, setNetwork} : Props) => {


  return (
    <div>
      {isOpt ? (
        <div>{"Optimism Goerli"}</div>
      ) : (
        <button
          onClick={() => {
            handleSwitchToOptGoerli();
            setNetwork(OPT_GOERLI.toString());
          }}
        >
          {" "}
          Switch to Optimism Goerli{" "}
        </button>
      )}
    </div>
  );
};

export default SwitchNetwork;
