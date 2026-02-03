'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Plus, List, Settings } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('admin-token')
    if (!token) {
      // If on /admin page (login page), don't redirect
      if (pathname === '/admin') {
        setLoading(false)
        return
      }
      // If on any other admin page, redirect to login
      router.push('/admin')
    } else {
      setIsAuthenticated(true)
      setLoading(false)
    }
  }, [router, pathname])

  const handleLogout = () => {
    localStorage.removeItem('admin-token')
    router.push('/admin')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary-600">Chargement...</p>
      </div>
    )
  }

  // If on login page (/admin), show only the login form
  if (pathname === '/admin') {
    return <>{children}</>
  }

  // If not authenticated on admin pages, redirect
  if (!isAuthenticated) {
    return null
  }

  // For authenticated admin pages, show sidebar + content
  return (
    <div className="min-h-screen bg-primary-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-700 text-white min-h-screen flex flex-col">
        <div className="p-6 border-b border-primary-600">
          <h1 className="text-2xl font-serif font-bold">Admin Panel</h1>
        </div>

        <nav className="p-6 space-y-2 flex-1">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <List size={20} />
            <span>Produits</span>
          </Link>
          <Link
            href="/admin/add-product"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus size={20} />
            <span>Ajouter un produit</span>
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Settings size={20} />
            <span>Commandes</span>
          </Link>
        </nav>

        <div className="p-6 border-t border-primary-600">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}