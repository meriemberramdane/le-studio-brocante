import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/supabase'
import { Heart } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const isSold = product.stock_status === 'sold'
  const imageUrl = product.images[0] || '/placeholder-product.jpg'

  return (
    <Link href={`/product/${product.id}`}>
      <div className="product-card h-full flex flex-col">
        {/* Image */}
        <div className="relative h-64 bg-primary-100 overflow-hidden group">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {isSold && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-serif text-2xl font-semibold">
                VENDU
              </span>
            </div>
          )}
          <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-soft hover:shadow-soft-lg transition-all opacity-0 group-hover:opacity-100">
            <Heart size={20} className="text-primary-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Category Badge */}
          <span className="text-xs text-accent-orange font-medium uppercase tracking-wide mb-2">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="font-serif text-lg font-semibold text-primary-700 mb-2 line-clamp-2 hover:text-accent-orange transition-colors">
            {product.name}
          </h3>

          {/* Condition */}
          <p className="text-xs text-primary-600 mb-3">{product.condition}</p>

          {/* Price */}
          <div className="mt-auto">
            <p className="text-2xl font-serif font-bold text-accent-orange">
              DA{product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
