// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Inter, Manrope, } from 'next/font/google'
import Navigation from '@/components/header/Navigation'



const inter = Inter({ subsets: ['latin'] })
const manrope = Manrope({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-manrope',
});

export const metadata = {
  title: 'AI Political Ad Tracker',
  description: 'Real-time transparency into AI political spending',
}

const header = <Navigation />

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`min-h-screen bg-gray-50 ${manrope.className} antialiased`}>
            {header}
            {children}
        </body>
      </html>
    </ClerkProvider>
  )
}