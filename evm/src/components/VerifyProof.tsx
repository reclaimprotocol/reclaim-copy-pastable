import { useState } from 'react'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import { abi } from '../contracts-artifacts/abi'
import {
  Button,
  Spinner,
  useToast,
  Text,
  Flex,
  Textarea
} from '@chakra-ui/react'


export default function VerifyProof() {
  const [dataStr, setDataStr] = useState('{}')
  const [enabled, setEnabled] = useState(false)
  const toast = useToast()

  const { config } = usePrepareContractWrite({
    enabled: enabled,
    address: '0xacae5e972FBBEC5cc761a5F75705Ba041AC870Be',
    abi: abi,
    functionName: 'verifyProof',
    chainId: 420,
    args: [JSON.parse(dataStr)],
    onSuccess(data) {
      console.log('Successfully Prepared', data)
    },
    onError(error) {
      console.log('Error in Prepare')
      console.log(error)
      toast({
        title: 'Please Enter a valid proof',
        description: error.message,
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        status: 'error'
      })
    }
  })
  const { data, write, isLoading, isSuccess, isError, error } =
    useContractWrite(config)

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSettled(data, error) {
      toast({
        title: 'tx settled',
        description: '',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        status: 'success'
      })
      console.log(data?.logs)
    }
  })

  return (
    <Flex
      maxWidth={'container.lg'}
      justifyContent={'center'}
      justifyItems={'center'}
      width={'100%'}
    >
      <Flex direction='column' gap='2' minWidth={'600px'}>
        <Text>Please place your proof here!</Text>
        <Textarea onChange={e => setDataStr(e.target.value)} />
        <Button
          disabled={!enabled}
          colorScheme='blue'
          onClick={() => {
            setEnabled(!enabled)
          }}
        >
          {!enabled ? 'Enable' : 'Disable'} Verification Before Sending tx
        </Button>
        <Button
          disabled={!enabled}
          colorScheme='blue'
          onClick={() => {
            if (!enabled) {
              toast({
                title: 'Please enable verify Button',
                description: 'Please enter a valid proof',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
                status: 'error'
              })
              return
            }
            write?.()
          }}
        >
          Verify Proof{isLoading && <Spinner />}
        </Button>

        {isError && <Text>{error?.message ?? 'Error'}</Text>}
      </Flex>
    </Flex>
  )
}
