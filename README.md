# Le Studio Brocante 🏺

Premium vintage and antique e-commerce store built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎨 Features

### Customer-facing
- **Beautiful Homepage** with hero section, featured categories, and latest arrivals
- **Product Shop** with advanced filtering (category, price range) and sorting
- **Product Details** with image gallery, dimensions, and condition info
- **Shopping Cart** with persistent storage (Zustand)
- **Checkout** with customer information collection
- **Order Confirmation** with order details
- **Static Pages**: About, Contact, Shipping & Returns

### Admin Dashboard
- Secure admin login with password authentication
- **Add Products** with multiple image uploads
- **Edit Products** with full details management
- **Delete Products**
- **View Orders** with order details and status

### Technical
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ SEO optimized with metadata
- ✅ Fast performance (optimized images, code splitting)
- ✅ Type-safe with TypeScript
- ✅ Clean folder structure
- ✅ Server & Client components properly used

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage (product images)
- **State Management**: Zustand (cart)
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image

## 📁 Project Structure

```
le-studio-brocante/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── globals.css               # Global styles
│   ├── page.tsx                  # Home page
│   ├── shop/
│   │   └── page.tsx             # Shop with filters
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx         # Product details
│   ├── cart/
│   │   └── page.tsx             # Shopping cart
│   ├── checkout/
│   │   └── page.tsx             # Checkout form
│   ├── order-confirmation/
│   │   └── [id]/
│   │       └── page.tsx         # Order confirmation
│   ├── about/page.tsx           # About page
│   ├── contact/page.tsx         # Contact form
│   ├── shipping/page.tsx        # Shipping info
│   └── admin/
│       ├── page.tsx             # Admin login
│       ├── layout.tsx           # Admin layout
│       ├── dashboard/page.tsx   # Products list
│       ├── add-product/page.tsx # Add product form
│       ├── edit-product/
│       │   └── [id]/page.tsx    # Edit product
│       └── orders/page.tsx      # Orders list
├── components/
│   ├── Header.tsx               # Navigation
│   ├── Footer.tsx               # Footer
│   └── ProductCard.tsx          # Product card component
├── lib/
│   ├── supabase.ts             # Supabase client & types
│   ├── cart-store.ts           # Zustand cart store
│   └── admin-auth.ts           # Admin authentication
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript config
├── next.config.js              # Next.js config
├── postcss.config.js           # PostCSS config
├── package.json                # Dependencies
└── .env.example                # Environment template
```

## 🎯 Color Palette

- **Dark Brown**: #2B1B12
- **Brown**: #5A3A2B
- **Light Brown/Beige**: #E7D7C5
- **Burnt Orange**: #C46A2A
- **Dark Yellow/Ochre**: #B68B2B
- **Cream**: #F7F1E8

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier available)
- Git

### 1. Clone or Setup Project

```bash
# Create new project
npx create-next-app@latest le-studio-brocante --typescript --tailwind --app

# Or navigate to existing project
cd le-studio-brocante
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase

#### Create Supabase Account
1. Go to https://supabase.com and sign up
2. Create a new project
3. Choose a region (e.g., eu-west-1 for Europe)
4. Wait for the project to initialize

#### Create Tables

In Supabase Dashboard, go to SQL Editor and run:

```sql
-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  condition VARCHAR(50) NOT NULL,
  dimensions VARCHAR(255),
  stock_status VARCHAR(20) NOT NULL DEFAULT 'available',
  images TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  city VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  items JSONB NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Set storage policies
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated uploads"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images');
```

#### Get API Keys

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Environment Variables

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Admin
ADMIN_PASSWORD=your_secure_password_here

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Verify Setup

- Visit home page: looks good? ✅
- Go to `/admin` and login with your password
- Add a test product with images
- Browse shop and add to cart
- Complete checkout process

## 📦 Deployment

### Deploy on Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/le-studio-brocante.git
git branch -M main
git push -u origin main
```

2. **Create Vercel Project**
   - Go to https://vercel.com/import
   - Select your GitHub repo
   - Click Import

3. **Add Environment Variables**
   - In Vercel Project Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Deploy**
   - Click Deploy
   - Wait for build to complete
   - Your site is live! 🎉

### Deploy on Other Platforms

The project is compatible with:
- Netlify
- Railway
- Render
- Self-hosted (Node.js server required)

## 🔐 Security Notes

⚠️ **Important**: The current admin authentication is simple. For production:

1. **Use NextAuth.js** or **Supabase Auth** instead of simple password
2. **Never hardcode passwords** in environment variables in version control
3. **Enable SSL/HTTPS** on your domain
4. **Add CORS policies** to Supabase
5. **Validate all inputs** server-side
6. **Use HTTPS** for all API calls

## 🛍️ Adding Sample Products

To quickly populate your store:

1. Go to `/admin`
2. Login with your password
3. Click "Ajouter un produit" (Add Product)
4. Fill in details:
   - **Name**: e.g., "Miroir Vénitien Vintage"
   - **Price**: e.g., "450"
   - **Category**: Choose from dropdown
   - **Condition**: e.g., "Excellent"
   - **Description**: Detailed description
   - **Images**: Upload 2-3 images
5. Click "Créer le produit" (Create Product)

Sample categories:
- furniture (Meubles)
- decor (Décoration)
- ceramics (Céramiques)
- mirrors (Miroirs)
- lighting (Luminaires)
- art (Art)

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#F7F1E8',  // Light
    700: '#2B1B12', // Dark
    // ... others
  },
  accent: {
    orange: '#C46A2A',
  },
}
```

### Change Typography

In `tailwind.config.ts` and `app/globals.css`:

```typescript
fontFamily: {
  serif: ['Your Serif Font', 'serif'],
  sans: ['Your Sans Font', 'sans-serif'],
}
```

### Change Site Name/Logo

Edit `components/Header.tsx`:

```typescript
<div className="text-2xl font-serif font-bold text-primary-700">
  Your Store Name
</div>
```

## 📧 Contact & Support

- **Email**: hello@lsbrocante.fr
- **Address**: 4, Rue de Thorigny, 75003 Paris, France
- **Phone**: +33 1 23 45 67 89

## 🐛 Troubleshooting

### Images not displaying
- Check Supabase Storage bucket is public
- Verify image URLs in database
- Clear browser cache

### Cart not persisting
- Check localStorage is enabled
- Verify `cart-store.ts` hydration

### Admin login not working
- Check `ADMIN_PASSWORD` env variable
- Verify password is exact match

### Supabase connection errors
- Verify URL and keys in `.env.local`
- Check Supabase project is active
- Ensure tables exist (run SQL setup)

## 📝 License

This project is open source and available for personal and commercial use.

## 🙏 Credits

Inspired by:
- Moka Brocante
- Proantic
- Selency

Built with ❤️ for vintage lovers.

---

**Ready to launch your vintage shop?** 🚀

Questions? Check the docs or contact support!
"# Le-Studio-Brocante" 
