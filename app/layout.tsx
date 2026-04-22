import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Sena's Tree Services | Tree Removal & Trimming in Richmond, Henrico, Midlothian & Short Pump, VA",
  description: "Sena's Tree Services offers expert tree removal, trimming, stump grinding, and emergency services in Richmond, Henrico, Midlothian, Short Pump, and Central Virginia. Licensed, insured, and trusted for 10+ years. Free estimates!",
  generator: 'v0.app',
  keywords: ['tree removal Richmond VA', 'tree trimming Henrico', 'stump grinding Midlothian', 'emergency tree service Short Pump', 'tree service near me Richmond', 'arborist Richmond Virginia', 'land clearing Chesterfield VA', 'affordable tree removal Central Virginia'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${montserrat.variable} bg-[#0A0A0A]`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
