'use client'
import { AppProps } from 'next/app'
import { Providers } from '../components/providers'
import Head from 'next/head'
import dynamic from 'next/dynamic'

function App({ Component, pageProps }: AppProps) {
  return (
    <html lang='en'>
      <Head>
        <title>Dapp EVM Integration - Reclaim</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#ebedff' />
      </Head>
      <body>
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </body>
    </html>
  )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false
})
