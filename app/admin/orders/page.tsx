'use client'

import { useEffect, useState } from 'react'
import { supabase, Order } from '@/lib/supabase'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateOrderStatus(orderId: string, newStatus: string) {
    setUpdatingId(orderId)
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) throw error

      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus as any } : order
        )
      )
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Erreur lors de la mise à jour')
    } finally {
      setUpdatingId(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente'
      case 'confirmed':
        return 'Confirmée'
      case 'shipped':
        return 'Expédiée'
      case 'completed':
        return 'Complétée'
      default:
        return status
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-serif font-bold text-primary-700 mb-8">
        Commandes
      </h1>

      {loading ? (
        <p className="text-primary-600">Chargement...</p>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <p className="text-primary-600">Aucune commande pour le moment</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-soft overflow-hidden"
            >
              {/* Order Header */}
              <div
                onClick={() =>
                  setExpandedId(expandedId === order.id ? null : order.id)
                }
                className="px-6 py-4 cursor-pointer hover:bg-primary-50 transition-colors flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <p className="font-serif font-bold text-primary-700">
                      #{order.id.substring(0, 8).toUpperCase()}
                    </p>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm text-primary-600">
                    <div>
                      <p className="font-semibold text-primary-700">Client</p>
                      <p>{order.full_name}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-700">Email</p>
                      <p className="text-xs">{order.email}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-700">Téléphone</p>
                      <p>{order.phone || 'Non fourni'}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-700">Total</p>
                      <p className="font-serif font-bold text-accent-orange">
                        DA{order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  {expandedId === order.id ? (
                    <ChevronUp size={24} className="text-primary-700" />
                  ) : (
                    <ChevronDown size={24} className="text-primary-700" />
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === order.id && (
                <div className="border-t border-primary-200 px-6 py-4 bg-primary-50">
                  {/* Articles */}
                  <div className="mb-6">
                    <h3 className="font-serif font-semibold text-primary-700 mb-4">
                      Articles commandés
                    </h3>
                    <div className="space-y-3">
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item: any, idx: number) => (
                          <div
                            key={idx}
                            className="bg-white p-4 rounded-lg border border-primary-200 flex justify-between items-center"
                          >
                            <div>
                              <p className="font-semibold text-primary-700">
                                {item.product_name}
                              </p>
                              <p className="text-sm text-primary-600">
                                Prix unitaire: DA{item.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-primary-700">
                                Quantité:{' '}
                                <span className="text-accent-orange">
                                  {item.quantity}
                                </span>
                              </p>
                              <p className="text-sm font-serif font-bold text-accent-orange">
                                DA{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-primary-600 text-sm">
                          Aucun article dans cette commande
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Adresse */}
                  {order.address && (
                    <div className="mb-6">
                      <h3 className="font-serif font-semibold text-primary-700 mb-2">
                        Adresse de livraison
                      </h3>
                      <p className="text-primary-600 text-sm">{order.address}</p>
                    </div>
                  )}

                  {/* Status Change */}
                  <div className="border-t border-primary-200 pt-4">
                    <label className="block text-sm font-semibold text-primary-700 mb-2">
                      Changer le statut
                    </label>
                    <div className="relative inline-block w-full max-w-xs">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                        disabled={updatingId === order.id}
                        className={`appearance-none w-full px-4 py-2 rounded-lg text-sm font-medium cursor-pointer border-0 ${getStatusColor(
                          order.status
                        )} disabled:opacity-50`}
                      >
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmée</option>
                        <option value="shipped">Expédiée</option>
                        <option value="completed">Complétée</option>
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary-700"
                      />
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="mt-4 text-xs text-primary-500 border-t border-primary-200 pt-4">
                    <p>
                      Commande créée le{' '}
                      {new Date(order.created_at).toLocaleDateString('fr-FR')} à{' '}
                      {new Date(order.created_at).toLocaleTimeString('fr-FR')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}