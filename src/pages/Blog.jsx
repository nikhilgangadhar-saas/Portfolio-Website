import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogCategories, blogPosts } from '../data/blogPosts'

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const publishedPosts = useMemo(
    () =>
      blogPosts
        .filter((post) => post.status === 'published')
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    []
  )

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return publishedPosts
    return publishedPosts.filter((post) => post.category === selectedCategory)
  }, [publishedPosts, selectedCategory])

  return (
    <main className="bg-[#f4f7fb]">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-premium-grid opacity-60" />

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-12 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-blue-300/25 bg-blue-400/10 px-4 py-2 text-sm font-bold text-blue-200">
                Blog & Field Notes
              </div>

              <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight md:text-5xl">
                Practical notes on enterprise execution.
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                Long-form articles connected to ERP, Azure data platforms,
                governance, SCM systems, and practical business AI.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-blue-200">
                Publishing System
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Two posts per week. One clear idea per post. Written for serious
                enterprise execution, not random content.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-soft-grid opacity-60" />

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-10">
          <div className="mb-8 flex flex-col gap-5 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Five Content Paths
              </div>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">
                Structured writing, not random posting.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {blogCategories.map((category) => {
                const isActive = selectedCategory === category

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition ${
                      isActive
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700'
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>

            <div className="text-sm font-semibold text-slate-500">
              Showing {filteredPosts.length} published article
              {filteredPosts.length === 1 ? '' : 's'} for{' '}
              <span className="text-slate-900">{selectedCategory}</span>
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid items-stretch gap-6 xl:grid-cols-2">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-extrabold text-slate-950">
                No published articles in this section yet.
              </h3>

              <p className="mt-3 text-slate-600">
                This path is part of the content structure and will be filled as
                the weekly publishing cycle progresses.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function BlogCard({ post }) {
  return (
    <article className="grid h-full gap-5 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/10 md:grid-cols-[240px_1fr]">
      {post.coverImage ? (
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-56 w-full rounded-2xl object-cover md:h-full"
        />
      ) : (
        <div className="flex h-56 w-full items-center justify-center rounded-2xl bg-slate-950 p-5 text-center text-white md:h-full">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
              {post.category}
            </div>

            <div className="mt-3 text-xl font-extrabold leading-tight">
              Enterprise Execution Notes
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            {post.category}
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
            {post.date}
          </span>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            {post.readTime}
          </span>
        </div>

        <h3 className="mt-4 text-2xl font-extrabold leading-tight text-slate-950">
          {post.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>

        <div className="mt-4 rounded-2xl bg-[#f4f7fb] p-4">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Target Audience
          </div>

          <div className="mt-2 text-sm font-semibold text-slate-800">
            {post.audience}
          </div>
        </div>

        <div className="mt-auto pt-5">
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex w-full justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
          >
            Read Article
          </Link>
        </div>
      </div>
    </article>
  )
}