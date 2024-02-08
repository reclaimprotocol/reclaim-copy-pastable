import { useState } from "react";
import { Button, Text, Flex, Textarea } from "@chakra-ui/react";
import { callContract } from "../../lib/wallet";

export default function VerifyProof() {
  const [dataStr, setDataStr] = useState("{}");
  const [error, setError] = useState(false);
  const [proved, setProved] = useState(false);

  return (
    <Flex
      maxWidth={"container.lg"}
      justifyContent={"center"}
      justifyItems={"center"}
      width={"100%"}
    >
      <Flex direction="column" gap="2" minWidth={"600px"}>
        <Text>Please place your proof here!</Text>
        <Textarea
          height={350}
          onChange={(e) => {
            setDataStr(e.target.value);
            setError(false);
            setProved(false);
          }}
        />
        <Button
          colorScheme="blue"
          onClick={async () => {
            const hash = await callContract(dataStr);
            if (hash == "0x") {
              setError(true);
            } else {
              setProved(true);
            }
          }}
        >
          Verify Proof
        </Button>
        {error && <p> There was an error, please try again </p>}
        {proved && <p> Proved successfully! </p>}
      </Flex>
    </Flex>
  );
}
