// Rights Reserved, Unlicensed
import type { Metadata } from 'next'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'Secure Health Login',
  description: 'MetaMask login demo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
