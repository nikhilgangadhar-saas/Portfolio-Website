import { Link } from 'react-router-dom'
import { navLinks } from '../../data/navLinks'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-white">
      <div className="absolute inset-0 bg-premium-grid opacity-50" />
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative w-full px-5 sm:px-8 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-col items-center justify-center rounded-xl border border-blue-900/70 bg-[#041527] shadow-lg shadow-blue-950/30">
  <div className="font-[Georgia] text-[13px] font-bold leading-none text-white">
    NG
  </div>
  <div className="mt-0.5 font-[Georgia] text-[7px] font-semibold leading-none tracking-[0.04em] text-slate-300">
    &amp;Co.
  </div>
</div>

<div>
  <div className="font-[Georgia] text-lg font-semibold tracking-tight text-white">
    NG Advisory Co.
  </div>
  <div className="text-xs text-slate-400">
    Business Control · Data Products · Practical Systems
  </div>
</div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Practical advisory, SOPs, data products, workflow tools, and lightweight business applications for growing companies.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white">Explore</h4>
            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">
  {navLinks.map((link) => (
    <Link
      key={link.path}
      to={link.path}
      className="text-sm text-slate-400 transition hover:text-blue-300"
    >
      {link.label}
    </Link>
  ))}
</div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white">Start here</h4>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Explore templates, request advisory support, or discuss a small
              business system you want to build.
            </p>

            <Link
              to="/contact"
              className="mt-5 inline-block rounded-full bg-blue-500 px-5 sm:px-8 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-400"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-4 text-xs text-slate-500">
          © {new Date().getFullYear()} NG Advisory Co. All rights reserved.
        </div>
      </div>
    </footer>
  )
}