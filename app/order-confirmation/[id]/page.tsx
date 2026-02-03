'use client'

import { useEffect, useState } from 'react'
import { supabase, Order } from '@/lib/supabase'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function OrderConfirmationPage({
  params,
}: {
  params: { id: string }
}) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [params.id])

  async function fetchOrder() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) throw error
      setOrder(data)
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary-600">Chargement...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-primary-600 mb-6">
            Commande non trouvée
          </p>
          <Link href="/shop" className="btn-primary">
            Retour à la boutique
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-primary-50">
      <div className="container-narrow max-w-2xl">
        {/* Success Message */}
        <div className="bg-white rounded-2xl p-12 text-center mb-8 shadow-soft-lg">
          <CheckCircle
            size={64}
            className="text-green-600 mx-auto mb-6"
          />
          <h1 className="text-4xl font-serif font-bold text-primary-700 mb-4">
            Commande confirmée !
          </h1>
          <p className="text-lg text-primary-600 mb-2">
            Merci pour votre achat, {order.full_name}
          </p>
          <p className="text-primary-600 mb-8">
            Un email de confirmation a été envoyé à {order.email}
          </p>
          <div className="inline-block bg-primary-50 rounded-lg px-6 py-3 mb-8">
            <p className="text-sm text-primary-600">Numéro de commande</p>
            <p className="text-2xl font-serif font-bold text-primary-700">
              #{order.id.substring(0, 8).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl p-8 space-y-8 shadow-soft">
          {/* Items */}
          <div>
            <h3 className="font-serif font-semibold text-lg text-primary-700 mb-4">
              Articles commandés
            </h3>
            <div className="space-y-3 pb-4 border-b border-primary-200">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <div>
                    <p className="font-medium text-primary-700">
                      {item.product_name}
                    </p>
                    <p className="text-sm text-primary-600">
                      Quantité: {item.quantity}
                    </p>
                  </div>
                  <p className="font-serif font-bold text-accent-orange">
                    DA{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="font-serif font-semibold text-lg text-primary-700 mb-4">
              Informations de livraison
            </h3>
            <div className="space-y-2 text-primary-600">
              <p><strong>Nom:</strong> {order.full_name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Téléphone:</strong> {order.phone}</p>
              <p><strong>Adresse:</strong> {order.address}, {order.city}</p>
              {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-primary-200 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-serif font-semibold text-primary-700">
                Total
              </span>
              <span className="text-3xl font-serif font-bold text-accent-orange">
                DA{order.total.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-primary-600 mt-2">
              Livraison gratuite
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-primary-50 rounded-lg p-6">
            <h4 className="font-serif font-semibold text-primary-700 mb-3">
              Prochaines étapes
            </h4>
            <ul className="space-y-2 text-sm text-primary-600">
              <li>✓ Votre commande a été reçue</li>
              <li>→ Nous préparons votre colis</li>
              <li>→ Vous recevrez un email de suivi</li>
              <li>→ Livraison en 5-7 jours ouvrables</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8 justify-center">
          <Link href="/shop" className="btn-secondary px-8 py-3">
            Continuer les achats
          </Link>
          <Link href="/" className="btn-primary px-8 py-3">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
