import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { homepageMenus, headerLinks } from '../../data/headerNav'
import MobileNav from './MobileNav'

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null)
  const headerRef = useRef(null)
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
          {headerLinks.map(({ label, path, menu }) => menu ? (
            <button
              key={menu}
              type="button"
              aria-expanded={openMenu === menu}
              aria-controls={openMenu === menu ? 'desktop-homepage-menu' : undefined}
              onClick={() => setOpenMenu(openMenu === menu ? null : menu)}
              className={`text-sm font-semibold transition ${openMenu === menu ? 'text-blue-300' : 'text-slate-300 hover:text-white'}`}
            >
              {label} <span aria-hidden="true" className="text-[10px]">▼</span>
            </button>
          ) : (
            <NavLink
              key={path}
              to={path}
              onClick={closeMenu}
              className={({ isActive }) => `text-sm font-semibold transition ${isActive && !openMenu ? 'text-blue-300' : 'text-slate-300 hover:text-white'}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/contact"
            onClick={closeMenu}
            className="rounded-full bg-blue-500 px-5 sm:px-8 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-400"
          >
            Discuss a project
          </Link>
        </div>

        <MobileNav />
      </div>

      {openMenu && (
        <div id="desktop-homepage-menu" className="absolute left-0 top-full hidden w-full border-t border-white/10 bg-slate-950 shadow-2xl lg:block">
          <div className="mx-auto grid max-w-[100rem] grid-cols-3 gap-3 px-8 py-6">
            {homepageMenus[openMenu].map((item) => (
              <Link key={item.id} to={`/#${item.id}`} onClick={closeMenu} className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white hover:border-white/30 hover:bg-white/10">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
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
