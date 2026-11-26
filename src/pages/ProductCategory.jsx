import { useEffect, useRef, useState } from 'react'
import { Navigate, Link, useParams } from 'react-router-dom'
import { getProductCategory } from '../data/products'
import NotFound from './NotFound'
import { trackEvent } from '../lib/analytics'

const primaryAction = 'rounded-xl bg-blue-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-900'
const secondaryAction = 'rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100'

const topics = {
  'warehouse-sop-starter-pack': 'Warehouse operations',
  'internal-audit-plan-checklist': 'Audit',
  'approval-matrix-template': 'Approvals',
  'stock-reconciliation-template': 'Inventory',
  'inventory-ageing-template': 'Inventory',
  'internal-audit-action-tracker': 'Audit',
}

export default function ProductCategory() {
  const { categoryId } = useParams()
  const category = getProductCategory(categoryId)
  if (!category) return <NotFound />
  if (category.href.startsWith('/products#')) return <Navigate to={category.href} replace />
  return <AssetLibrary key={categoryId} category={category} />
}

function AssetLibrary({ category }) {
  const [search, setSearch] = useState('')
  const [topic, setTopic] = useState('')
  const [sort, setSort] = useState('featured')
  const [offer, setOffer] = useState(null)
  const dialog = useRef(null)
  const buyLabel = category.id === 'excel-tools' ? 'Buy Workbook' : 'Buy Full Version'

  useEffect(() => {
    if (offer && !dialog.current.open) dialog.current.showModal()
  }, [offer])

  function trackProductAction(eventName, product) {
    trackEvent(eventName, { product_id: product.slug, product_category: category.id })
  }
  const filters = [...new Set(category.products.map(({ slug }) => topics[slug]).filter(Boolean))]
  const query = search.trim().toLowerCase()
  const results = category.products.filter(({ name, description, format, slug }) =>
    (!topic || topics[slug] === topic) &&
    `${name} ${description} ${format} ${topics[slug] ?? ''}`.toLowerCase().includes(query)
  )
  if (sort === 'name') results.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <section className="min-h-[60vh] bg-slate-100 px-5 py-12 text-slate-950 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link to="/products" className="font-semibold text-blue-900 hover:underline">All products &amp; solutions</Link>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">{category.title}</h1>
        <p className="mt-3 max-w-2xl text-slate-700">{category.description}</p>

        <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-[2fr_1fr_1fr]">
          <label className="grid gap-2 text-sm font-semibold">
            Search assets
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name or keyword" className="min-w-0 rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Topic
            <select value={topic} onChange={(event) => setTopic(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2">
              <option value="">All topics</option>
              {filters.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Sort by
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2">
              <option value="featured">Featured</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>

        <p aria-live="polite" className="mt-5 text-sm text-slate-700">{results.length} {results.length === 1 ? 'asset' : 'assets'} found</p>
        {results.length ? (
          <ul className="mt-3 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {results.map((product) => (
              <li key={product.slug} className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div>
                  <p className="text-sm font-semibold text-slate-600">{topics[product.slug]} · {product.format}</p>
                  <h2 className="mt-1 text-xl font-bold">{product.name}</h2>
                  <p className="mt-1 text-slate-700">{product.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" aria-haspopup="dialog" onClick={() => setOffer({ product, mode: 'sample' })} className={primaryAction}>Download Sample</button>
                  <button type="button" aria-haspopup="dialog" onClick={() => setOffer({ product, mode: 'buy' })} className={secondaryAction}>{buyLabel}</button>
                </div>
              </li>
            ))}
          </ul>
        ) : <p className="mt-3 rounded-xl border border-slate-200 bg-white p-5">No assets match your search and topic.</p>}
      </div>
      <dialog
        ref={dialog}
        aria-labelledby="asset-offer-title"
        aria-describedby="asset-offer-description"
        onClose={() => setOffer(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
        className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-lg overflow-auto rounded-2xl bg-white text-slate-950 shadow-2xl backdrop:bg-slate-950/65"
      >
        {offer && (
          <div className="p-5 sm:p-7">
            <h2 id="asset-offer-title" className="text-xl font-bold">{offer.product.name}</h2>
            <p id="asset-offer-description" className="mt-3 leading-7 text-slate-700">
              {offer.mode === 'sample'
                ? 'This sample has limited functionality. Use it to preview the layout and workflow. You can contact us to buy the full version.'
                : 'We recommend downloading the sample before buying the full version. When you’re ready, contact us for pricing and purchase details.'}
            </p>
            {offer.product.workflow && (
              <dl className="mt-4 space-y-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                <div>
                  <dt className="font-bold text-slate-950">What it does</dt>
                  <dd>{offer.product.workflow}</dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-950">What you need</dt>
                  <dd>{offer.product.requirements}</dd>
                </div>
              </dl>
            )}
            {offer.mode === 'sample' && (
              <SampleRequest product={offer.product} onSent={() => trackProductAction('sample_email_sent', offer.product)} />
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              {offer.mode === 'sample' ? (
                <button type="button" onClick={() => setOffer({ ...offer, mode: 'buy' })} className={secondaryAction}>{buyLabel}</button>
              ) : (
                <>
                  <button type="button" onClick={() => setOffer({ ...offer, mode: 'sample' })} className={secondaryAction}>Get the Sample</button>
                  <Link to={`/contact?product=${encodeURIComponent(offer.product.slug)}`} onClick={() => trackProductAction('buy_product_intent', offer.product)} className={primaryAction}>Continue to Contact</Link>
                </>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}

function SampleRequest({ product, onSent }) {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  async function requestSample(event) {
    event.preventDefault()
    if (status === 'pending') return
    if (import.meta.env.DEV) {
      setMessage('The local preview cannot send sample emails. This form needs the hosted PHP endpoint.')
      setStatus('error')
      return
    }
    const email = new FormData(event.currentTarget).get('email')
    setStatus('pending')

    try {
      const response = await fetch('/api/request-sample.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: product.slug }),
      })
      const result = await response.json()
      setMessage(result.message)
      if (!response.ok || !result.success) {
        setStatus('error')
        return
      }
      setStatus('ready')
      if (result.newDelivery) onSent()
    } catch {
      setMessage('Sample email is temporarily unavailable. Please try again later.')
      setStatus('error')
    }
  }

  if (status === 'ready') {
    return <p role="status" className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-950">{message}</p>
  }

  return (
    <form onSubmit={requestSample} className="mt-5">
      <label htmlFor="sample-email" className="block text-sm font-semibold">Email address</label>
      <p id="sample-email-help" className="mt-1 text-sm text-slate-700">We’ll send the sample as an attachment to this address.</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <input id="sample-email" name="email" type="email" autoComplete="email" aria-describedby="sample-email-help" required className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-2" />
        <button type="submit" disabled={status === 'pending'} className={`${primaryAction} disabled:opacity-60`}>{status === 'pending' ? 'Sending…' : 'Email Me the Sample'}</button>
      </div>
      {status === 'error' && <p role="alert" className="mt-2 text-sm text-red-700">{message}</p>}
    </form>
  )
}
