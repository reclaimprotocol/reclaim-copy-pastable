'use client'
import Navbar from '../components/Navbar'
import { Center, Container } from '@chakra-ui/layout'
import VerifyProof from '../components/VerifyProof'

function Page() {
  return (
    <>
      <Navbar />
        <Center>
          <Container mt={12} maxWidth={'container.lg'}>
            <VerifyProof />
          </Container>
        </Center>
    </>
  )
}

export default Page
