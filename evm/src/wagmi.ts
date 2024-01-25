import { getDefaultConfig } from 'connectkit'
import { optimismGoerli} from 'viem/chains'
import { createConfig } from 'wagmi'
import { Chain } from '@wagmi/core'

 
const walletConnectProjectId = '6be37cda619abec4b33405f0a4bfd410'


export const linea = {
  id: 59144,
  name: 'Linea Mainnet',
  network: 'linea mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://linea.drpc.org'] },
    default: { http: ['https://linea.drpc.org'] },
  },
  blockExplorers: {
    etherscan: { name: 'Lineascan', url: 'https://lineascan.build' },
    default: { name: 'Lineascan', url: 'https://lineascan.build' },
  },
} as const satisfies Chain
export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    chains:[optimismGoerli],
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    appName: 'Reclaim - Dapp EVM Integration',
    walletConnectProjectId,
  })
)
