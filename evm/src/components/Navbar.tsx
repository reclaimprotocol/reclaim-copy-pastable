'use client'

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
  Heading
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import Link from 'next/link'

interface Props {
  //   children: React.ReactNode
  showConnectWalletButton?: boolean
}

export default function Navbar ({ showConnectWalletButton }: Props) {
  const showBtn = showConnectWalletButton ?? false
  const { colorMode, toggleColorMode } = useColorMode()
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
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
