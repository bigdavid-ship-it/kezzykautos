import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { WhatsAppFAB } from '@/components/public/WhatsAppButton'
import { VisitorTracker } from '@/components/public/VisitorTracker'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppFAB />
      <VisitorTracker />
    </>
  )
}
