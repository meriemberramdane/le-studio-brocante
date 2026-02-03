export function getOrderConfirmationEmail(
  orderNumber: string,
  customerName: string,
  items: any[],
  total: number
): string {
  const itemsHtml = items
    .map(
      (item) =>
        `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        ${item.product_name}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        €${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2B1B12; color: white; padding: 20px; border-radius: 8px; text-align: center; }
          .content { padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          .total { font-size: 18px; font-weight: bold; text-align: right; padding: 20px 0; color: #C46A2A; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Le Studio Brocante</h1>
            <p>Confirmation de votre commande</p>
          </div>
          
          <div class="content">
            <h2>Bonjour ${customerName},</h2>
            <p>Merci pour votre commande! Voici les détails:</p>
            
            <p><strong>Numéro de commande:</strong> #${orderNumber}</p>
            
            <h3>Articles commandés:</h3>
            <table>
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="padding: 10px; text-align: left;">Produit</th>
                  <th style="padding: 10px; text-align: center;">Quantité</th>
                  <th style="padding: 10px; text-align: right;">Prix</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            
            <div class="total">
              Total: €${total.toFixed(2)}
            </div>
            
            <p>Nous allons préparer votre commande et vous enverrons un email de suivi dans les prochaines heures.</p>
            
            <p>Merci de votre confiance!</p>
            <p><strong>Le Studio Brocante</strong></p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function getAdminNotificationEmail(
  adminEmail: string,
  orderNumber: string,
  customerName: string,
  items: any[],
  total: number
): string {
  const itemsHtml = items
    .map(
      (item) =>
        `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        ${item.product_name}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        €${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #C46A2A; color: white; padding: 20px; border-radius: 8px; text-align: center; }
          .content { padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          .total { font-size: 18px; font-weight: bold; text-align: right; padding: 20px 0; color: #C46A2A; }
          .alert { background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>NOUVELLE COMMANDE!</h1>
          </div>
          
          <div class="content">
            <div class="alert">
              <p><strong>Une nouvelle commande a été reçue!</strong></p>
            </div>
            
            <h3>Détails du client:</h3>
            <p><strong>Nom:</strong> ${customerName}</p>
            
            <h3>Articles commandés:</h3>
            <table>
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="padding: 10px; text-align: left;">Produit</th>
                  <th style="padding: 10px; text-align: center;">Quantité</th>
                  <th style="padding: 10px; text-align: right;">Prix</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            
            <div class="total">
              Total: €${total.toFixed(2)}
            </div>
            
            <p>
              <a href="https://le-studio-brocante.vercel.app/admin/orders" 
                 style="background-color: #C46A2A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Voir la commande
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}