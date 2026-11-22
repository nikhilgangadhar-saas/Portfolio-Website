import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { headerLinks, homepageMenus } from '../../data/headerNav'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [openSection, setOpenSection] = useState(null)

  function closeMenu() {
    setIsOpen(false)
    setOpenSection(null)
  }

  return (
    <div className="lg:hidden" onKeyDown={(event) => {
      if (event.key === 'Escape') closeMenu()
    }}>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => isOpen ? closeMenu() : setIsOpen(true)}
        className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white"
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

      {isOpen && (
        <nav className="absolute left-0 top-full flex max-h-[calc(100dvh-5rem)] w-full flex-col gap-4 overflow-y-auto border-b border-white/10 bg-slate-950 p-5 shadow-2xl">
          {headerLinks.map(({ label, menu, path }) => menu ? (
            <div key={menu}>
              <button
                type="button"
                aria-expanded={openSection === menu}
                onClick={() => setOpenSection(openSection === menu ? null : menu)}
                className="flex w-full items-center justify-between font-semibold text-slate-200"
              >
                {label}
                <span aria-hidden="true">{openSection === menu ? '−' : '+'}</span>
              </button>
              {openSection === menu && (
                <div className="mt-3 grid gap-2">
                  {homepageMenus[menu].map((item) => (
                    <Link key={item.id} to={`/#${item.id}`} onClick={closeMenu} className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white">
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink key={path} to={path} onClick={closeMenu} className={({ isActive }) => `font-semibold ${isActive ? 'text-blue-300' : 'text-slate-200'}`}>
              {label}
            </NavLink>
          ))}

          <Link to="/contact" onClick={closeMenu} className="rounded-full bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white">
            Discuss a project
          </Link>
        </nav>
      )}
    </div>
  )
}
