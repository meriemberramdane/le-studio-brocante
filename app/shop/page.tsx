'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/lib/supabase'
import { ChevronDown } from 'lucide-react'

function ShopContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest')
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || ''
  )
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')

const categories = [
  'Mobilier',
  'Déco, Tableaux & Sculptures',
  'Céramiques et Porcelaines',
  'Luminaires',
  'Montres et Bijoux',
  'Livres & Imprimés Anciens',
  'Musique',
  'Jouets et Miniatures',
  'Numismatique',
  'Divers',
  'Textiles & Tapisseries',
  'Objets en Métal & Métaux Anciens',
]


  useEffect(() => {
    fetchProducts()
  }, [sortBy, selectedCategory, minPrice, maxPrice, searchTerm])

  async function fetchProducts() {
    setLoading(true)
    try {
      let query = supabase
        .from('products')
        .select('*')
        .eq('stock_status', 'available')

      // Filtre par recherche (dans le nom ou la description)
      if (searchTerm) {
        query = query.or(
          `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
        )
      }

      if (selectedCategory) {
        query = query.eq('category', selectedCategory)
      }

      if (minPrice) {
        query = query.gte('price', parseFloat(minPrice))
      }

      if (maxPrice) {
        query = query.lte('price', parseFloat(maxPrice))
      }

      // Tri
      switch (sortBy) {
        case 'price-low':
          query = query.order('price', { ascending: true })
          break
        case 'price-high':
          query = query.order('price', { ascending: false })
          break
        case 'newest':
        default:
          query = query.order('created_at', { ascending: false })
      }

      const { data, error } = await query.limit(50)

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 bg-primary-50">
      <div className="container-narrow">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-700 mb-2">
            Boutique
          </h1>
          <p className="text-primary-600">
            {products.length} article{products.length !== 1 ? 's' : ''} trouvé
            {products.length !== 1 ? 's' : ''}
            {searchTerm && ` pour "${searchTerm}"`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-soft space-y-6 h-fit">
              {/* Search Box */}
              <div>
                <h3 className="font-serif font-semibold text-primary-700 mb-4">
                  Recherche
                </h3>
                <input
                  type="text"
                  placeholder="Chercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field"
                />
              </div>

              {/* Category Filter */}
              <div className="border-t border-primary-200 pt-6">
                <h3 className="font-serif font-semibold text-primary-700 mb-4">
                  Catégorie
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === ''
                        ? 'bg-accent-orange text-white'
                        : 'text-primary-700 hover:bg-primary-50'
                    }`}
                  >
                    Tous
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-accent-orange text-white'
                          : 'text-primary-700 hover:bg-primary-50'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="border-t border-primary-200 pt-6">
                <h3 className="font-serif font-semibold text-primary-700 mb-4">
                  Prix
                </h3>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="input-field text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="input-field text-sm"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sorting */}
            <div className="mb-8 flex justify-between items-center">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field appearance-none pr-10 py-2 text-sm"
                >
                  <option value="newest">Plus récents</option>
                  <option value="price-low">Prix croissant</option>
                  <option value="price-high">Prix décroissant</option>
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-600 pointer-events-none"
                />
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-primary-600">Chargement...</p>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl">
                <p className="text-primary-600 text-lg mb-4">
                  {searchTerm
                    ? `Aucun article ne correspond à "${searchTerm}"`
                    : 'Aucun article ne correspond à vos critères'}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('')
                    setMinPrice('')
                    setMaxPrice('')
                    setSearchTerm('')
                  }}
                  className="btn-secondary"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default function ShopPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ShopContent />
    </Suspense>
  )
}