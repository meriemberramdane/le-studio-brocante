export const metadata = {
  title: 'Livraison et retours | Le Studio Brocante',
  description: 'Informations sur la livraison, les retours et la politique de remboursement.',
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-primary-50">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-primary-100 to-primary-50">
        <div className="container-narrow text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary-700 mb-6">
            Livraison et retours
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container-narrow max-w-3xl">
          <div className="space-y-12">
            {/* Shipping */}
            <div className="bg-white rounded-2xl p-8">
              <h2 className="font-serif font-semibold text-2xl text-primary-700 mb-6">
                Livraison
              </h2>
              <div className="space-y-4 text-primary-600 leading-relaxed">
                <p>
                  <strong>Délai de livraison:</strong> Nos commandes sont
                  généralement traitées et expédiées sous 3-5 jours ouvrables.
                  Les délais de livraison sont de 5-7 jours ouvrables en France
                  métropolitaine.
                </p>
                <p>
                  <strong>Frais de port:</strong> La livraison est gratuite
                  pour toute commande. Pour les livraisons à l&apos;étranger,
                  veuillez nous contacter directement.
                </p>
                <p>
                  <strong>Emballage:</strong> Nous emballons chaque article
                  avec le plus grand soin pour assurer son arrivée en parfait
                  état. Les pièces fragiles sont spécialement protégées.
                </p>
                <p>
                  <strong>Suivi:</strong> Un numéro de suivi vous sera envoyé
                  par email dès que votre colis est expédié.
                </p>
              </div>
            </div>

            {/* Returns */}
            <div className="bg-white rounded-2xl p-8">
              <h2 className="font-serif font-semibold text-2xl text-primary-700 mb-6">
                Retours et remboursements
              </h2>
              <div className="space-y-4 text-primary-600 leading-relaxed">
                <p>
                  <strong>Délai de rétractation:</strong> Vous avez 14 jours
                  après réception de votre commande pour demander un retour.
                </p>
                <p>
                  <strong>Conditions de retour:</strong> L&apos;article doit être
                  retourné dans son état d&apos;origine, non utilisé et dans son
                  emballage d&apos;origine. Les articles anciens et vintage doivent
                  montrer un soin raisonnable.
                </p>
                <p>
                  <strong>Remboursement:</strong> Une fois votre retour reçu et
                  inspecté, nous émettrons un remboursement dans les 14 jours.
                  Les frais de retour sont à votre charge.
                </p>
                <p>
                  <strong>Articles endommagés:</strong> Si vous recevez un
                  article endommagé, veuillez nous contacter dans les 48 heures.
                  Nous arrangerons un remplacement ou un remboursement.
                </p>
              </div>
            </div>

            {/* Authenticity Guarantee */}
            <div className="bg-white rounded-2xl p-8">
              <h2 className="font-serif font-semibold text-2xl text-primary-700 mb-6">
                Garantie d&apos;authenticité
              </h2>
              <div className="space-y-4 text-primary-600 leading-relaxed">
                <p>
                  Nous garantissons l&apos;authenticité de chaque article vendu. Si
                  vous avez des doutes concernant l&apos;authenticité d&apos;un article,
                  contactez-nous immédiatement avec des preuves, et nous
                  procéderons à un remboursement complet.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-primary-700 rounded-2xl p-8 text-white text-center">
              <h3 className="font-serif font-semibold text-2xl mb-4">
                Des questions ?
              </h3>
              <p className="mb-6">
                Contactez-nous pour plus d&apos;informations sur nos politiques.
              </p>
              <a href="/contact" className="btn-primary inline-block">
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
