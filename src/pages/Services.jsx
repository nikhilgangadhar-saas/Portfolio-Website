import ApplicationLogo from '../components/ui/ApplicationLogo'
import { applications } from '../data/applications'
import AssetLogo from '../components/ui/AssetLogo'
import Button from '../components/ui/Button'
import { services } from '../data/homepageOfferings'

const serviceLogos = {
  'business-analysis-strategy': { files: ['strategy.png', 'ppt.png', 'excel.png'] },
  'operations-sops-audit': { files: ['word.png', 'pdf.png', 'WhatsApp.png'], apps: ['internal-audit'] },
  'azure-data-erp-reporting': { files: ['Azure.png', 'sql.png', 'adf.png', 'pbi.png', 'WhatsApp.png', 'Database.png'] },
  'custom-business-applications': { files: ['business-apps.png', 'Python.png', 'JavaScript.png', 'Azure.png', 'Git.png'], apps: applications.map(({ id }) => id) },
  'enterprise-ai-agents': { files: ['ai-agents.png', 'Microsoft.png', 'SAP.png', 'WhatsApp.png', 'Outlook.png'] },
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
                <div aria-hidden="true" className="mt-4 flex flex-wrap items-center gap-3 empty:hidden">
                  {applications.filter((app) => serviceLogos[id].apps?.includes(app.id)).map((app) => (
                    <ApplicationLogo key={app.id} application={app} className="size-10 rounded-lg text-sm" suffixClassName="text-[8px]" />
                  ))}
                  {serviceLogos[id].files.map((file) => (
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
