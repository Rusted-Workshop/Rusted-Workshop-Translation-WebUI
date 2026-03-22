import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from '@/components/i18n-provider'

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
    <html lang="zh-CN">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
