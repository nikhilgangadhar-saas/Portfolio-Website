import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { homepageMenus, headerLinks } from '../../data/headerNav'
import HeaderMenuLinks from './HeaderMenuLinks'
import MobileNav from './MobileNav'

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null)
  const headerRef = useRef(null)
  const menuTrigger = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (openMenu && headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenMenu(null)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape' && openMenu && headerRef.current.contains(document.activeElement)) {
        setOpenMenu(null)
        menuTrigger.current?.focus()
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
      <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <Link to="/" onClick={closeMenu} className="min-w-0 lg:justify-self-start">
          <div className="flex items-center gap-3">
            <BrandMark size="header" />

            <div>
              <div className="font-[Georgia] text-xl font-semibold tracking-tight text-white">
                NG Advisory Co.
              </div>
              <div className="hidden text-xs text-slate-400 sm:block lg:hidden xl:block">
                Business Control · Data Products · Practical Systems
              </div>
            </div>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex lg:justify-self-center">
          {headerLinks.map(({ label, path, menu }) => menu ? (
            <div key={menu} className="relative">
              <button
                type="button"
                aria-expanded={openMenu === menu}
                aria-controls={openMenu === menu ? `header-menu-${menu}` : undefined}
                onClick={(event) => {
                  menuTrigger.current = event.currentTarget
                  setOpenMenu(openMenu === menu ? null : menu)
                }}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors ${openMenu === menu ? 'bg-white/15 text-white' : 'text-slate-200 hover:bg-white/10 hover:text-white'}`}
              >
                {label}
                <span aria-hidden="true" className={`mb-0.5 size-1.5 border-b border-r border-current transition-transform ${openMenu === menu ? 'rotate-[225deg]' : 'rotate-45'}`} />
              </button>
              {openMenu === menu && (
                <div id={`header-menu-${menu}`} className="absolute left-1/2 top-full z-10 mt-3 w-80 -translate-x-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-black/25">
                  <HeaderMenuLinks menu={menu} onNavigate={closeMenu} showDescriptions />
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              onClick={closeMenu}
              className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium transition-colors ${isActive && !openMenu ? 'bg-white/12 text-white' : 'text-slate-200 hover:bg-white/10 hover:text-white'}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block lg:justify-self-end">
          <Link
            to="/contact"
            onClick={closeMenu}
            className="inline-block whitespace-nowrap rounded-full border border-blue-400/35 bg-blue-950 px-4 py-2.5 text-sm font-semibold text-blue-100 transition-colors hover:border-blue-300/60 hover:bg-blue-900"
          >
            Discuss a project
          </Link>
        </div>

        <MobileNav />
      </div>

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
