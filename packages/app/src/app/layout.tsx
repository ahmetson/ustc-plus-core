import type { Metadata, Viewport } from 'next'
import { PropsWithChildren } from 'react'
import { SITE_DESCRIPTION, SITE_EMOJI, SITE_INFO, SITE_NAME, SITE_URL, SOCIAL_TWITTER } from '@/utils/site'
import { Layout } from '@/components/Layout'
import { Web3Provider } from '@/context/Web3'
import { NotificationProvider } from '@/context/Notifications'
import { LiquidityProcessProvider } from '@/context/LiquidityProcesses'
import { cookieToInitialState } from 'wagmi'
import { WALLETCONNECT_CONFIG } from '@/utils/web3'
import { headers } from 'next/headers'
import '../assets/globals.css'

console.log(process.env.NODE_ENV)

export const metadata: Metadata = {
  applicationName: SITE_NAME,
  title: {
    default: `${SITE_NAME} · ${SITE_INFO}`,
    template: `${SITE_NAME} · %s`,
  },
  metadataBase: new URL(SITE_URL),
  description: SITE_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    title: SITE_NAME,
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    type: 'website',
    title: SITE_NAME,
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: '/logo.png',
  },
  twitter: {
    card: 'summary_large_image',
    site: SOCIAL_TWITTER,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: '/logo.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1.0,
  viewportFit: 'cover',
  themeColor: '#000000',
}

export default function RootLayout(props: PropsWithChildren) {
  const initialState = cookieToInitialState(WALLETCONNECT_CONFIG, headers().get('cookie'))

  return (
    <html lang='en'>
      <head>
        <link rel='icon' href={`logo.png`} />
      </head>

      <body
        style={{
          background: 'url("bg.jpg")',
          backgroundSize: 'cover',
        }}>
        <Web3Provider initialState={initialState}>
          <NotificationProvider>
            <LiquidityProcessProvider>
              <Layout>{props.children}</Layout>
            </LiquidityProcessProvider>
          </NotificationProvider>
        </Web3Provider>
      </body>
    </html>
  )
}
