export const metadata = {
  title: 'Politique de confidentialité | Le Studio Brocante',
  description: 'Politique de confidentialité et traitement des données.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-primary-50 py-24">
      <div className="container-narrow max-w-3xl">
        <h1 className="text-4xl font-serif font-bold text-primary-700 mb-12">
          Politique de confidentialité
        </h1>

        <div className="bg-white rounded-2xl p-8 space-y-8 text-primary-600 leading-relaxed">
          <section>
            <h2 className="font-serif font-semibold text-xl text-primary-700 mb-4">
              1. Introduction
            </h2>
            <p>
              Le Studio Brocante est engagé à protéger votre vie privée. Cette
              politique explique comment nous collectons, utilisons et protégeons
              vos données personnelles.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-semibold text-xl text-primary-700 mb-4">
              2. Données collectées
            </h2>
            <p>Nous collectons les informations suivantes:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Nom complet</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Adresse de livraison</li>
              <li>Historique de navigation</li>
              <li>Informations de commande</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-semibold text-xl text-primary-700 mb-4">
              3. Utilisation des données
            </h2>
            <p>Vos données sont utilisées pour:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Traiter vos commandes</li>
              <li>Envoyer des confirmations et des mises à jour</li>
              <li>Améliorer notre service</li>
              <li>Vous envoyer des offres (avec consentement)</li>
              <li>Respecter les obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif font-semibold text-xl text-primary-700 mb-4">
              4. Protection des données
            </h2>
            <p>
              Nous utilisons les meilleures pratiques pour protéger vos données
              personnelles. Toutes les données sont chiffrées en transit et au repos.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-semibold text-xl text-primary-700 mb-4">
              5. Cookies
            </h2>
            <p>
              Notre site utilise des cookies pour améliorer votre expérience.
              Vous pouvez contrôler les cookies dans les paramètres de votre
              navigateur.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-semibold text-xl text-primary-700 mb-4">
              6. Vos droits
            </h2>
            <p>
              Vous avez le droit d&apos;accéder, modifier ou supprimer vos données
              personnelles. Contactez-nous pour exercer ces droits.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-semibold text-xl text-primary-700 mb-4">
              7. Contact
            </h2>
            <p>
              Pour des questions concernant cette politique, contactez-nous:
            </p>
            <p className="mt-3">
              <strong>Email:</strong> hello@lsbrocante.fr<br />
              <strong>Adresse:</strong> 4, Rue de Thorigny, 75003 Paris
            </p>
          </section>

          <section className="border-t border-primary-200 pt-8">
            <p className="text-sm text-primary-500">
              Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
