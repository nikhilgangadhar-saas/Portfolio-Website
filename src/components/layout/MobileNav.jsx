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
        className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

      {isOpen && (
        <nav aria-label="Main navigation" className="absolute inset-x-3 top-full mt-2 flex max-h-[calc(100dvh-6rem)] flex-col gap-1 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
          {headerLinks.map(({ label, menu, path }) => menu ? (
            <div key={menu}>
              <button
                type="button"
                aria-expanded={openSection === menu}
                onClick={() => setOpenSection(openSection === menu ? null : menu)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-semibold text-slate-950 hover:bg-slate-100"
              >
                {label}
                <span aria-hidden="true">{openSection === menu ? '−' : '+'}</span>
              </button>
              {openSection === menu && (
                <div className="mx-3 mb-2 grid gap-1 rounded-xl bg-slate-100 p-1">
                  {homepageMenus[menu].map((item) => (
                    <Link key={item.id} to={`/#${item.id}`} onClick={closeMenu} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-white">
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink key={path} to={path} onClick={closeMenu} className={({ isActive }) => `rounded-xl px-4 py-3 font-semibold ${isActive ? 'bg-slate-100 text-slate-950' : 'text-slate-700 hover:bg-slate-100'}`}>
              {label}
            </NavLink>
          ))}

          <Link to="/contact" onClick={closeMenu} className="mt-1 rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white">
            Discuss a project
          </Link>
        </nav>
      )}
    </div>
  )
}
