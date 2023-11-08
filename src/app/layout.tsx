import type { Metadata } from 'next'
import './globals.css'
import { NavBar } from '../components'
import { ReqctQueryProvider } from '@/providers/react-query.proveiders'


export const metadata: Metadata = {
  title: 'Trello clone',
  description: 'Next js Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="dark bg-gray-900 h-full">
        <ReqctQueryProvider>
          <NavBar />
          {children}
        </ReqctQueryProvider>
      </body>
    </html>
  )
}
