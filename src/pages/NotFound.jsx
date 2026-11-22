import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-260px)] items-center overflow-hidden bg-[#f4f7fb]">
      <div className="absolute inset-0 bg-soft-grid opacity-70" />
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl" />
      <div className="absolute right-0 bottom-20 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-20">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/5 md:p-12">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-slate-950 text-xl font-black text-white">
            404
          </div>

          <div className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Page Not Found
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            This page does not exist.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
            The page may have moved, the link may be old, or the URL may have
            been typed incorrectly.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/">Back to Home</Button>
            <Button to="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <div className="text-sm font-semibold text-slate-500">
              Useful links
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm font-semibold">
              <Link to="/products" className="text-blue-600 hover:text-blue-700">
                Products
              </Link>
              <Link to="/services" className="text-blue-600 hover:text-blue-700">
                Services
              </Link>
              <Link to="/case-studies" className="text-blue-600 hover:text-blue-700">
                Case Studies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}