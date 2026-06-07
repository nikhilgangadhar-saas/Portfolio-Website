import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

export default function BlogDetail() {
    const { slug } = useParams()

    const [isMiniMapOpen, setIsMiniMapOpen] = useState(false)

    const post = blogPosts.find(
        (item) => item.slug === slug && item.status === 'published'
    )

    const [activeSection, setActiveSection] = useState('section-0')

    const articleSections = useMemo(() => post?.sections || [], [post])

    useEffect(() => {
        if (!post || articleSections.length === 0) return

        const sectionElements = articleSections
            .map((_, index) => document.getElementById(`section-${index}`))
            .filter(Boolean)

        if (sectionElements.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

                if (visibleEntries.length > 0) {
                    setActiveSection(visibleEntries[0].target.id)
                }
            },
            {
                root: null,
                rootMargin: '-220px 0px -55% 0px',
                threshold: 0.01,
            }
        )

        sectionElements.forEach((section) => observer.observe(section))

        return () => observer.disconnect()
    }, [post, articleSections])

    if (!post) {
        return (
            <main className="bg-[#f4f7fb] px-5 py-20">
                <section className="mx-auto max-w-3xl rounded-[1.5rem] bg-white p-8 text-center shadow-sm">
                    <h1 className="text-3xl font-extrabold text-slate-950">
                        Article not found
                    </h1>

                    <p className="mt-4 text-slate-600">
                        This article may still be in draft or the link may be incorrect.
                    </p>

                    <Link
                        to="/blog"
                        className="mt-6 inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
                    >
                        Back to Blog
                    </Link>
                </section>
            </main>
        )
    }

    const publishedPosts = blogPosts.filter(
        (item) => item.status === 'published' && item.slug !== post.slug
    )

    const samePathArticles = publishedPosts
        .filter((item) => item.category === post.category)
        .slice(0, 3)

    const otherArticles = publishedPosts
        .filter((item) => item.category !== post.category)
        .slice(0, 3)

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId)
        if (!section) return

        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    return (
        <article className="bg-[#f4f7fb]">
            <section className="relative overflow-hidden bg-slate-950 text-white">
                <div className="absolute inset-0 bg-premium-grid opacity-60" />

                <div className="relative mx-auto w-full max-w-[1600px] px-4 py-12 md:py-14">
                    <Link
                        to="/blog"
                        className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-blue-100 transition hover:bg-white/15"
                    >
                        ← Back to Blog
                    </Link>

                    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                        <div>
                            <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-blue-400/15 px-3 py-1 text-xs font-bold text-blue-100">
                                    {post.category}
                                </span>

                                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200">
                                    {post.date}
                                </span>

                                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200">
                                    {post.readTime}
                                </span>
                            </div>

                            <h1 className="mt-5 max-w-5xl text-4xl font-extrabold tracking-tight md:text-5xl">
                                {post.title}
                            </h1>

                            <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300 md:text-lg">
                                {post.excerpt}
                            </p>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
                                Article Path
                            </div>

                            <p className="mt-3 text-base font-extrabold leading-6 text-white">
                                {post.category}
                            </p>

                            <div className="mt-5 border-t border-white/10 pt-5">
                                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
                                    Target Audience
                                </div>

                                <p className="mt-3 text-sm leading-6 text-slate-300">
                                    {post.audience}
                                </p>
                            </div>

                            <div className="mt-5 border-t border-white/10 pt-5 text-sm font-semibold text-slate-300">
                                By {post.author}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ArticleMiniMap
                sections={articleSections}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
            />

            <section className="mx-auto w-full max-w-[1600px] px-4 py-8">
                {/* {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="mb-6 max-h-[520px] w-full rounded-[1.5rem] border border-slate-200 object-cover shadow-sm"
          />
        ) : null} */}

                <main className="space-y-5">
                    {post.youtubeEmbedUrl ? (
                        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-black shadow-sm">
                            <iframe
                                src={post.youtubeEmbedUrl}
                                title={post.title}
                                className="aspect-video w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    ) : null}

                    {articleSections.map((section, index) => (
                        <ArticleSection
                            key={section.heading}
                            section={section}
                            index={index}
                        />
                    ))}

                    {(post.externalLinks?.length > 0 || post.linkedinUrl) && (
                        <footer className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                            {post.externalLinks?.length > 0 ? (
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                                        Related Links
                                    </div>

                                    <div className="mt-3 flex flex-col gap-2">
                                        {post.externalLinks.map((link) => (
                                            <a
                                                key={link.url}
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-sm font-bold text-blue-700 hover:text-blue-500"
                                            >
                                                {link.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {post.linkedinUrl ? (
                                <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white">
                                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
                                        LinkedIn Version
                                    </div>

                                    <a
                                        href={post.linkedinUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-3 inline-flex rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500"
                                    >
                                        View LinkedIn Post
                                    </a>
                                </div>
                            ) : null}
                        </footer>
                    )}
                </main>

                {(samePathArticles.length > 0 || otherArticles.length > 0) && (
                    <section className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                        <div className="mb-5">
                            <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                                Suggested Articles
                            </div>

                            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
                                Continue reading
                            </h2>
                        </div>

                        {samePathArticles.length > 0 ? (
                            <SuggestedGroup
                                title={`More from ${post.category}`}
                                articles={samePathArticles}
                            />
                        ) : null}

                        {otherArticles.length > 0 ? (
                            <SuggestedGroup
                                title="Other enterprise execution notes"
                                articles={otherArticles}
                            />
                        ) : null}
                    </section>
                )}
            </section>
        </article>
    )
}

function ArticleMiniMap({ sections, activeSection, scrollToSection }) {
    const [isOpen, setIsOpen] = useState(false)

    if (!sections?.length) return null

    const handleSectionClick = (sectionId) => {
        scrollToSection(sectionId)
        setIsOpen(false)
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="fixed right-4 top-[88px] z-50 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-extrabold text-blue-700 shadow-lg shadow-slate-900/10 transition hover:bg-blue-50 lg:right-6"
            >
                Contents
            </button>

            {isOpen ? (
                <button
                    type="button"
                    aria-label="Close article contents overlay"
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-50 bg-slate-950/20 backdrop-blur-[1px]"
                />
            ) : null}

            <aside
                className={`fixed right-0 top-0 z-[60] h-screen w-[min(420px,92vw)] transform border-l border-slate-200 bg-white shadow-2xl shadow-slate-950/20 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex h-full flex-col">
                    <div className="border-b border-slate-200 px-5 py-4">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                                    On this page
                                </div>

                                <h2 className="mt-1 text-lg font-extrabold text-slate-950">
                                    Article contents
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-4 py-4">
                        <div className="space-y-2">
                            {sections.map((section, index) => {
                                const sectionId = `section-${index}`
                                const isActive = activeSection === sectionId

                                return (
                                    <button
                                        key={section.heading}
                                        type="button"
                                        onClick={() => handleSectionClick(sectionId)}
                                        className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-bold leading-5 transition ${isActive
                                                ? 'border-blue-200 bg-blue-50 text-blue-800 shadow-sm'
                                                : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700'
                                            }`}
                                    >
                                        <span
                                            className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${isActive ? 'bg-blue-600' : 'bg-slate-300'
                                                }`}
                                        />

                                        <span>
                                            <span className="mr-1 text-slate-400">
                                                {index + 1}.
                                            </span>
                                            {section.heading}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </nav>
                </div>
            </aside>
        </>
    )
}

function ArticleSection({ section, index }) {
    return (
        <section
            id={`section-${index}`}
            className="scroll-mt-28 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6 lg:p-7"
        >
            <h2 className="text-2xl font-extrabold leading-tight text-slate-950 md:text-3xl">
                {section.heading}
            </h2>

            {section.body?.length > 0 ? (
                <div className="mt-4 space-y-3">
                    {section.body.map((paragraph) => (
                        <p
                            key={paragraph}
                            className="text-base leading-7 text-slate-700 md:text-[17px] md:leading-8"
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            ) : null}

            {section.highlight ? (
                <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-base font-extrabold leading-7 text-blue-950 md:text-[17px] md:leading-8">
                        {section.highlight}
                    </p>
                </div>
            ) : null}

            {section.list?.length > 0 ? (
                <ul className="mt-5 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                    {section.list.map((item) => (
                        <li
                            key={item}
                            className="rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-semibold leading-6 text-slate-700"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            ) : null}

            {section.image ? (
                <figure className="mt-5">
                    <img
                        src={section.image.src}
                        alt={section.image.alt || section.heading}
                        className="w-full rounded-2xl border border-slate-200 shadow-sm"
                    />

                    {section.image.alt ? (
                        <figcaption className="mt-2 text-center text-xs font-semibold text-slate-500">
                            {section.image.alt}
                        </figcaption>
                    ) : null}
                </figure>
            ) : null}
        </section>
    )
}

function SuggestedGroup({ title, articles }) {
    return (
        <div className="mt-6 first:mt-0">
            <h3 className="mb-3 text-lg font-extrabold text-slate-950">{title}</h3>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <Link
                        key={article.slug}
                        to={`/blog/${article.slug}`}
                        className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg"
                    >
                        <div className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
                            {article.category}
                        </div>

                        <h4 className="mt-2 text-base font-extrabold leading-snug text-slate-950">
                            {article.title}
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            {article.excerpt}
                        </p>

                        <div className="mt-3 text-sm font-bold text-blue-700">
                            Read article →
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}