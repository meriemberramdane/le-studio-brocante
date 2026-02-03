'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-store'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [itemCount, setItemCount] = useState(0)
  const { getItemCount } = useCart()

  useEffect(() => {
    // Hydrate cart count after mounting
    const count = getItemCount()
    setItemCount(count)
  }, [getItemCount])

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/shop', label: 'Boutique' },
    { href: '/about', label: 'À propos' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-primary-700 border-b border-primary-600">
      <div className="container-narrow flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-serif font-bold text-accent-orange">
            Le Studio Brocante
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-primary-50 hover:text-accent-orange font-medium text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Search (desktop only) */}
            <Link
               href="/shop"
               className="hidden lg:flex items-center bg-primary-50 rounded-lg px-3 py-2 hover:bg-primary-100 transition-colors">
             <Search size={18} className="text-primary-600" />
             <input
              type="text"
              placeholder="Rechercher..."
              className="bg-transparent px-2 py-1 text-sm outline-none text-primary-700 placeholder-primary-400 cursor-pointer"
              onClick={(e) => e.currentTarget.closest('a')?.click()}
               />
            </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative p-2 hover:bg-primary-600 rounded-lg transition-colors"
          >
            <ShoppingCart size={24} className="text-primary-50" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Admin Link */}
          <Link
            href="/admin"
            className="text-xs text-primary-200 hover:text-accent-orange transition-colors"
          >
            Admin
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-primary-600 rounded-lg"
          >
            {isOpen ? (
              <X size={24} className="text-primary-50" />
            ) : (
              <Menu size={24} className="text-primary-50" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-primary-600 border-t border-primary-500 py-4">
          <div className="container-narrow space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-primary-700 hover:text-accent-orange font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
