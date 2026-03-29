import { ReactNode } from 'react'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { getLocaleDirection, getLocaleFromSegments } from '@/lib/routes'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
})

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
})

type Props = {
  children: ReactNode
  params: Promise<{ segments?: string[] }> | { segments?: string[] }
}

export default async function FrontendLayout({ children, params }: Props) {
  const resolvedParams = await Promise.resolve(params)
  const locale = getLocaleFromSegments(resolvedParams.segments)
  const dir = getLocaleDirection(locale)

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}