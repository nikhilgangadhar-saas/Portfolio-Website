import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navLinks } from '../../data/navLinks'
import { productCategories } from '../../data/products'
import { servicePackages } from '../../data/services'
import MobileNav from './MobileNav'
import { expertiseItems } from '../../data/expertise'
import { caseStudies } from '../../data/caseStudies'

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null)
  const headerRef = useRef(null)
  const location = useLocation()

  function isRouteActive(path) {
  if (openMenu) return false

  if (path === '/') {
    return location.pathname === '/'
  }

  return location.pathname.startsWith(path)
}
  useEffect(() => {
    function handleClickOutside(event) {
      if (openMenu && headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenMenu(null)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setOpenMenu(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [openMenu])

  function closeMenu() {
    setOpenMenu(null)
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between px-5 sm:px-8 py-4">
        <Link to="/" onClick={closeMenu}>
          <div className="flex items-center gap-3">
            <BrandMark size="header" />

            <div>
              <div className="font-[Georgia] text-xl font-semibold tracking-tight text-white">
                NG Advisory Co.
              </div>
              <div className="text-xs text-slate-400">
                Business Control · Data Products · Practical Systems
              </div>
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            if (link.path === '/products') {
              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => setOpenMenu(openMenu === 'products' ? null : 'products')}
                  className={`text-sm font-semibold transition ${
  openMenu === 'products' || isRouteActive('/products')
    ? 'text-blue-300'
    : 'text-slate-300 hover:text-white'
}`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    Products
                    <span className="text-[10px] leading-none">▼</span>
                  </span>
                </button>
              )
            }

            if (link.path === '/services') {
              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => setOpenMenu(openMenu === 'services' ? null : 'services')}
                  className={`text-sm font-semibold transition ${openMenu === 'services' || isRouteActive('/services')
                      ? 'text-blue-300'
                      : 'text-slate-300 hover:text-white'
                    }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    Services
                    <span className="text-[10px] leading-none">▼</span>
                  </span>
                </button>
              )
            }

            if (link.path === '/expertise') {
              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => setOpenMenu(openMenu === 'expertise' ? null : 'expertise')}
                  className={`text-sm font-semibold transition ${openMenu === 'expertise' || isRouteActive('/expertise')
                      ? 'text-blue-300'
                      : 'text-slate-300 hover:text-white'
                    }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    Expertise
                    <span className="text-[10px] leading-none">▼</span>
                  </span>
                </button>
              )
            }

            if (link.path === '/case-studies') {
              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() =>
                    setOpenMenu(openMenu === 'case-studies' ? null : 'case-studies')
                  }
                  className={`text-sm font-semibold transition ${openMenu === 'case-studies' || isRouteActive('/case-studies')
                      ? 'text-blue-300'
                      : 'text-slate-300 hover:text-white'
                    }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    Case Studies
                    <span className="text-[10px] leading-none">▼</span>
                  </span>
                </button>
              )
            }

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
  `text-sm font-semibold transition ${
    isActive && !openMenu
      ? 'text-blue-300'
      : 'text-slate-300 hover:text-white'
  }`
}
              >
                {link.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/contact"
            onClick={closeMenu}
            className="rounded-full border border-white/15 px-5 sm:px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Contact
          </Link>

          <Link
            to="/contact"
            onClick={closeMenu}
            className="rounded-full bg-blue-500 px-5 sm:px-8 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-400"
          >
            Book Advisory
          </Link>
        </div>

        <MobileNav />
      </div>

      {openMenu === 'products' && <ProductMegaMenu onClose={closeMenu} />}
      {openMenu === 'services' && <ServicesMegaMenu onClose={closeMenu} />}
      {openMenu === 'expertise' && <ExpertiseMegaMenu onClose={closeMenu} />}
      {openMenu === 'case-studies' && <CaseStudiesMegaMenu onClose={closeMenu} />}
    </header>
  )
}

function BrandMark({ size = 'header' }) {
  const wrapper =
    size === 'large'
      ? 'h-28 w-28 rounded-3xl'
      : 'h-12 w-12 rounded-xl'

  const ngText =
    size === 'large'
      ? 'text-[34px]'
      : 'text-[15px]'

  const coText =
    size === 'large'
      ? 'text-[15px]'
      : 'text-[7px]'

  return (
    <div
      className={`flex shrink-0 flex-col items-center justify-center border border-blue-900/70 bg-[#041527] shadow-lg shadow-blue-950/30 ${wrapper}`}
    >
      <div className={`font-[Georgia] font-bold leading-none text-white ${ngText}`}>
        NG
      </div>
      <div className={`mt-1 font-[Georgia] font-semibold leading-none tracking-[0.04em] text-slate-300 ${coText}`}>
        &amp;Co.
      </div>
    </div>
  )
}

function ProductMegaMenu({ onClose }) {
  return (
    <div className="absolute left-0 top-full w-full border-t border-white/10 bg-slate-950 shadow-2xl shadow-black/30">
      <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8 py-8">
        <MegaMenuHeader
          eyebrow="Products"
          title="Choose what you want to improve"
          subtitle="Start with the business problem. Pick a template, Excel tool, reporting product, or small application."
          onClose={onClose}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {productCategories.map((category) => (
              <div key={category.id}>
                <Link
                  to={`/products/${category.id}`}
                  onClick={onClose}
                  className="group block border-b border-white/10 pb-3"
                >
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                    {category.shortTitle}
                  </div>

                  <h4 className="mt-2 text-base font-extrabold text-white group-hover:text-blue-200">
                    {category.title}
                  </h4>
                </Link>

                <div className="mt-4 grid gap-3">
                  {category.products.map((product) => (
                    <Link
                      key={product.slug}
                      to={`/products/${category.id}/${product.slug}`}
                      onClick={onClose}
                      className="group flex items-start gap-3 rounded-xl px-2 py-2 transition hover:bg-white/[0.06]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300" />

                      <span>
                        <span className="block text-sm font-semibold leading-5 text-slate-200 group-hover:text-white">
                          {product.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-500">
                          {product.type}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <BrandingBox onClose={onClose} />
        </div>
      </div>
    </div>
  )
}

function ServicesMegaMenu({ onClose }) {
  return (
    <div className="absolute left-0 top-full w-full border-t border-white/10 bg-slate-950 shadow-2xl shadow-black/30">
      <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8 py-7">
        <MegaMenuHeader
          eyebrow="Services"
          title="Choose the support level"
          subtitle="Pick the level of help you need — from quick advisory to implementation support."
          onClose={onClose}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {servicePackages.map((service) => (
              <Link
                key={service.id}
                to={`/services#${service.id}`}
                onClick={onClose}
                className="group rounded-2xl px-3 py-3 transition hover:bg-white/[0.06]"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-xs font-black text-blue-300">
                    {service.title
                      .split(' ')
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join('')}
                  </div>

                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                      {service.label}
                    </div>

                    <h4 className="mt-1 text-base font-extrabold text-white group-hover:text-blue-200">
                      {service.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {service.description}
                    </p>

                    <div className="mt-3 text-sm font-bold text-blue-300">
                      View service →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <BrandingBox onClose={onClose} />
        </div>
      </div>
    </div>
  )
}

function ExpertiseMegaMenu({ onClose }) {
  return (
    <div className="absolute left-0 top-full w-full border-t border-white/10 bg-slate-950 shadow-2xl shadow-black/30">
      <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8 py-7">
        <MegaMenuHeader
          eyebrow="Expertise"
          title="Choose the business capability"
          subtitle="Explore practical expertise across SOPs, operations, warehouse control, data engineering, reporting products, and small applications."
          onClose={onClose}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {expertiseItems.map((item, index) => (
              <Link
                key={item.title}
                to={`/expertise#${item.id}`}
                onClick={onClose}
                className="group rounded-2xl px-3 py-3 transition hover:bg-white/[0.06]"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-xs font-black text-blue-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div>
                    <h4 className="text-base font-extrabold text-white group-hover:text-blue-200">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>

                    <div className="mt-3 text-sm font-bold text-blue-300">
                      View expertise →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <BrandingBox onClose={onClose} />
        </div>
      </div>
    </div>
  )
}

function CaseStudiesMegaMenu({ onClose }) {
  return (
    <div className="absolute left-0 top-full w-full border-t border-white/10 bg-slate-950 shadow-2xl shadow-black/30">
      <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8 py-7">
        <MegaMenuHeader
          eyebrow="Case Studies"
          title="Proof through real business systems"
          subtitle="Explore examples of data platforms, reporting automation, warehouse control, business applications, and audit governance."
          onClose={onClose}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {caseStudies.map((study, index) => (
              <Link
                key={study.title}
                to={`/case-studies/${study.slug}`}
                onClick={onClose}
                className="group rounded-2xl px-3 py-3 transition hover:bg-white/[0.06]"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-xs font-black text-blue-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                      {study.tag}
                    </div>

                    <h4 className="mt-1 text-base font-extrabold text-white group-hover:text-blue-200">
                      {study.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {study.description}
                    </p>

                    <div className="mt-3 text-sm font-bold text-blue-300">
                      View case study →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <BrandingBox onClose={onClose} />
        </div>
      </div>
    </div>
  )
}

function MegaMenuHeader({ eyebrow, title, subtitle, onClose }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">
          {eyebrow}
        </div>
        <h3 className="mt-2 text-2xl font-extrabold text-white">{title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          {subtitle}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
        aria-label="Close menu"
      >
        ×
      </button>
    </div>
  )
}

function BrandingBox({ onClose }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-slate-500/10 blur-3xl" />

      <div className="relative">
        <div className="flex justify-center">
          <BrandMark size="large" />
        </div>

        <div className="mt-6 text-center">
          <div className="font-[Georgia] text-2xl font-semibold tracking-tight text-white">
            NG Advisory Co.
          </div>
          <p className="mx-auto mt-3 max-w-[220px] text-sm leading-6 text-slate-400">
            Business control, data products, and practical systems for growing companies.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Start here
          </div>

          <div className="mt-3 grid gap-2 text-sm text-slate-300">
            <Link to="/products/sop-control" onClick={onClose} className="hover:text-white">
              SOP & Control Templates
            </Link>
            <Link to="/products/excel-tools" onClick={onClose} className="hover:text-white">
              Excel Business Tools
            </Link>
            <Link to="/services" onClick={onClose} className="hover:text-white">
              Advisory & Implementation
            </Link>
          </div>
        </div>

        <Link
          to="/contact"
          onClick={onClose}
          className="mt-5 inline-flex w-full justify-center rounded-full bg-blue-500 px-5 sm:px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400"
        >
          Ask for Recommendation
        </Link>
      </div>
    </div>
  )
}