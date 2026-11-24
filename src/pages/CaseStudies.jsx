import Button from '../components/ui/Button'
import { serviceCaseStudies } from '../data/caseStudies'

export default function CaseStudies() {
  return (
    <>
      <section className="bg-slate-950 px-5 py-12 text-white sm:px-8 lg:py-16">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Case studies</h1>
        <p className="mt-4 max-w-2xl text-lg leading-7 text-slate-300">
          See what we found, how we planned the work, and what each project enabled.
        </p>
      </section>

      <section aria-label="Projects by service" className="bg-slate-100 px-5 py-8 sm:px-8 lg:py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCaseStudies.map(({ id, title, description, focus, status, href, actionLabel }) => (
            <article key={id} className="flex flex-col rounded-2xl border border-slate-200 border-t-4 border-t-slate-900 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-blue-800">{focus}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
              <p className="mt-3 flex-1 leading-7 text-slate-700">{description}</p>
              {status && <p className="mt-4 text-sm font-medium text-slate-600">{status}</p>}
              <div className="mt-5">
                <Button to={href} variant={status ? 'secondary' : 'dark'}>{actionLabel}</Button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/services" variant="secondary">View all services</Button>
          <Button to="/contact" variant="dark">Discuss a project</Button>
        </div>
      </section>
    </>
  )
}
