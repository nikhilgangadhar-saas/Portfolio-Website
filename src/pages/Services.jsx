import Button from '../components/ui/Button'
import ServiceLogos from '../components/ui/ServiceLogos'
import { services } from '../data/homepageOfferings'

export default function Services() {
  return (
    <>
      <section className="bg-slate-950 px-5 py-12 text-white sm:px-8 lg:py-16">
        <div className="mx-auto max-w-[100rem]">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Services</h1>
          <p className="mt-4 max-w-2xl text-lg leading-7 text-slate-300">
            We help teams plan growth, improve operations, and build the reporting and software they need to run the business.
          </p>
        </div>
      </section>

      <section aria-label="Our services" className="bg-slate-100 bg-linear-to-b from-slate-200/60 to-slate-50 px-5 py-8 text-slate-950 sm:px-8 lg:py-12">
        <div className="mx-auto grid max-w-[100rem] gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {services.map(({ id, title, description, focus, href, logos }, index) => (
            <article key={id} className={`row-span-4 grid grid-rows-subgrid gap-y-0 rounded-2xl border border-slate-200 border-t-4 border-t-slate-900 bg-white shadow-sm ${index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
              <div className="px-5 pt-5 xl:px-6 xl:pt-6">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <p className="mt-3 leading-7 text-slate-700">{description}</p>
              </div>
              <p className="self-end px-5 pt-4 text-sm font-semibold text-slate-800 xl:px-6">{focus}</p>
              <ServiceLogos logos={logos} className="px-5 pt-4 pb-5 xl:px-6 xl:pb-6" />
              <div className="flex justify-center border-t border-slate-200 px-5 py-4">
                <Button to={href} variant="dark">View service</Button>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-6 flex max-w-[100rem] flex-wrap justify-center gap-3">
          <Button to="/case-studies" variant="secondary">View case studies</Button>
          <Button to="/contact" variant="dark">Discuss a project</Button>
        </div>
      </section>
    </>
  )
}
