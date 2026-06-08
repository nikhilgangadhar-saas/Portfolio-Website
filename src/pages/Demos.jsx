import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const ROLE_OPTIONS = [
  'Student / Learner',
  'Analyst / Executive',
  'Senior Executive / Specialist',
  'Team Lead / Supervisor',
  'Manager',
  'Senior Manager',
  'Head of Department',
  'Director',
  'VP / General Manager',
  'CXO / Founder / Owner',
  'Consultant / Advisor',
  'Recruiter / Hiring Manager',
  'Other',
]

const COUNTRY_OPTIONS = [
  'United Arab Emirates',
  'India',
  'Saudi Arabia',
  'Qatar',
  'Oman',
  'Kuwait',
  'Bahrain',
  'United Kingdom',
  'United States',
  'Canada',
  'Australia',
  'New Zealand',
  'Singapore',
  'Other',
]

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  roleTitle: '',
  country: '',
  linkedinUrl: '',
  demoItemCode: '',
  message: '',
}

function getReadableDemoType(itemType) {
  const typeMap = {
    DOCUMENT: 'Document',
    SQL_PLAYGROUND: 'Interactive Demo',
    APP_TRIAL: 'Application Trial',
    WHATSAPP_BOT: 'Conversational Demo',
    PDF_DEMO: 'Automation Demo',
    AGENTIC_AI: 'AI Demo',
    OTHER: 'Demo Asset',
  }

  return typeMap[itemType] || 'Demo Asset'
}

