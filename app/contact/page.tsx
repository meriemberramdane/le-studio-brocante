'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setLoading(false)
      setTimeout(() => setSubmitted(false), 5000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-primary-100 to-primary-50">
        <div className="container-narrow text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary-700 mb-6">
            Contact
          </h1>
          <p className="text-xl text-primary-600 max-w-2xl mx-auto">
            Une question ? Nous sommes là pour vous aider.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Info */}
            <div className="card text-center">
              <MapPin className="w-12 h-12 text-accent-orange mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-lg text-primary-700 mb-2">
                Adresse
              </h3>
              <p className="text-primary-600">
                Boutique en ligne<br />
                31000 Oran, Algérie
              </p>
            </div>

            <div className="card text-center">
              <Phone className="w-12 h-12 text-accent-orange mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-lg text-primary-700 mb-2">
                Téléphone
              </h3>
              <p className="text-primary-600">
                +213 559 030 084<br />
                Tous les jours 9h - 21h
              </p>
            </div>

            <div className="card text-center">
              <Mail className="w-12 h-12 text-accent-orange mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-lg text-primary-700 mb-2">
                Email
              </h3>
              <p className="text-primary-600">
                <a href="berexirayan@gmail.com" className="hover:text-accent-orange transition-colors">
                  berexirayan@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-soft">
              <h2 className="font-serif font-semibold text-2xl text-primary-700 mb-8">
                Envoyez-nous un message
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  ✓ Merci pour votre message. Nous vous répondrons rapidement !
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Votre email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  placeholder="Sujet"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-field"
                />

                <textarea
                  name="message"
                  placeholder="Votre message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input-field resize-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Envoi en cours...' : 'Envoyer'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
