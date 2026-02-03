'use client'

import { useEffect, useState } from 'react'
import { useCart } from '@/lib/cart-store'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const total = getTotalPrice()

  return (
    <div className="min-h-screen py-12 bg-primary-50">
      <div className="container-narrow">
        <h1 className="text-4xl font-serif font-bold text-primary-700 mb-12">
          Panier
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <p className="text-xl text-primary-600 mb-6">
              Votre panier est vide
            </p>
            <Link href="/shop" className="btn-primary">
              Continuer mes achats
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.product_id}
                  className="bg-white rounded-2xl p-6 flex gap-6"
                >
                  {/* Image */}
                  <div className="w-24 h-24 bg-primary-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.product?.images[0] && (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <Link
                      href={`/product/${item.product_id}`}
                      className="font-serif font-semibold text-lg text-primary-700 hover:text-accent-orange transition-colors"
                    >
                      {item.product?.name}
                    </Link>
                    <p className="text-primary-600 text-sm">
                      {item.product?.condition}
                    </p>
                    <p className="text-accent-orange font-serif text-xl font-bold mt-2">
                      DA{item.product?.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center border border-primary-200 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product_id,
                            item.quantity - 1
                          )
                        }
                        className="px-3 py-2 text-primary-700 hover:bg-primary-50"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.product_id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-12 text-center border-l border-r border-primary-200 py-2 outline-none text-sm"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product_id,
                            item.quantity + 1
                          )
                        }
                        className="px-3 py-2 text-primary-700 hover:bg-primary-50"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 space-y-6 h-fit sticky top-24">
                <div>
                  <h3 className="font-serif font-semibold text-lg text-primary-700 mb-4">
                    Résumé
                  </h3>
                  <div className="space-y-3 pb-4 border-b border-primary-200">
                    <div className="flex justify-between text-primary-600">
                      <span>Sous-total ({items.length} article{items.length !== 1 ? 's' : ''})</span>
                      <span>DA{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-primary-600">
                      <span>Livraison</span>
                      <span>À calculer</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between font-serif font-bold text-xl">
                  <span className="text-primary-700">Total</span>
                  <span className="text-accent-orange">DA{total.toFixed(2)}</span>
                </div>

                <Link href="/checkout" className="btn-primary w-full block text-center py-4">
                  Passer la commande
                </Link>

                <Link href="/shop" className="btn-secondary w-full block text-center py-3">
                  Continuer mes achats
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
