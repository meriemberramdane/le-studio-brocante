import Link from 'next/link'
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary-700 text-primary-50 mt-24">
      <div className="container-narrow py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Le Studio Brocante</h3>
            <p className="text-primary-200 text-sm">
              Objets rares, âme vintage. Découvrez nos pièces uniques et
              authentiques.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/share/19x1U1Fi4P/?mibextid=wwXIfr"
                className="hover:text-accent-orange transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/studio_brocante_"
                className="hover:text-accent-orange transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Boutique</h4>
            <ul className="space-y-2 text-sm text-primary-200">
              <li>
                <Link href="/shop" className="hover:text-accent-orange transition-colors">
                  Tous les articles
                </Link>
              </li>
              <li>
                <Link href="/shop?category=furniture" className="hover:text-accent-orange transition-colors">
                  Meubles
                </Link>
              </li>
              <li>
                <Link href="/shop?category=decor" className="hover:text-accent-orange transition-colors">
                  Décoration
                </Link>
              </li>
              <li>
                <Link href="/shop?category=ceramics" className="hover:text-accent-orange transition-colors">
                  Céramiques
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Information</h4>
            <ul className="space-y-2 text-sm text-primary-200">
              <li>
                <Link href="/about" className="hover:text-accent-orange transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-accent-orange transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent-orange transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-accent-orange transition-colors">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-200">
              <li className="flex gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>Algeria</span>
              </li>
              <li className="flex gap-2">
                <Phone size={16} className="flex-shrink-0 mt-0.5" />
                <span>+213 559 030 084</span>
              </li>
              <li className="flex gap-2">
                <Mail size={16} className="flex-shrink-0 mt-0.5" />
                <a href="mailto:berexirayan@gmail.com" className="hover:text-accent-orange transition-colors">
                  berexirayan@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-600 pt-8">
          <p className="text-center text-sm text-primary-200">
            © 2025 Le Studio Brocante. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
