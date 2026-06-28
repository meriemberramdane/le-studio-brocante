import { NextRequest, NextResponse } from 'next/server'
import emailjs from '@emailjs/nodejs'

const SERVICE_ID = process.env.EMAILJS_SERVICE_ID!
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID!
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY!
const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY!

emailjs.init({
  publicKey: PUBLIC_KEY,
  privateKey: PRIVATE_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      orderNumber,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items,
      total,
    } = body

    const itemsList = items
      .map(
        (item: any) =>
          `• ${item.product_name} - ${item.price.toFixed(2)} DA`
      )
      .join('<br>')

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        order_id: orderNumber,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        customer_address: customerAddress,
        order_items: itemsList,
        order_total: total.toFixed(2),
      }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        error: 'Email failed',
      },
      {
        status: 500,
      }
    )
  }
}