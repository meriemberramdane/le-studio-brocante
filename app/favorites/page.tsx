'use client'

import { useEffect, useState } from 'react'
import { supabase, Product } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Trash2 } from 'lucide-react'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavoriteIds(savedFavorites)
    
    if (savedFavorites.length > 0) {
      fetchFavoriteProducts(savedFavorites)
    } else {
      setLoading(false)
    }
  }, [])

  async function fetchFavoriteProducts(ids: string[]) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .in('id', ids)

      if (error) throw error
      setFavorites(data || [])
    } catch (error) {
      console.error('Error fetching favorites:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeFavorite = (productId: string) => {
    const updated = favoriteIds.filter(id => id !== productId)
    localStorage.setItem('favorites', JSON.stringify(updated))
    setFavorites(favorites.filter(p => p.id !== productId))
    setFavoriteIds(updated)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary-600">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-primary-50">
      <div className="container-narrow">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-700 mb-4">
            Mes Favoris
          </h1>
          <p className="text-primary-600">
            {favorites.length} article{favorites.length !== 1 ? 's' : ''} sauvegardé{favorites.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto text-primary-300 mb-6" />
            <h2 className="text-2xl font-serif font-bold text-primary-700 mb-4">
              Aucun favori pour le moment
            </h2>
            <p className="text-primary-600 mb-8">
              Sélectionnez des articles pour les ajouter à vos favoris
            </p>
            <Link href="/shop" className="btn-primary inline-block">
              Découvrir la boutique
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-shadow duration-300 h-full flex flex-col cursor-pointer">
                  {/* Image */}
                  <div className="relative h-64 bg-primary-100 overflow-hidden">
                    <Image
                      src={product.images[0] || '/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        removeFavorite(product.id)
                      }}
                      className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs text-accent-orange font-medium uppercase tracking-wide mb-2">
                      {product.category}
                    </span>

                    <h3 className="font-serif font-bold text-lg text-primary-700 mb-2 line-clamp-2 flex-grow">
                      {product.name}
                    </h3>

                    <p className="text-sm text-primary-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center pt-4 border-t border-primary-100">
                      <p className="text-xl font-serif font-bold text-accent-orange">
                        DA{product.price.toFixed(2)}
                      </p>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        product.stock_status === 'sold'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {product.stock_status === 'sold' ? 'Vendu' : 'Disponible'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}