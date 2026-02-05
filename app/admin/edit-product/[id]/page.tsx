'use client'

import { useEffect, useState } from 'react'
import { supabase, Product } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Upload, X } from 'lucide-react'

export default function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'decor',
    condition: 'excellent',
    dimensions: '',
    stock_status: 'available' as const,
  })

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

  const conditions = ['excellent', 'tres bon etat', 'bon etat', 'juste','usé','restauré']

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
      setUploadedImages(data.images)
      setFormData({
        name: data.name,
        price: data.price.toString(),
        description: data.description,
        category: data.category,
        condition: data.condition,
        dimensions: data.dimensions || '',
        stock_status: data.stock_status,
      })
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file.type.startsWith('image/')) continue

      try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `products/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const {
          data: { publicUrl },
        } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath)

        setUploadedImages((prev) => [...prev, publicUrl])
      } catch (error) {
        console.error('Upload error:', error)
        alert('Erreur lors de l\'upload')
      }
    }
  }

  const removeImage = (url: string) => {
    setUploadedImages((prev) => prev.filter((img) => img !== url))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (uploadedImages.length === 0) {
      alert('Veuillez ajouter au moins une image')
      return
    }

    setSaving(true)

    try {
      const updateData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        condition: formData.condition,
        dimensions: formData.dimensions || null,
        stock_status: formData.stock_status,
        images: uploadedImages,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', params.id)

      if (error) throw error

      router.push('/admin/dashboard')
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Erreur lors de la mise à jour')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-primary-600">Chargement...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-primary-600 mb-6">Produit non trouvé</p>
        <Link href="/admin/dashboard" className="btn-primary">
          Retour
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/dashboard"
          className="text-accent-orange hover:text-primary-600 transition-colors"
        >
          ← Retour à la liste
        </Link>
      </div>

      <h1 className="text-4xl font-serif font-bold text-primary-700 mb-8">
        Modifier: {product.name}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 space-y-8">
        {/* Images */}
        <div>
          <label className="block text-sm font-semibold text-primary-700 mb-4">
            Images *
          </label>
          <div className="border-2 border-dashed border-primary-300 rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="images"
            />
            <label htmlFor="images" className="cursor-pointer">
              <Upload className="w-12 h-12 text-primary-400 mx-auto mb-3" />
              <p className="text-primary-700 font-medium mb-1">
                Ajouter des images
              </p>
            </label>
          </div>

          {uploadedImages.length > 0 && (
            <div className="mt-6 grid grid-cols-4 gap-4">
              {uploadedImages.map((url) => (
                <div key={url} className="relative">
                  <img
                    src={url}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div>
          <h3 className="font-serif font-semibold text-lg text-primary-700 mb-4">
            Informations de base
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nom du produit"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="input-field"
            />
            <input
              type="number"
              name="price"
              placeholder="Prix (€)"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              required
              className="input-field"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="input-field resize-none"
            />
          </div>
        </div>

        {/* Details */}
        <div>
          <h3 className="font-serif font-semibold text-lg text-primary-700 mb-4">
            Détails
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="input-field"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              className="input-field"
            >
              {conditions.map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional */}
        <div>
          <h3 className="font-serif font-semibold text-lg text-primary-700 mb-4">
            Autres infos
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              name="dimensions"
              placeholder="Dimensions"
              value={formData.dimensions}
              onChange={handleInputChange}
              className="input-field"
            />
            <select
              name="stock_status"
              value={formData.stock_status}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="available">Disponible</option>
              <option value="sold">Vendu</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-8 border-t border-primary-200">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary px-8 py-3 disabled:opacity-50"
          >
            {saving ? 'Sauvegarde...' : 'Mettre à jour'}
          </button>
          <Link
            href="/admin/dashboard"
            className="btn-secondary px-8 py-3 text-center"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  )
}
