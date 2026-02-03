# ⚙️ Configuration & Customization Guide

## 1. Site Information

### Change Store Name

**Location**: `components/Header.tsx` (line 19)
```typescript
// BEFORE
<div className="text-2xl font-serif font-bold">
  LS Brocante
</div>

// AFTER
<div className="text-2xl font-serif font-bold">
  YOUR STORE NAME
</div>
```

Also update in:
- `components/Footer.tsx` (line 12)
- `app/layout.tsx` (title and description)

### Change Contact Information

**Email**: Search and replace `hello@lsbrocante.fr` with your email
- `components/Footer.tsx`
- `app/contact/page.tsx`
- `app/shipping/page.tsx`

**Phone**: Search and replace `+33 1 23 45 67 89` with your phone
- `components/Footer.tsx`
- `app/contact/page.tsx`

**Address**: Search and replace `Paris, France` or full address
- `components/Footer.tsx`
- `app/about/page.tsx`
- `app/contact/page.tsx`

### Change Social Media Links

**Location**: `components/Footer.tsx` (lines 45-52)
```typescript
<a href="https://facebook.com/your-page" className="...">
  <Facebook size={20} />
</a>
```

## 2. Branding & Colors

### Update Color Palette

**Location**: `tailwind.config.ts`

```typescript
colors: {
  primary: {
    50: '#F7F1E8',    // Lightest cream
    100: '#EFE9DE',
    200: '#E7D7C5',   // Light beige
    300: '#D5B8A1',
    400: '#C46A2A',   // Burnt orange (accent)
    500: '#B68B2B',   // Dark yellow
    600: '#5A3A2B',   // Brown
    700: '#2B1B12',   // Dark brown
    900: '#1A0F08',   // Almost black
  },
  accent: {
    orange: '#C46A2A',
    yellow: '#B68B2B',
  },
}
```

**Common colors to change**:
- `primary-700`: Main dark color (headings, buttons)
- `accent-orange`: Button and highlight color
- `primary-50`: Background light color

### Add Custom Colors

For example, add a new color for seasonal themes:

```typescript
colors: {
  // ... existing colors
  seasonal: {
    christmas: '#C41E3A',
    autumn: '#D2691E',
  }
}
```

Then use: `bg-seasonal-christmas text-seasonal-autumn`

### Update Typography

**Location**: `tailwind.config.ts` and `app/globals.css`

Change fonts in `globals.css` (lines 1):
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
```

Available Google Fonts:
- Serif: Playfair Display, Cormorant Garamond, EB Garamond, Libre Baskerville
- Sans: Inter, Poppins, Montserrat, Raleway, Space Grotesk

Update in `tailwind.config.ts`:
```typescript
fontFamily: {
  serif: ['Cormorant Garamond', 'Georgia', 'serif'],
  sans: ['Poppins', 'system-ui', 'sans-serif'],
}
```

## 3. Pages & Content

### Home Page Slogan

**Location**: `app/page.tsx` (line 50)
```typescript
<h1 className="text-5xl md:text-7xl font-serif font-bold text-primary-700 mb-6">
  Objets rares, âme vintage
</h1>
```

Change to your own tagline!

### Categories

**Location**: `app/page.tsx` (lines 28-34)
```typescript
const categories = [
  { name: 'Meubles', slug: 'furniture', icon: Armchair },
  { name: 'Décoration', slug: 'decor', icon: Palette },
  // ... add/remove as needed
]
```

Available icons from lucide-react:
- https://lucide.dev/

### Add New Pages

1. Create new file: `app/your-page/page.tsx`
2. Add to header navigation: `components/Header.tsx`
3. Add to footer: `components/Footer.tsx`

Example:
```typescript
// app/blog/page.tsx
export const metadata = {
  title: 'Blog | Le Studio Brocante',
  description: 'Articles sur le vintage et l\'antiquité',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen py-24 bg-primary-50">
      <div className="container-narrow">
        <h1 className="text-4xl font-serif font-bold">Blog</h1>
        {/* Content */}
      </div>
    </div>
  )
}
```

## 4. Admin Settings

### Change Admin Password

**Location**: `.env.local`
```env
ADMIN_PASSWORD=your_new_secure_password_here
```

Then restart dev server: `npm run dev`

### Add Admin Users (Advanced)

For multiple admin users, modify `lib/admin-auth.ts`:

```typescript
const ADMIN_CREDENTIALS = [
  { username: 'admin', password: 'password1' },
  { username: 'manager', password: 'password2' },
]

