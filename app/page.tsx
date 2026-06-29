import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import { Armchair, Frame, Lightbulb, Watch, Music, Gift, Coins, Shirt, Sparkles, Wrench, Book, Palette} from 'lucide-react'
import { Instagram, Phone, Mail } from 'lucide-react'

async function getFeaturedProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('stock_status', 'available')
      .order('created_at', { ascending: false })
      .limit(6)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

const categories = [
  { name: 'Mobilier', slug: 'Mobilier', icon: Armchair },
  { name: 'Déco, Tableaux & Sculptures', slug: 'Déco, Tableaux & Sculptures', icon: Frame },
  { name: 'Céramiques et Porcelaines', slug: 'Céramiques et Porcelaines', icon: Palette },
  { name: 'Luminaires', slug: 'Luminaires', icon: Lightbulb },
  { name: 'Montres et Bijoux', slug: 'Montres et Bijoux', icon: Watch },
  { name: 'Livres & Imprimés Anciens', slug: 'Livres & Imprimés Anciens', icon: Book },
  { name: 'Musique', slug: 'Musique', icon: Music },
  { name: 'Jouets et Miniatures', slug: 'Jouets et Miniatures', icon: Gift },
  { name: 'Numismatique', slug: 'Numismatique', icon: Coins },
  { name: 'Divers', slug: 'Divers', icon: Sparkles },
  { name: 'Textiles & Tapisseries', slug: 'Textiles & Tapisseries', icon: Shirt },
  { name: 'Objets en Métal & Métaux Anciens', slug: 'Objets en Métal & Métaux Anciens', icon: Wrench },
]

  const whyUs = [
    {
      title: 'Authentique',
      description: 'Chaque pièce est vérifiée et authentifiée avec soin.',
    },
    {
      title: 'Curatée',
      description: 'Une sélection rigoureuse des plus beaux objets.',
    },
    {
      title: 'Unique',
      description: 'Des pièces rarissimes qui ne se trouveront nulle part ailleurs.',
    },
    {
      title: 'Premium',
      description: 'Qualité et élégance garanties à chaque achat.',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen max-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-100 to-primary-50">
        <div className="absolute inset-0 opacity-20 bg-[url('/vintage-pattern.png')] pointer-events-none" />
        <div className="container-narrow relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary-700 mb-6">
            Objets rares, âme vintage
          </h1>
          <p className="text-xl md:text-2xl text-primary-600 mb-12 max-w-2xl mx-auto">
            Découvrez une collection curatée de décoration, de collections et objets
            authentiques pour remplir votre maison d&apos;histoire et de caractère.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/shop" className="btn-primary text-lg">
              Explorer la boutique
            </Link>
            <Link href="/about" className="btn-secondary text-lg">
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="container-narrow">
          <h2 className="section-title text-center mb-16">Parcourir par catégorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.slug}
                  href={`/shop?category=${category.slug}`}
                  className="card text-center hover:-translate-y-2 group"
                >
                  <Icon className="w-12 h-12 text-accent-orange mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-serif font-semibold text-lg text-primary-700 group-hover:text-accent-orange transition-colors">
                    {category.name}
                  </h3>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-24 bg-primary-50">
          <div className="container-narrow">
            <div className="text-center mb-16">
              <h2 className="section-title">Nouveaux arrivages</h2>
              <p className="text-primary-600 text-center">
                Les plus belles pièces fraîchement arrivées dans notre galerie.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/shop" className="btn-primary">
                Voir tous les articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Us Section */}
      <section className="py-24 bg-white">
        <div className="container-narrow">
          <h2 className="section-title text-center mb-16">Pourquoi nous ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item, idx) => (
              <div key={idx} className="card text-center">
                <h3 className="font-serif font-semibold text-xl text-primary-700 mb-3">
                  {item.title}
                </h3>
                <p className="text-primary-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary-50 border-t border-primary-200">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-primary-700 mb-4">
             Contact
            </h2>
            <p className="text-primary-600">
             Une question ? Contactez-nous directement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Instagram */}
            <div className="card text-center">
              <Instagram className="w-12 h-12 text-accent-orange mx-auto mb-4" />
                <h3 className="font-serif font-semibold text-lg text-primary-700 mb-2">
                  Instagram
                </h3>

                <a
                  href="https://instagram.com/le_studio_brocante"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-accent-orange transition-colors"
                >
                  @le_studio_brocante
                </a>
            </div>

          {/* Téléphone */}
            <div className="card text-center">
              <Phone className="w-12 h-12 text-accent-orange mx-auto mb-4" />
                <h3 className="font-serif font-semibold text-lg text-primary-700 mb-2">
                  Téléphone
                </h3>

                <p className="text-primary-600">
                  +213 559 030 084
                  <br />
                  Tous les jours 9h - 21h
                </p>
            </div>

          {/* Email */}
            <div className="card text-center">
             <Mail className="w-12 h-12 text-accent-orange mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-lg text-primary-700 mb-2">
                Email
              </h3>

              <a
                href="mailto:lestudiobrocante@gmail.com"
                className="text-primary-600 hover:text-accent-orange transition-colors"
              >
                lestudiobrocante@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
