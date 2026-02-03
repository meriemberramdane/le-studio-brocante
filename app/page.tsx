import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import { Armchair, Frame, Lightbulb, Palette, Sparkles, Wind, Heart, Banknote, Gem, Book, Shirt 
} from 'lucide-react'

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
   { name: 'Meubles', slug: 'meubles', icon: Armchair },
   { name: 'Décoration', slug: 'decoration', icon: Palette },
   { name: 'Céramiques', slug: 'ceramiques', icon: Wind },
   { name: 'Miroirs', slug: 'miroirs', icon: Frame },
   { name: 'Luminaires', slug: 'luminaires', icon: Lightbulb },
   { name: 'Art', slug: 'art', icon: Sparkles },
   { name: 'Poupées', slug: 'poupees', icon: Heart },
   { name: 'Billets', slug: 'billets', icon: Banknote },
   { name: 'Bijoux', slug: 'bijoux', icon: Gem },
   { name: 'Livres', slug: 'livres', icon: Book },
   { name: 'Textiles', slug: 'textiles', icon: Shirt },
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
              <p className="section-subtitle">
                Les plus belles pièces fraîchement arriées dans notre galerie.
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

      {/* CTA Section */}
      <section className="py-24 bg-primary-700">
        <div className="container-narrow text-center text-white">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Rejoignez notre communauté
          </h2>
          <p className="text-xl text-primary-200 mb-8 max-w-2xl mx-auto">
            Recevez les nouveautés et les offres exclusives directement dans votre boîte.
          </p>
          <form className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-4 py-3 rounded-lg text-primary-700 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-orange"
            />
            <button type="submit" className="btn-primary">
              S&apos;abonner
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
