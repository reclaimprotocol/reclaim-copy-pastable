'use client'
import { Connected } from '../components/Connected'
import Navbar from '../components/Navbar'
import { Center, Container } from '@chakra-ui/layout'
import VerifyProof from '../components/VerifyProof'

function Page() {
  return (
    <>
      <Navbar showConnectWalletButton />
      <Connected>
        <Center>
          <Container mt={12} maxWidth={'container.lg'}>
            <VerifyProof />
          </Container>
        </Center>
      </Connected>
    </>
  )
}

export default Page
