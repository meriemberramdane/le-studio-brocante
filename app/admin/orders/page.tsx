'use client'

import { useEffect, useState } from 'react'
import { supabase, Order } from '@/lib/supabase'
import { ChevronDown } from 'lucide-react'

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

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

      // Mettre à jour l'état local
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
        <div className="bg-white rounded-2xl overflow-hidden shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary-50 border-b border-primary-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary-700">
                    Commande
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary-700">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary-700">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary-700">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary-700">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-primary-200 hover:bg-primary-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-primary-700">
                      #{order.id.substring(0, 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-primary-600">
                      {order.full_name}
                    </td>
                    <td className="px-6 py-4 text-primary-600 text-sm">
                      {order.email}
                    </td>
                    <td className="px-6 py-4 font-serif font-bold text-accent-orange">
                      €{order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative inline-block w-full">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value)
                          }
                          disabled={updatingId === order.id}
                          className={`appearance-none w-full px-3 py-2 rounded-full text-xs font-medium cursor-pointer border-0 ${getStatusColor(
                            order.status
                          )} disabled:opacity-50`}
                        >
                          <option value="pending">En attente</option>
                          <option value="confirmed">Confirmée</option>
                          <option value="shipped">Expédiée</option>
                          <option value="completed">Complétée</option>
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-primary-600">
                      {new Date(order.created_at).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}