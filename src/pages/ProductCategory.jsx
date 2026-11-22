import { useState } from 'react'
import { Navigate, Link, useParams } from 'react-router-dom'
import { getProductCategory } from '../data/products'
import NotFound from './NotFound'

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
                <a href={product.file} download className="rounded-xl bg-blue-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-900">Download sample</a>
              </li>
            ))}
          </ul>
        ) : <p className="mt-3 rounded-xl border border-slate-200 bg-white p-5">No assets match your search and topic.</p>}
      </div>
    </section>
  )
}
