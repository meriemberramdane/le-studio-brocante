'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Upload, X } from 'lucide-react'

export default function AddProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
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

  const categories = ['meubles', 'decoration', 'ceramiques', 'miroirs', 'luminaires', 'art', 'poupees','billets','bijoux','livres','textiles',]
  const conditions = ['excellent', 'tres-bon-etat', 'bon-etat', 'juste', 'restauré']

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
        alert('Erreur lors de l\'upload de l\'image')
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

    setLoading(true)

    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        condition: formData.condition,
        dimensions: formData.dimensions || null,
        stock_status: formData.stock_status,
        images: uploadedImages,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase
        .from('products')
        .insert([productData])

      if (error) throw error

      router.push('/admin/dashboard')
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Erreur lors de la création du produit')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/dashboard" className="text-accent-orange hover:text-primary-600 transition-colors">
          ← Retour à la liste
        </Link>
      </div>

      <h1 className="text-4xl font-serif font-bold text-primary-700 mb-8">
        Ajouter un produit
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
                Cliquez pour ajouter des images
              </p>
              <p className="text-sm text-primary-400">
                ou glissez-déposez
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
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
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
              placeholder="Prix (DA)"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              required
              className="input-field"
            />
            <textarea
              name="description"
              placeholder="Description du produit"
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
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
                  {cond === 'excellent' ? 'Excellent' :
                   cond === 'very-good' ? 'Très bon' :
                   cond === 'good' ? 'Bon' :
                   cond === 'fair' ? 'Acceptable' :
                   'Restauré'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <h3 className="font-serif font-semibold text-lg text-primary-700 mb-4">
            Informations supplémentaires
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              name="dimensions"
              placeholder="Dimensions (ex: 100cm x 50cm x 30cm)"
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
            disabled={loading}
            className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Création...' : 'Créer le produit'}
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