export const verifyAdminPassword = (username: string, password: string): boolean => {
  return ADMIN_CREDENTIALS.some(
    cred => cred.username === username && cred.password === password
  )
}
```

Then update `app/admin/page.tsx` to include username field.

## 5. Product Management

### Product Categories

**Location**: `app/shop/page.tsx` (line 48)
```typescript
const categories = [
  'furniture',
  'decor',
  'ceramics',
  'mirrors',
  'lighting',
  'art',
  // Add new categories here
  'jewelry',
  'textiles',
]
```

Also update in:
- `app/page.tsx` (category display)
- `app/admin/add-product/page.tsx` (dropdown)

### Product Conditions

**Available conditions**:
- `excellent` → Excellent
- `very-good` → Très bon
- `good` → Bon
- `fair` → Acceptable
- `restored` → Restauré

Add new ones in `app/admin/add-product/page.tsx` and database.

## 6. Checkout & Orders

### Change Order Prefix

**Location**: `app/order-confirmation/[id]/page.tsx` (line 16)
```typescript
// BEFORE
{order.id.substring(0, 8).toUpperCase()}

// AFTER
{order.id.substring(0, 12).toUpperCase()}
```

### Add Required Fields

Edit `app/checkout/page.tsx` to add fields like:
- Company name
- VAT number
- Delivery instructions

Example:
```typescript
<input
  type="text"
  name="company"
  placeholder="Nom de l'entreprise (optionnel)"
  value={formData.company}
  onChange={handleChange}
  className="input-field"
/>
```

### Customize Shipping

**Location**: `app/checkout/page.tsx` and `app/cart/page.tsx`

Currently shows "À calculer" or "Gratuite". To add real shipping:

```typescript
const calculateShipping = (total: number): number => {
  if (total > 500) return 0; // Free shipping
  if (total > 250) return 15;
  return 25;
}
```

## 7. SEO Optimization

### Update Meta Tags

**Location**: `app/layout.tsx`
```typescript
export const metadata: Metadata = {
  title: 'Le Studio Brocante - Your tagline',
  description: 'Your store description',
  openGraph: {
    title: 'Your title',
    description: 'Your description',
  },
}
```

### Add Structured Data

For better SEO, add JSON-LD schema:

```typescript
// app/page.tsx
export default function Home() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Le Studio Brocante',
    url: 'https://yoursite.com',
    logo: 'https://yoursite.com/logo.png',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* rest */}
    </>
  )
}
```

## 8. Performance Optimization

### Image Optimization

Already configured in `next.config.js`:
```javascript
images: {
  formats: ['image/webp', 'image/avif'],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**.supabase.co',
    },
  ],
}
```

### Font Optimization

Already using Google Fonts with `display=swap`.

### Build Optimization

Check bundle size:
```bash
npm run build
```

## 9. Analytics & Tracking

### Add Google Analytics

**Location**: `app/layout.tsx`

```typescript
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

Replace `GA_MEASUREMENT_ID` with your Google Analytics ID.

### Vercel Analytics

Already available on Vercel! Just deploy and check dashboard.

## 10. Email Notifications

### Add Order Confirmation Emails

Install Resend or SendGrid:
```bash
npm install resend  # or sendgrid
```

Create `app/api/send-order-email/route.ts`:
```typescript
import { resend } from 'resend'

export async function POST(request: Request) {
  const order = await request.json()
  
  await resend.emails.send({
    from: 'orders@lsbrocante.fr',
    to: order.email,
    subject: `Order confirmation #${order.id}`,
    html: `<p>Thank you for your order!</p>`,
  })
  
  return Response.json({ success: true })
}
```

Then call from `app/checkout/page.tsx`:
```typescript
await fetch('/api/send-order-email', {
  method: 'POST',
  body: JSON.stringify(orderData),
})
```

## 11. Troubleshooting

### Styles not applying
- Clear `.next` folder: `rm -rf .next`
- Restart server: `npm run dev`

### Images broken after deploy
- Check Supabase bucket is public
- Verify image URLs in database
- Check CORS settings

### Cart not persisting
- Check localStorage enabled
- Clear browser cache
- Check Zustand hydration in component

### Admin access denied
- Verify `ADMIN_PASSWORD` in `.env.local`
- Check password matches exactly
- Restart server

---

**Need more help?** Check the main README.md or create an issue!
