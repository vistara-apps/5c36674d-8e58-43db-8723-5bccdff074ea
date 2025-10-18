import type { Metadata } from 'next'
import { Providers } from './components/Providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'SupplyChainGPT',
  description: 'AI-driven supply chain disruption monitoring & automated contingency planning on Base',
  openGraph: {
    title: 'SupplyChainGPT',
    description: 'AI-driven supply chain disruption monitoring & automated contingency planning',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
