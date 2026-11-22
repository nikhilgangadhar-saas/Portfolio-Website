import { useLocation } from 'react-router-dom'
import { offerings } from '../../data/homepageOfferings'
import { useEffect, useRef, useState } from 'react'
import Button from '../ui/Button'

export default function ProductCategories() {
  const dialog = useRef(null)
  const [offering, setOffering] = useState(null)

  const location = useLocation()

  useEffect(() => {
    const item = offerings.find(({ id }) => location.hash === `#${id}`)
    if (item) setOffering(item)
  }, [location])

  useEffect(() => {
    if (offering && !dialog.current.open) dialog.current.showModal()
  }, [offering])

  return (
    <section aria-labelledby="home-offerings-title" className="bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-[100rem] px-5 py-10 sm:px-8 lg:py-12">
        <h2 id="home-offerings-title" className="text-3xl font-extrabold tracking-tight md:text-5xl">Products &amp; Solutions</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map((item) => (
            <article id={item.id} key={item.id} className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 text-center transition-colors hover:border-slate-400 hover:bg-slate-800 focus-within:ring-2 focus-within:ring-slate-300">
              <header className="flex min-h-20 items-center justify-center px-5 pt-5">
                <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
              </header>
              <p className="flex-1 px-5 pb-5 pt-3 text-base leading-6 text-slate-300">{item.description}</p>
              <footer className="mx-5 border-t border-white/15 py-4 text-sm font-semibold text-slate-100">
                Explore offering
              </footer>
              <button
                type="button"
                aria-label={`Explore ${item.title}`}
                aria-haspopup="dialog"
                className="absolute inset-0 cursor-pointer"
                onClick={() => setOffering(item)}
              />
            </article>
          ))}
        </div>

        <dialog
          ref={dialog}
          aria-labelledby="offering-dialog-title"
          onClose={() => setOffering(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) event.currentTarget.close()
          }}
          className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-lg overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-2xl backdrop:bg-slate-950/65 backdrop:backdrop-blur-sm"
        >
          {offering && (
            <div>
              <header className="bg-slate-900 p-5 text-center text-white sm:p-6">
                <h2 id="offering-dialog-title" className="text-2xl font-semibold tracking-tight">{offering.title}</h2>
              </header>
              <div className="space-y-4 p-5 text-base leading-7 text-slate-700 sm:p-6">
                <p>{offering.description}</p>
                <p>You can request {new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(offering.examples)}.</p>
                <div>
                  <h3 className="font-semibold text-slate-950">How to enquire</h3>
                  <p className="mt-1">{offering.enquiry}</p>
                </div>
              </div>
              <footer className="border-t border-slate-200 bg-slate-50 p-5 text-center">
                <Button to="/contact" variant="dark" className="focus-visible:outline-2 focus-visible:outline-offset-2">Ask about an offering</Button>
              </footer>
            </div>
          )}
        </dialog>
      </div>
    </section>
  )
}
