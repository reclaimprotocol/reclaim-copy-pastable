import { useState } from 'react'
import {
  Button,
  Spinner,
  useToast,
  Text,
  Flex,
  Textarea
} from '@chakra-ui/react'
import { callContract } from '../../lib/wallet'


export default function VerifyProof() {
  const [dataStr, setDataStr] = useState('{}')
  const [enabled, setEnabled] = useState(false)
  const toast = useToast()

  
 



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
            callContract(dataStr)
            // if (!enabled) {
            //   toast({
            //     title: 'Please enable verify Button',
            //     description: 'Please enter a valid proof',
            //     duration: 5000,
            //     isClosable: true,
            //     position: 'top-right',
            //     status: 'error'
            //   })
            //   return
            // }
            // write?.()
          }}
        >
          Verify Proof
          {/* {isLoading && <Spinner />} */}
        </Button>

        {/* {isError && <Text>{error?.message ?? 'Error'}</Text>} */}
      </Flex>
    </Flex>
  )
}