export default function Demos() {
  const [form, setForm] = useState(initialForm)

  const [demoItems, setDemoItems] = useState([])
  const [isLoadingItems, setIsLoadingItems] = useState(true)
  const [itemsError, setItemsError] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const selectedDemo = useMemo(
    () => demoItems.find((item) => item.code === form.demoItemCode),
    [demoItems, form.demoItemCode]
  )

  useEffect(() => {
    async function loadDemoItems() {
      setIsLoadingItems(true)
      setItemsError('')

      try {
        const response = await fetch('/api/get-demo-items.php')
        const payload = await response.json().catch(() => null)

        if (!response.ok || !payload?.success) {
          throw new Error(payload?.message || 'Unable to load demo items')
        }

        setDemoItems(payload.items || [])
      } catch (error) {
        setItemsError('Unable to load demo items right now. Please try again later.')
      } finally {
        setIsLoadingItems(false)
      }
    }

    loadDemoItems()
  }, [])

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }))

    if (result) {
      setResult(null)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (isLoadingItems || demoItems.length === 0) {
      setResult({
        type: 'error',
        message: 'Demo items are not available right now. Please try again later.',
      })
      return
    }

    setIsSubmitting(true)
    setResult(null)

    try {
      const response = await fetch('/api/submit-demo-request.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          sourcePage: window.location.href,
        }),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok || !payload) {
        setResult({
          type: payload?.limitReached ? 'limit' : 'error',
          message:
            payload?.message ||
            'Something went wrong while submitting your request.',
          limitReached: payload?.limitReached || false,
        })
        return
      }

      if (payload.limitReached) {
        setResult({
          type: 'limit',
          message:
            payload.message ||
            'You have already used the available demo access limit.',
          limitReached: true,
        })
        return
      }

      if (payload.success) {
        setResult({
          type: 'success',
          message:
            payload.message ||
            'Your request has been received. Please check your email.',
          remainingAccess: payload.remainingAccess,
        })

        setForm(initialForm)
        return
      }

      setResult({
        type: 'error',
        message:
          payload.message ||
          'Something went wrong while submitting your request.',
      })
    } catch (error) {
      setResult({
        type: 'error',
        message:
          'Unable to submit the request right now. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-[#f4f7fb]">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-premium-grid opacity-60" />

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-blue-300/25 bg-blue-400/10 px-4 py-2 text-sm font-bold text-blue-200">
                Demo Access Hub
              </div>

              <h1 className="max-w-5xl text-4xl font-extrabold tracking-tight md:text-5xl">
                Controlled demos, documents, and practical enterprise execution examples.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300 md:text-lg">
                Request access to selected documents, system demos, data platform examples,
                and future automation workflows connected to ERP, Azure data platforms,
                governance, SCM, and practical business AI.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
                Access Rule
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Each email address can access up to 3 demo assets. After that,
                please request a walkthrough or contact me directly for deeper access.
              </p>

              <div className="mt-5 rounded-2xl border border-blue-300/20 bg-blue-400/10 p-4 text-sm font-semibold leading-6 text-blue-100">
                Product delivery and access instructions will be sent by email.
                Please use a working email address and check Spam, Promotions, or Junk
                if you do not see the email.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-soft-grid opacity-60" />

        <div className="relative mx-auto grid w-full max-w-[1600px] gap-8 px-4 py-10 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Available Demo Assets
            </div>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
              Select one item at a time.
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Available demo assets are controlled from the backend. Inactive and
              coming-soon items are not shown here.
            </p>

            {isLoadingItems ? (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-[#f8fafc] p-4 text-sm font-semibold text-slate-600">
                Loading available demo assets...
              </div>
            ) : null}

            {itemsError ? (
              <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-800">
                {itemsError}
              </div>
            ) : null}

            {!isLoadingItems && !itemsError && demoItems.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
                No demo assets are available right now.
              </div>
            ) : null}

            {demoItems.length > 0 ? (
              <div className="mt-6 grid gap-3">
                {demoItems.map((item) => {
                  const isSelected = form.demoItemCode === item.code

                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => updateField('demoItemCode', item.code)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? 'border-blue-300 bg-blue-50 shadow-sm'
                          : 'border-slate-200 bg-[#f8fafc] hover:border-blue-200 hover:bg-white'
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
                            {getReadableDemoType(item.itemType)}
                          </div>

                          <h3 className="mt-1 text-base font-extrabold text-slate-950">
                            {item.title}
                          </h3>
                        </div>

                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                          Available
                        </span>
                      </div>

                      {item.description ? (
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      ) : null}
                    </button>
                  )
                })}
              </div>
            ) : null}
          </section>

          <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Request Access
            </div>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
              Register for demo delivery.
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Complete the form below. Access instructions, document links, or demo
              next steps will be sent to your email address.
            </p>

            {selectedDemo ? (
              <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                  Selected Demo
                </div>

                <div className="mt-1 text-base font-extrabold text-blue-950">
                  {selectedDemo.title}
                </div>

                {selectedDemo.description ? (
                  <p className="mt-2 text-sm leading-6 text-blue-900">
                    {selectedDemo.description}
                  </p>
                ) : null}
              </div>
            ) : null}

            {result ? <ResultBox result={result} /> : null}

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="First name" required>
                  <input
                    value={form.firstName}
                    onChange={(event) =>
                      updateField('firstName', event.target.value)
                    }
                    required
                    className="form-input"
                    placeholder="First name"
                  />
                </Field>

                <Field label="Last name" required>
                  <input
                    value={form.lastName}
                    onChange={(event) =>
                      updateField('lastName', event.target.value)
                    }
                    required
                    className="form-input"
                    placeholder="Last name"
                  />
                </Field>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Email" required>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    required
                    className="form-input"
                    placeholder="you@company.com"
                  />
                </Field>

                <Field label="Phone number">
                  <input
                    value={form.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    className="form-input"
                    placeholder="+971..."
                  />
                </Field>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Company" required>
                  <input
                    value={form.company}
                    onChange={(event) =>
                      updateField('company', event.target.value)
                    }
                    required
                    className="form-input"
                    placeholder="Company / organization"
                  />
                </Field>

                <Field label="Role / designation" required>
                  <select
                    value={form.roleTitle}
                    onChange={(event) =>
                      updateField('roleTitle', event.target.value)
                    }
                    required
                    className="form-input"
                  >
                    <option value="">Select role</option>
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Country" required>
                  <select
                    value={form.country}
                    onChange={(event) =>
                      updateField('country', event.target.value)
                    }
                    required
                    className="form-input"
                  >
                    <option value="">Select country</option>
                    {COUNTRY_OPTIONS.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Demo item requested" required>
                  <select
                    value={form.demoItemCode}
                    onChange={(event) =>
                      updateField('demoItemCode', event.target.value)
                    }
                    required
                    disabled={isLoadingItems || demoItems.length === 0}
                    className="form-input disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    <option value="">Select demo item</option>
                    {demoItems.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="LinkedIn profile">
                <input
                  type="url"
                  value={form.linkedinUrl}
                  onChange={(event) =>
                    updateField('linkedinUrl', event.target.value)
                  }
                  className="form-input"
                  placeholder="https://www.linkedin.com/in/..."
                />
              </Field>

              <Field label="Message / reason for access">
                <textarea
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  className="form-input min-h-32 resize-y"
                  placeholder="Optional: Tell me what you are trying to review or evaluate."
                />
              </Field>

              <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4 text-sm font-semibold leading-6 text-slate-600">
                Product delivery will be sent by email. Please share a correct,
                working email address where you can receive the access link or document.
                If the email is not visible, check Spam, Promotions, or Junk.
              </div>

              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  isLoadingItems ||
                  demoItems.length === 0
                }
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isSubmitting ? 'Submitting request...' : 'Request Demo Access'}
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  )
}

function Field({ label, required = false, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-extrabold text-slate-800">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </span>

      {children}
    </label>
  )
}

function ResultBox({ result }) {
  if (result.type === 'success') {
    return (
      <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
        <div className="text-base font-extrabold text-emerald-900">
          Request received
        </div>

        <p className="mt-2 text-sm leading-6 text-emerald-800">
          {result.message}
        </p>

        {typeof result.remainingAccess === 'number' ? (
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
            Remaining demo accesses: {result.remainingAccess}
          </p>
        ) : null}
      </div>
    )
  }

  if (result.type === 'limit') {
    return (
      <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4">
        <div className="text-base font-extrabold text-amber-900">
          Access limit reached
        </div>

        <p className="mt-2 text-sm leading-6 text-amber-800">
          {result.message}
        </p>

        <Link
          to="/contact"
          className="mt-4 inline-flex rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Contact for Walkthrough
        </Link>
      </div>
    )
  }

  return (
    <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4">
      <div className="text-base font-extrabold text-red-900">
        Request failed
      </div>

      <p className="mt-2 text-sm leading-6 text-red-800">
        {result.message}
      </p>
    </div>
  )
}