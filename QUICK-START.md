# 🚀 Quick Start Guide - Le Studio Brocante

## Step-by-Step Setup (30 minutes)

### STEP 1: Create Supabase Project (5 minutes)

1. Go to **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with email or GitHub
4. Click **"New Project"**
5. Fill in:
   - **Project name**: `le-studio-brocante`
   - **Database password**: Create a strong password
   - **Region**: Choose closest to you (e.g., eu-west-1 for Europe)
6. Click **"Create new project"** and wait 2-3 minutes

### STEP 2: Create Database Tables (3 minutes)

1. In Supabase Dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Copy and paste this SQL:

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
```

4. Click **"Run"** (top right)
5. Wait for success ✅

### STEP 3: Create Storage Bucket (2 minutes)

1. In Supabase, go to **"Storage"** (left sidebar)
2. Click **"Create a new bucket"**
3. Name it: `product-images`
4. Check **"Public bucket"** ✅
5. Click **"Create bucket"**

### STEP 4: Get Your API Keys (2 minutes)

1. In Supabase, go to **Settings** → **API**
2. Copy these two values:

```
Project URL:  https://xxxxxxxxxxxx.supabase.co
Anon Key:     eyJhbGciOiJIUzI1Ni...
```

Keep these handy! 📝

### STEP 5: Setup Project Locally (10 minutes)

1. **Open terminal/command prompt**

2. **Create project** (if you don't have it already):
```bash
npx create-next-app@latest le-studio-brocante \
  --typescript \
  --tailwind \
  --app \
  --no-eslint
```

3. **Navigate to folder**:
```bash
cd le-studio-brocante
```

4. **Copy all files** from the complete codebase provided above

5. **Install dependencies**:
```bash
npm install
```

6. **Create `.env.local` file** in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1Ni...
ADMIN_PASSWORD=MySecurePassword123!
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

*(Replace values with your actual Supabase credentials)*

### STEP 6: Test Locally (5 minutes)

1. **Start dev server**:
```bash
npm run dev
```

2. **Open browser** to: http://localhost:3000

3. **Verify pages load**:
   - ✅ Home page looks beautiful
   - ✅ Shop page shows (no products yet)
   - ✅ About/Contact pages work

4. **Test Admin**:
   - Go to http://localhost:3000/admin
   - Login with your `ADMIN_PASSWORD`
   - Should see admin dashboard

### STEP 7: Add Sample Products (5 minutes)

1. Go to http://localhost:3000/admin
2. Login with your admin password
3. Click **"Ajouter un produit"** (Add Product)
4. Fill in sample product:

```
Name:        Miroir Vénitien Vintage
Price:       450
Category:    mirrors
Condition:   Excellent
Description: Un magnifique miroir vénitien du 18ème siècle 
             avec un cadre doré et ornementé.
Dimensions:  80cm x 60cm
Images:      (Upload 2-3 images of a mirror)
```

5. Click **"Créer le produit"** (Create Product)
6. Repeat for 5-10 more products
7. Go to shop page - see your products! 🎉

## 🚀 Deploy to Vercel (10 minutes)

### Option A: Simple Deployment

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/le-studio-brocante.git
git branch -M main
git push -u origin main
```

2. **Go to https://vercel.com**
3. Click **"Import Project"**
4. Select your GitHub repo
5. Click **"Import"**

### Option B: Connect Environment Variables

1. In Vercel project settings
2. Go to **"Environment Variables"**
3. Add these:

| Key | Value |
|-----|-------|
| NEXT_PUBLIC_SUPABASE_URL | Your Supabase URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Your Supabase Key |
| ADMIN_PASSWORD | Your password |
| NEXT_PUBLIC_SITE_URL | https://your-domain.vercel.app |

4. Click **"Deploy"**
5. Wait 3-5 minutes
6. Your site is LIVE! 🎉

## 📋 Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### "Images not showing in admin"
- Go to Supabase Storage
- Click `product-images` bucket
- Verify **"Public bucket"** is checked

### "Admin login not working"
- Check your `.env.local` has `ADMIN_PASSWORD` set
- Make sure password matches exactly
- Restart dev server: `npm run dev`

### "Products not loading on shop"
- Check database tables exist (run SQL in Supabase)
- Check products table has data
- Verify Supabase URL and keys in `.env.local`

### "Cart not saving"
- Check browser localStorage is enabled
- Clear browser cache
- Reload page

## 🎨 Customization Ideas

### Change Store Name
Edit `components/Header.tsx` line 19:
```typescript
<div className="text-2xl font-serif font-bold">
  YOUR STORE NAME
</div>
```

### Change Colors
Edit `tailwind.config.ts` and update color values

### Change Contact Info
Search for:
- `hello@lsbrocante.fr` → your email
- `+33 1 23 45 67 89` → your phone
- `Paris, France` → your location

### Add Your Products
Just add them via admin dashboard!

## 📚 Useful Links

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs/

## 💬 Support

- **Stuck?** Check the main README.md
- **Questions?** Create an issue on GitHub
- **Feedback?** We'd love to hear from you!

## 🎓 Next Steps

Once live, consider:
1. **Add real product images** and descriptions
2. **Setup email notifications** for orders
3. **Add payment processing** (Stripe, PayPal)
4. **Setup analytics** (Google Analytics, Vercel Analytics)
5. **Add reviews/ratings** system
6. **Setup newsletter** signup
7. **Add SEO** improvements (sitemap, robots.txt)

---

**Congratulations! Your vintage store is live!** 🥂

Need help? Check the README.md or reach out to the community!
