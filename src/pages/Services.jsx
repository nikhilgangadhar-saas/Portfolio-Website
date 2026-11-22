import AssetLogo from '../components/ui/AssetLogo'
import Button from '../components/ui/Button'
import { services } from '../data/homepageOfferings'

const serviceLogos = {
  'business-analysis-strategy': ['strategy.png'],
  'operations-sops-audit': ['word.png', 'pdf.png'],
  'azure-data-erp-reporting': ['Azure.png', 'sql.png', 'adf.png', 'pbi.png'],
  'custom-business-applications': ['business-apps.png'],
  'enterprise-ai-agents': ['ai-agents.png'],
}

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
          {services.map(({ id, title, description, focus, href }, index) => (
            <article key={id} className={`flex flex-col rounded-2xl border border-slate-200 border-t-4 border-t-slate-900 bg-white shadow-sm ${index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
              <div className="flex-1 p-5 xl:p-6">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <p className="mt-3 leading-7 text-slate-700">{description}</p>
                <p className="mt-4 text-sm font-semibold text-slate-800">{focus}</p>
                <div aria-hidden="true" className="mt-4 flex items-center gap-3 empty:hidden">
                  {serviceLogos[id].map((file) => (
                    <AssetLogo key={file} file={file} className="size-10 object-contain" />
                  ))}
                </div>
              </div>
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
