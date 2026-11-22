import { Link } from 'react-router-dom'
import Button from '../ui/Button'

const stakeholders = [
  ['Operations', 'Which decisions and daily tasks need better data? We agree on the figures, the level of detail, and where teams want to receive them, whether that’s Power BI, Excel, or email.'],
  ['Technology', 'Which systems and data are available? We review data quality, history, access, hosting, and any restrictions on moving or sharing data.'],
  ['Management', 'Which outcomes matter most? We confirm the budget, target dates, and trade-offs leadership is willing to make for the first release.'],
]

const charter = [
  ['Requirements', 'Capture use cases, agree KPI definitions and acceptance criteria, and record exclusions.'],
  ['Deliverables and milestones', 'Define the first release, what each milestone delivers, and who signs off.'],
  ['Stakeholders and RACI', 'Name who is responsible, accountable, consulted, and informed for each workstream.'],
  ['Governance committee', 'Set the review schedule and give the committee clear ownership of blockers, escalations, and scope decisions.'],
  ['Access requirements', 'Document source access, approved environments, and who can view or receive each report.'],
  ['Cost–benefit analysis', 'Compare build and running costs with expected time savings, reduced manual effort, and better access to information.'],
]

const architecture = [
  ['SAP Business One', 'Source transactions and master data'],
  ['Azure Data Factory', 'Scheduled extraction and loading'],
  ['Azure SQL', 'Curated warehouse and reporting views'],
  ['Reporting and delivery', 'Power BI, operational reports, and scheduled distribution'],
]

const implementation = [
  ['Model the data around the reports', 'We worked back from the decisions each report needed to support. For example, tracing a stock movement meant mapping the source documents and defining the item, warehouse, and batch detail the warehouse needed to retain.'],
  ['Build the warehouse and delivery layer', 'We used Azure SQL for staging, curated tables, and reporting views. SQL and application code served the reports. Where a workflow needed an API or scheduled delivery, we scoped it separately. Daily report distribution used Azure Logic Apps and email.'],
  ['Schedule and monitor the pipelines', 'We scheduled Azure Data Factory runs around reporting needs and used incremental loads where source changes could be identified. For an ongoing service, we also agree who owns failures, reruns, and alerts for stale data.'],
  ['Test and secure the release', 'We reconciled key report totals to SAP and checked representative transactions. We agree access by role, test what each audience can see, and hand over the checks and operating steps needed to support the release.'],
]

const outcomes = [
  ['Finance needed consistent balances and drill-downs', 'Published profit and loss and balance sheet reports with journal detail. Cash flow needed further classification and reconciliation before it could be treated as final.'],
  ['Operations needed to trace stock and purchase activity', 'Delivered inventory movements, stock snapshots, and procurement analysis. Each report used the source history available for its agreed scope.'],
  ['Management needed repeatable reporting', 'The Azure reporting layer supported sales and production reporting and reduced dependence on repeated SAP extracts. Scheduled delivery was used for selected daily reports.'],
]

const sectionClass = 'border-b border-slate-200 px-5 py-10 sm:px-8 sm:py-14'
const contentClass = 'mx-auto max-w-6xl'
const headingClass = 'text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl'

export default function AzureReportingPitch() {
  return (
    <article className="bg-white text-slate-950">
      <header className="bg-slate-950 px-5 py-10 text-white sm:px-8 sm:py-14">
        <div className={contentClass}>
          <Link to="/services" className="text-sm font-semibold text-slate-300 underline underline-offset-4 hover:text-white">All services</Link>
          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">Azure Data &amp; ERP Reporting</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">Give teams reliable access to the ERP data they need. See how we’d scope your project and what we built for a manufacturing and distribution business using SAP Business One.</p>
          <Button to="/contact" variant="light" className="mt-6">Discuss a similar project</Button>
        </div>
      </header>

      <section className={sectionClass}>
        <div className={contentClass}>
          <h2 className={headingClass}>The challenge</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-700">The data already exists, but the people who need it can wait days for an extract or spend hours preparing one. The source may be an on-premises database, access may be limited to a few specialists, or regulatory rules may restrict where data can be stored or shared. In this project, management reporting depended on SAP exports, Excel files, and repeated preparation.</p>
        </div>
      </section>

      <section className={`${sectionClass} bg-slate-50`}>
        <div className={contentClass}>
          <h2 className={headingClass}>How we’d approach your project</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {stakeholders.map(([title, description]) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-7 text-slate-700">{description}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-8 text-xl font-bold">Agree the project charter</h3>
          <p className="mt-2 max-w-3xl leading-7 text-slate-700">We turn discovery into a charter that teams can review and approve before implementation.</p>
          <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {charter.map(([title, description]) => (
              <div key={title} className="border-t border-slate-200 pt-3">
                <dt className="font-semibold">{title}</dt>
                <dd className="mt-1 leading-7 text-slate-700">{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-slate-900 px-5 py-10 text-white sm:px-8 sm:py-14">
        <div className={contentClass}>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">How the platform fits together</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">In the SAP Business One project, the warehouse gave reporting and delivery tools a curated source they could share.</p>
          <ol className="mt-5 grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {architecture.map(([title, description], index) => (
              <li key={title} className="rounded-xl border border-white/20 bg-white/5 p-4">
                <h3 className="font-semibold"><span aria-hidden="true" className="mr-2 text-slate-300">{index + 1}.</span>{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-300">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={contentClass}>
          <h2 className={headingClass}>What we built</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">Once your charter is approved, we turn the agreed requirements into a build plan. Here’s how that work takes shape, using the SAP Business One project as an example.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {implementation.map(([title, description]) => (
              <div key={title} className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-7 text-slate-700">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionClass} bg-slate-50`}>
        <div className={contentClass}>
          <h2 className={headingClass}>What teams could do</h2>
          <dl className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
            {outcomes.map(([requirement, result]) => (
              <div key={requirement} className="grid gap-1 py-4 sm:grid-cols-[1fr_2fr] sm:gap-6">
                <dt className="font-semibold">{requirement}</dt>
                <dd className="leading-7 text-slate-700">{result}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 sm:py-14">
        <div className={`${contentClass} rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8`}>
          <h2 className={headingClass}>Start with one reporting problem</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">Tell us which reports are hard to produce, who needs them, and which systems you use. You can start with a description of the problem and keep your data and credentials private. We’ll help you identify a first release and explain what access, effort, and budget it would take.</p>
          <Button to="/contact" variant="dark" className="mt-5">Discuss a similar project</Button>
        </div>
      </section>
    </article>
  )
}
