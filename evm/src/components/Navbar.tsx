'use client'

import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  Heading
} from '@chakra-ui/react'
import Link from 'next/link'
import ConnectButton from './ConnectButton'



export default function Navbar () {
    return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          <Flex justifyContent={'center'} gap={'2'} alignItems={'center'}>
            <Link href={'/'}>
              <Heading>Dapp EVM Integration</Heading>
            </Link>
          </Flex>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
             
              <ConnectButton/>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
