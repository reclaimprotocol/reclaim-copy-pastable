import { useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { abi } from "../contracts-artifacts/abi";

export default function VerifyProof() {
  const [dataStr, setDataStr] = useState("{}");
  const [enabled, setEnabled] = useState(false);

  const { config } = usePrepareContractWrite({
    enabled: enabled,
    address: "0xacae5e972FBBEC5cc761a5F75705Ba041AC870Be",
    abi: abi,
    functionName: "verifyProof",
    chainId: 420,
    args: [JSON.parse(dataStr)],
    onSuccess(data) {
      console.log("Successfully Prepared", data);
    },
    onError(error) {
      console.log("Error in Prepare");
      console.log(error);
    },
  });
  const { data, write, isLoading, isSuccess, isError, error } =
    useContractWrite(config);

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSettled(data, error) {
      console.log(data?.logs);
    },
  });

  return (
    <div className="container">
      <p>Please place your proof here!</p>
      <textarea
        className="area"
        rows={25}
        cols={50}
        onChange={(e) => setDataStr(e.target.value)}
      />
      <button
        className="button"
        onClick={() => {
          console.log(enabled);
          setEnabled(!enabled);
        }}
      >
        {!enabled ? "Enable" : "Disable"} Verification Before Sending tx
      </button>
      <button
        className="button"
        disabled={!enabled}
        onClick={() => {
          if (!enabled) {
            return;
          }
          write?.();
        }}
      >
        Verify Proof{isLoading && <p> Proving...</p>}
      </button>

      {isError && <p>{error?.message ?? "Error"}</p>}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .area {
          padding: 10px;
          border: solid 1px #ccc;
          margin: 0 0 20px;
          border-radius: 3px;
        }
        .button {
          border: solid 1px #ccc;
          margin: 0 0 20px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
