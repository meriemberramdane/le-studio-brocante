import { NextRequest, NextResponse } from 'next/server'
import { getOrderConfirmationEmail, getAdminNotificationEmail } from '@/lib/email-template'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const ADMIN_EMAIL = 'berexirayan@gmail.com'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderNumber, customerName, customerEmail, items, total } = body

    // Email au client
    const customerEmailHtml = getOrderConfirmationEmail(
      orderNumber,
      customerName,
      items,
      total
    )

    // Email à l'admin
    const adminEmailHtml = getAdminNotificationEmail(
      customerName,
      items,
      total
    )

    // Envoyer aux deux
    const responses = await Promise.all([
      // Email au client
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'orders@lestudiobrocante.com',
          to: customerEmail,
          subject: `Confirmation de commande #${orderNumber}`,
          html: customerEmailHtml,
        }),
      }),
      // Email à l'admin
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'orders@lestudiobrocante.com',
          to: ADMIN_EMAIL,
          subject: `[ADMIN] Nouvelle commande reçue #${orderNumber}`,
          html: adminEmailHtml,
        }),
      }),
    ])

    // Vérifier les réponses
    for (const response of responses) {
      if (!response.ok) {
        throw new Error(`Email failed: ${response.statusText}`)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}