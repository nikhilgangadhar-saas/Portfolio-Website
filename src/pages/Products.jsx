import { useRef, useState } from 'react'
import ApplicationLogo from '../components/ui/ApplicationLogo'
import { applications } from '../data/applications'
import AssetLogo from '../components/ui/AssetLogo'
import Button from '../components/ui/Button'

const assetLibraries = [
  {
    id: 'sop-control',
    title: 'Documents & Templates',
    description: 'Targeted SOPs, audit plans, checklists, and approval templates for warehouse operations and internal controls.',
    action: 'View document assets',
    logos: ['word.png', 'pdf.png'],
  },
  {
    id: 'excel-tools',
    title: 'Excel Tools',
    description: 'Practical Excel workbooks for stock counts and reconciliation, inventory ageing, and tracking audit actions.',
    action: 'View Excel tools',
    logos: ['excel.png'],
  },
]

const technologies = [
  { name: 'Azure', image: 'Azure.png' },
  { name: 'SQL', image: 'sql.png' },
  { name: 'ADF', image: 'adf.png' },
  { name: 'Power BI', image: 'pbi.png' },
]

export default function Products() {
  const announcement = useRef(null)
  const [selectedApp, setSelectedApp] = useState('')

  return (
    <>
      <section className="bg-slate-950 px-5 py-12 text-white sm:px-8 lg:py-16">
        <div className="mx-auto max-w-[100rem]">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Products &amp; Solutions</h1>
          <p className="mt-4 max-w-2xl text-lg leading-7 text-slate-300">Browse ready-to-use business tools, or work with us on reporting and software for your team.</p>
        </div>
      </section>

      <section aria-label="Products and solutions" className="bg-slate-100 bg-linear-to-b from-slate-200/60 to-slate-50 px-5 py-8 text-slate-950 sm:px-8 lg:py-12">
        <div className="mx-auto grid max-w-[100rem] gap-4 md:grid-cols-3">
          {assetLibraries.map(({ id, title, description, action, logos }) => (
            <article key={id} className="flex flex-col rounded-2xl border border-slate-200 border-t-4 border-t-slate-900 bg-white p-5 shadow-sm xl:p-6">
              <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
              <p className="mb-6 mt-3 flex-1 leading-7 text-slate-700">{description}</p>
              <div className="mb-5 flex items-center justify-start gap-3">
                {logos.map((logo) => (
                  <AssetLogo key={logo} file={logo} className="size-10 object-contain" />
                ))}
              </div>
              <div className="flex justify-center">
                <Button to={`/products/${id}`} variant="dark">{action}</Button>
              </div>
            </article>
          ))}

          <article id="data-reporting-services" className="flex scroll-mt-24 flex-col rounded-2xl border border-slate-200 border-t-4 border-t-slate-900 bg-white shadow-sm p-5 xl:p-6">
            <h2 className="text-2xl font-bold tracking-tight">Data &amp; Reporting Services</h2>
            <p className="mt-3 flex-1 leading-7 text-slate-700">Work with us to connect your ERP and business data, build reliable pipelines, and give teams the reports they need through dashboards or automated alerts.</p>
            <ul aria-label="Reporting technologies" className="my-6 grid grid-cols-4 gap-2">
              {technologies.map(({ name, image }) => (
                <li key={name} className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-center">
                  <AssetLogo file={image} className="h-10 w-full object-contain" />
                  <span className="text-xs font-semibold text-slate-700">{name}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap justify-center gap-3">
              <Button to="/contact" variant="dark">Discuss a Project</Button>
              <Button to="/case-studies" variant="secondary">View Case Studies</Button>
            </div>
          </article>

          <article id="business-applications" className="flex scroll-mt-24 flex-col rounded-2xl bg-slate-900 p-6 text-white sm:p-8 md:col-span-3">
            <h2 className="text-2xl font-bold tracking-tight">Business Applications</h2>
            <p className="mt-3 flex-1 leading-7 text-slate-300">Explore software for people operations, audit and control, and business intelligence. We can help scope and implement a solution for your workflow.</p>
            <div className="my-5 grid gap-3 md:grid-cols-3">
              {applications.map((application) => {
                const { name, description, href } = application
                const Logo = href ? 'a' : 'button'
                return (
                  <div key={name} className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                    <ApplicationLogo
                      as={Logo}
                      application={application}
                      {...(href ? { href } : {
                        type: 'button',
                        'aria-haspopup': 'dialog',
                        onClick: () => {
                          setSelectedApp(name)
                          announcement.current.showModal()
                        },
                      })}
                      aria-label={name}
                      className="size-[128px] gap-1 rounded-xl text-3xl transition hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-2"
                      suffixClassName="text-sm"
                    />
                    <div>
                      <p className="text-sm font-semibold">{name}</p>
                      <p className="mt-0.5 text-sm leading-5 text-slate-300">{description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-center">
              <Button to="/contact" variant="light">Discuss a Project</Button>
            </div>
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
