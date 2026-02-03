'use client'

import { useEffect, useState } from 'react'
import { supabase, Product } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { Edit, Trash2 } from 'lucide-react'

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error
      setProducts(products.filter((p) => p.id !== id))
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Erreur lors de la suppression')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif font-bold text-primary-700">
          Gestion des produits
        </h1>
        <Link href="/admin/add-product" className="btn-primary">
          + Ajouter un produit
        </Link>
      </div>

      {loading ? (
        <p className="text-primary-600">Chargement...</p>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <p className="text-primary-600 mb-6">Aucun produit pour le moment</p>
          <Link href="/admin/add-product" className="btn-primary">
            Créer le premier produit
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary-50 border-b border-primary-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary-700">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary-700">
                    Nom
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary-700">
                    Catégorie
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary-700">
                    Prix
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary-700">
                    État
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary-700">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-primary-200 hover:bg-primary-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {product.images[0] && (
                        <div className="w-10 h-10 rounded overflow-hidden">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-primary-700">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-primary-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 font-serif font-bold text-accent-orange">
                      DA{product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-primary-600">
                      {product.condition}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          product.stock_status === 'available'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.stock_status === 'available'
                          ? 'Disponible'
                          : 'Vendu'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/edit-product/${product.id}`}
                          className="p-2 hover:bg-primary-100 rounded transition-colors"
                        >
                          <Edit size={18} className="text-primary-700" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-100 rounded transition-colors"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
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
