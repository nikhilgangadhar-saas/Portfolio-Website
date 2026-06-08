import { useState } from 'react'
import Button from '../components/ui/Button'
import { trackEvent } from '../lib/analytics'

const contactReasons = [
  'Advisory Call',
  'Product Access',
  'Custom Implementation',
  'Mentorship',
  'Case Study / Similar Work',
  'Content / Collaboration',
]

const countryOptions = [
  '',
  'United Arab Emirates',
  'Saudi Arabia',
  'Qatar',
  'Oman',
  'Bahrain',
  'Kuwait',
  'Libya',
  'Lebanon',
  'Turkey',
  'India',
  'United Kingdom',
  'Australia',
  'New Zealand',
  'Japan',
  'European Union',
  'United States',
  'Canada',
  'Other',
]

const nextSteps = [
  'I review the problem and category selected.',
  'I reply with the best next path: product, advisory, design, or implementation.',
  'If useful, we schedule a focused discussion.',
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    reason: 'Advisory Call',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    trackEvent('contact_submit_attempt', {
      event_category: 'contact',
      event_label: 'Submit Request clicked',
      form_name: 'contact_form',
      reason: formData.reason,
      country: formData.country || 'not_provided',
    })

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/submit-lead.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          sourcePage: window.location.href,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Submission failed')
      }

      trackEvent('contact_form_submit', {
        event_category: 'contact',
        event_label: 'Contact form submitted successfully',
        form_name: 'contact_form',
        reason: formData.reason,
        country: formData.country || 'not_provided',
      })

      setSubmitStatus({
        type: 'success',
        message: 'Thank you. Your request has been submitted successfully.',
      })

      setFormData({
        name: '',
        email: '',
        company: '',
        country: '',
        reason: 'Advisory Call',
        message: '',
      })
    } catch (error) {
      console.error(error)

      trackEvent('contact_form_error', {
        event_category: 'contact',
        event_label: 'Contact form submission failed',
        form_name: 'contact_form',
        reason: formData.reason,
        country: formData.country || 'not_provided',
        error_message: error.message || 'unknown_error',
      })

      setSubmitStatus({
        type: 'error',
        message:
          'Something went wrong. Please try again or contact me directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-premium-grid opacity-70" />
        <div className="motion-blob-one absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="motion-blob-two absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-400/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-24">
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex rounded-full border border-blue-300/25 bg-blue-400/10 px-4 py-2 text-sm font-bold text-blue-200">
              Contact
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
              Tell me the business problem you want to solve.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Use this page for advisory, product access, mentorship, custom
              implementation, or discussing similar work.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/products/sop-control">Explore Products</Button>
              <Button to="/services" variant="glass">
                View Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f4f7fb]">
        <div className="absolute inset-0 bg-soft-grid opacity-70" />
        <div className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl" />
        <div className="absolute bottom-40 right-0 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Let's Talk
              </div>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-950">
                Start with the right intent.
              </h2>

              <div className="mt-6 grid gap-2">
                {contactReasons.map((reason) => (
                  <button
                    key={reason}
                    type="button"
                    onClick={() =>
                      setFormData((current) => ({
                        ...current,
                        reason,
                      }))
                    }
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      formData.reason === reason
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-200 bg-[#f4f7fb] text-slate-700 hover:border-blue-200 hover:text-blue-700'
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                What Happens Next
              </div>

              <div className="mt-5 grid gap-4">
                {nextSteps.map((step, index) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-50 text-xs font-black text-blue-700">
                      {index + 1}
                    </div>

                    <div className="text-sm leading-6 text-slate-700">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20">
              <div className="text-sm font-bold text-white">
                Direct contact
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Later we can add your email, LinkedIn, WhatsApp, booking link,
                and newsletter signup here.
              </p>
            </div>
          </aside>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 md:p-8">
            <div className="max-w-2xl">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Lead Form
              </div>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-4xl">
                Send the details.
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Keep it simple. Describe the problem, what you have today, and
                what you want to improve.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />

                <div>
                  <label className="text-sm font-bold text-slate-800">
                    Country
                  </label>

                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#f4f7fb] px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                  >
                    {countryOptions.map((country) => (
                      <option key={country || 'empty'} value={country}>
                        {country || 'Select country'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-800">
                  Reason
                </label>

                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#f4f7fb] px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                >
                  {contactReasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-800">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="7"
                  placeholder="Example: I need help creating a warehouse SOP and stock count control process..."
                  className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-[#f4f7fb] px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              {submitStatus && (
                <div
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                    submitStatus.type === 'success'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
}) {
  return (
    <div>
      <label className="text-sm font-bold text-slate-800">{label}</label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#f4f7fb] px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
      />
    </div>
  )
}