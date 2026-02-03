import Link from 'next/link'

export const metadata = {
  title: 'À propos | Le Studio Brocante',
  description: 'Découvrez l\&apos;histoire de Le Studio Brocante et notre passion pour les objets vintage authentiques et les collections rares.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-primary-50">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-primary-100 to-primary-50">
        <div className="container-narrow text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary-700 mb-6">
            À propos
          </h1>
          <p className="text-xl text-primary-600 max-w-2xl mx-auto">
            L&apos;histoire d&apos;une passion pour les belles choses et les antiquités.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container-narrow max-w-3xl">
          <h2 className="section-title mb-8">Notre histoire</h2>
          <div className="space-y-6 text-primary-600 leading-relaxed">
            <p>
              Fondée en 2025, Le Studio Brocante est née d&apos;une passion
              inébranlable pour les objets vintage authentiques et les
              collections rares. Ce que nous avons commencé comme une simple
              passion s&apos;est transformé en une destination incontournable 
              pour les collectionneurs et amateurs de design vintage.
            </p>
            <p>
              Chaque pièce de notre collection est sélectionnée avec soin.
              Nous parcourons les marchés aux puces, les salles des ventes et
              les collections privées pour trouverles objets les plus authentiques.
            </p>
            <p>
              Nous croyons que les objets anciens racontent des histoires.
              Ils portent en eux des années de vie, de souvenirs et de charme.
              Notre mission est de donner une seconde vie à ces pièces
              précieuses en les mettant entre les mains de ceux qui les
              apprécient vraiment.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="container-narrow">
          <h2 className="section-title text-center mb-16">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <h3 className="font-serif font-semibold text-2xl text-primary-700 mb-3">
                Authenticité
              </h3>
              <p className="text-primary-600">
                Chaque pièce est vérifiée et authentifiée. Nous garantissons
                l&apos;originalité et la qualité de tous nos articles.
              </p>
            </div>
            <div className="card text-center">
              <h3 className="font-serif font-semibold text-2xl text-primary-700 mb-3">
                Curation
              </h3>
              <p className="text-primary-600">
                Nous sélectionnons rigoureusement chaque pièce selon des
                critères exigeants de qualité et d&apos;esthétique.
              </p>
            </div>
            <div className="card text-center">
              <h3 className="font-serif font-semibold text-2xl text-primary-700 mb-3">
                Respect
              </h3>
              <p className="text-primary-600">
                Nous respectons l&apos;histoire et le patrimoine de chaque objet,
                en les préservant pour les générations futures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container-narrow text-center">
          <h2 className="section-title mb-6">Prêt à explorer ?</h2>
          <p className="text-lg text-primary-600 mb-8 max-w-2xl mx-auto">
            Découvrez notre collection complète de pièces vintage authentiques.
          </p>
          <Link href="/shop" className="btn-primary">
            Voir tous les articles
          </Link>
        </div>
      </section>
    </div>
  )
}
