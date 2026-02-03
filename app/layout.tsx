import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Le Studio Brocante - Objets rares, âme vintage',
  description:
    'Découvrez une collection unique de meubles, décoration et objets vintage authentiques. Antiquités et brocante pour les amoureux de belles choses.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'Le Studio Brocante',
    description:
      'Objets rares, âme vintage. Découvrez notre collection de meubles et décoration.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Le Studio Brocante',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Studio Brocante',
    description: 'Objets rares, âme vintage',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
