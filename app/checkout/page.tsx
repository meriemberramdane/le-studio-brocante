'use client'

import { useEffect, useState } from 'react'
import { useCart } from '@/lib/cart-store'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { items, getTotalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-12 bg-primary-50">
        <div className="container-narrow">
          <div className="bg-white rounded-2xl p-12 text-center">
            <p className="text-xl text-primary-600 mb-6">
              Votre panier est vide
            </p>
            <Link href="/shop" className="btn-primary">
              Retourner à la boutique
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderItems = items.map((item) => ({
        product_id: item.product_id,
        product_name: item.product?.name || '',
        price: item.product?.price || 0,
        quantity: item.quantity,
      }))

      const orderData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
        notes: formData.notes || null,
        items: orderItems,
        total: getTotalPrice(),
        status: 'pending',
      }

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single()

      if (data) {
        try {
          const orderNumber = data.id.substring(0, 8).toUpperCase()
          await fetch('/api/send-order-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderNumber,
              customerName: formData.fullName,
              customerEmail: formData.email,
              items: orderItems,
              total: getTotalPrice(),
            }),
          })
        } catch (emailError) {
          console.error('Email sending failed:', emailError)
        }
      }

      if (error) throw error

      clearCart()
      router.push(`/order-confirmation/${data.id}`)
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const total = getTotalPrice()

  return (
    <div className="min-h-screen py-12 bg-primary-50">
      <div className="container-narrow">
        <h1 className="text-4xl font-serif font-bold text-primary-700 mb-12">
          Passer la commande
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="font-serif font-semibold text-lg text-primary-700 mb-4">
                  Informations personnelles
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Nom complet"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Numéro de téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="border-t border-primary-200 pt-6">
                <h3 className="font-serif font-semibold text-lg text-primary-700 mb-4">
                  Adresse de livraison
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="Ville"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <textarea
                    name="address"
                    placeholder="Adresse complète (rue, numéro, code postal)"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="border-t border-primary-200 pt-6">
                <h3 className="font-serif font-semibold text-lg text-primary-700 mb-4">
                  Notes (optionnel)
                </h3>
                <textarea
                  name="notes"
                  placeholder="Ajoutez des notes ou des instructions spéciales..."
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="input-field resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Traitement...' : 'Confirmer la commande'}
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 space-y-6 h-fit sticky top-24">
              <div>
                <h3 className="font-serif font-semibold text-lg text-primary-700 mb-4">
                  Résumé de la commande
                </h3>
                <div className="space-y-3 pb-4 border-b border-primary-200">
                  {items.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex justify-between text-sm text-primary-600"
                    >
                      <div>
                        <p className="font-medium">{item.product?.name}</p>
                        <p className="text-xs">Quantité: {item.quantity}</p>
                      </div>
                      <p className="font-medium">
                        DA
                        {((item.product?.price || 0) * item.quantity).toFixed(
                          2
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pb-4 border-b border-primary-200">
                <div className="flex justify-between text-primary-600">
                  <span>Sous-total</span>
                  <span>DA{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-primary-600">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
              </div>

              <div className="flex justify-between font-serif font-bold text-xl">
                <span className="text-primary-700">Total</span>
                <span className="text-accent-orange">DA{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}