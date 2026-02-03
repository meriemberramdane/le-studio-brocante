'use client'

import { useEffect, useState } from 'react'
import { supabase, Product } from '@/lib/supabase'
import { useCart } from '@/lib/cart-store'
import Image from 'next/image'
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  async function fetchProduct() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) throw error
      setProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary-600">Chargement...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-primary-600 mb-6">Article non trouvé</p>
          <Link href="/shop" className="btn-primary">
            Retour à la boutique
          </Link>
        </div>
      </div>
    )
  }

  const currentImage = product.images[currentImageIndex] || '/placeholder.jpg'
  const isSold = product.stock_status === 'sold'

  return (
    <div className="min-h-screen py-12 bg-primary-50">
      <div className="container-narrow">
        {/* Breadcrumb */}
        <div className="flex gap-2 text-sm text-primary-600 mb-8">
          <Link href="/" className="hover:text-accent-orange transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-accent-orange transition-colors">
            Boutique
          </Link>
          <span>/</span>
          <span className="text-primary-700 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative h-96 lg:h-[600px] bg-primary-100 rounded-2xl overflow-hidden group">
              {isSold && (
                <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                  <span className="text-white font-serif text-3xl font-bold">
                    VENDU
                  </span>
                </div>
              )}
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        (prev) =>
                          (prev - 1 + product.images.length) %
                          product.images.length
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-soft transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={24} className="text-primary-700" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        (prev) => (prev + 1) % product.images.length
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-soft transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={24} className="text-primary-700" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex
                        ? 'border-accent-orange'
                        : 'border-primary-200 hover:border-primary-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - view ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category */}
              <span className="text-xs text-accent-orange font-medium uppercase tracking-wide">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-700 my-4">
                {product.name}
              </h1>

              {/* Condition */}
              <p className="text-lg text-primary-600 mb-6">{product.condition}</p>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-primary-200">
                <p className="text-5xl font-serif font-bold text-accent-orange">
                  DA{product.price.toFixed(2)}
                </p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="font-serif font-semibold text-lg text-primary-700 mb-3">
                  Description
                </h3>
                <p className="text-primary-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-8">
                {product.dimensions && (
                  <div>
                    <h4 className="font-serif font-semibold text-primary-700">
                      Dimensions
                    </h4>
                    <p className="text-primary-600">{product.dimensions}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-serif font-semibold text-primary-700">
                    État
                  </h4>
                  <p className="text-primary-600">{product.condition}</p>
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-primary-700">
                    Disponibilité
                  </h4>
                  <p
                    className={`font-medium ${
                      isSold ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {isSold ? 'Non disponible' : 'Disponible'}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-8 border-t border-primary-200">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-primary-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-primary-700 hover:bg-primary-50 transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-16 text-center border-l border-r border-primary-200 py-2 outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-primary-700 hover:bg-primary-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <button className="p-3 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors">
                  <Heart size={20} className="text-primary-700" />
                </button>
              </div>

              {isSold ? (
                <button disabled className="w-full py-4 bg-gray-400 text-white rounded-lg font-semibold cursor-not-allowed">
                  Article vendu
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
                    addedToCart
                      ? 'bg-green-600'
                      : 'btn-primary'
                  }`}
                >
                  {addedToCart ? '✓ Ajouté au panier' : 'Ajouter au panier'}
                </button>
              )}

              <button className="w-full py-4 btn-secondary rounded-lg font-semibold">
                Réserver cet article
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-24">
          <h2 className="section-title">Autres articles dans cette catégorie</h2>
          <p className="text-primary-600 mb-8">
            Découvrez d&apos;autres pièces similaires
          </p>
        </div>
      </div>
    </div>
  )
}
