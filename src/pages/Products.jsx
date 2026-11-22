import { useRef, useState } from 'react'
import Button from '../components/ui/Button'

const assetLibraries = [
  {
    id: 'sop-control',
    title: 'Documents & Templates',
    description: 'Targeted SOPs, audit plans, checklists, and approval templates for warehouse operations and internal controls.',
    action: 'View document assets',
  },
  {
    id: 'excel-tools',
    title: 'Excel Tools',
    description: 'Practical Excel workbooks for stock counts and reconciliation, inventory ageing, and tracking audit actions.',
    action: 'View Excel tools',
  },
]

const applications = [
  { name: 'People Review', tone: 'bg-linear-to-br from-sky-500 to-blue-950' },
  { name: 'IA&C', tone: 'bg-linear-to-br from-slate-950 via-blue-950 to-red-900' },
  { name: 'Sequence BI', tone: 'bg-black font-mono text-green-400' },
]

export default function Products() {
  const announcement = useRef(null)
  const [selectedApp, setSelectedApp] = useState('')

  return (
    <>
      <section className="bg-slate-950 px-5 py-12 text-white sm:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Products &amp; Solutions</h1>
          <p className="mt-4 max-w-2xl text-lg leading-7 text-slate-300">Browse ready-to-use business tools, or work with us on reporting and software for your team.</p>
        </div>
      </section>

      <section aria-label="Products and solutions" className="bg-slate-100 px-5 py-8 text-slate-950 sm:px-8 lg:py-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          {assetLibraries.map(({ id, title, description, action }) => (
            <article key={id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
              <p className="mb-6 mt-3 flex-1 leading-7 text-slate-700">{description}</p>
              <div><Button to={`/products/${id}`} variant="dark">{action}</Button></div>
            </article>
          ))}

          <article id="data-reporting-services" className="flex scroll-mt-24 flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight">Data &amp; Reporting Services</h2>
            <p className="mt-3 flex-1 leading-7 text-slate-700">Work with us to connect your ERP and business data, build reliable pipelines, and give teams the reports they need through dashboards or automated alerts.</p>
            <ul aria-label="Reporting technologies" className="my-6 flex flex-wrap gap-2">
              {['Azure', 'Power BI', 'Azure Data Factory', 'Azure SQL'].map((technology) => (
                <li key={technology} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">{technology}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button to="/contact" variant="dark">Discuss a Project</Button>
              <Button to="/case-studies" variant="secondary">View Case Studies</Button>
            </div>
          </article>

          <article id="business-applications" className="flex scroll-mt-24 flex-col rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight">Business Applications</h2>
            <p className="mt-3 flex-1 leading-7 text-slate-300">Explore software for people operations, audit and control, and business intelligence. We can help scope and implement a solution for your workflow.</p>
            <div className="my-6 grid grid-cols-3 gap-2 sm:gap-3">
              {applications.map(({ name, tone, href }) => {
                const Logo = href ? 'a' : 'button'
                return (
                  <Logo
                    key={name}
                    {...(href ? { href } : {
                      type: 'button',
                      'aria-haspopup': 'dialog',
                      onClick: () => {
                        setSelectedApp(name)
                        announcement.current.showModal()
                      },
                    })}
                    className={`flex min-h-20 min-w-0 flex-col items-center justify-center rounded-xl border border-white/20 px-2 py-2 text-center text-sm transition hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 ${tone}`}
                  >
                    <span aria-hidden="true" className="flex flex-col font-serif text-base font-bold leading-none">NG<span className="mt-0.5 text-xs">&amp;Co.</span></span>
                    <span className="mt-1 font-semibold">{name}</span>
                  </Logo>
                )
              })}
            </div>
            <div><Button to="/contact" variant="light">Discuss a Project</Button></div>
          </article>
        </div>
      </section>

      <dialog ref={announcement} aria-labelledby="app-announcement-title" onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }} className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-white text-slate-950 shadow-2xl backdrop:bg-slate-950/65">
        <div className="p-6">
          <h2 id="app-announcement-title" className="text-2xl font-bold">{selectedApp}</h2>
          <p className="mt-2 text-slate-700">Product site coming soon.</p>
          <form method="dialog" className="mt-5">
            <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100">Close</button>
          </form>
        </div>
      </dialog>
    </>
  )
}
