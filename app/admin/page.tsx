'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { verifyAdminPassword } from '@/lib/admin-auth'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (verifyAdminPassword(password)) {
      // Store auth token in localStorage
      const token = Buffer.from(`admin:${Date.now()}`).toString('base64')
      localStorage.setItem('admin-token', token)
      router.push('/admin/dashboard')
    } else {
      setError('Mot de passe incorrect')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl p-8 shadow-soft-lg">
          <h1 className="text-3xl font-serif font-bold text-primary-700 mb-2 text-center">
            Admin
          </h1>
          <p className="text-center text-primary-600 mb-8">
            Connectez-vous pour gérer la boutique
          </p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="input-field"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <p className="text-xs text-primary-400 text-center mt-8">
            Utilise le mot de passe défini dans les variables d&apos;environnement
          </p>
        </div>
      </div>
    </div>
  )
}
