import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '铁锈工坊 - AI汉化',
  description: 'Rusted Workshop Translation',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
