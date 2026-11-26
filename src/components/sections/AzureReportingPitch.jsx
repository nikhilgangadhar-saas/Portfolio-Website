import { Link } from 'react-router-dom'
import AssetLogo from '../ui/AssetLogo'
import Button from '../ui/Button'
import { AzureArchitecture, AzureProjectPlan } from './AzureProjectVisuals'
import './azure-reporting-pitch.css'

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

const technologies = [
  ['Azure', 'Azure.png'],
  ['Azure Data Factory', 'adf.png'],
  ['Azure SQL', 'sql.png'],
  ['Power BI', 'pbi.png'],
]

const implementation = [
  ['Connect and extract', 'Inventory the available databases, APIs, and files. Agree what history to load, how to identify changes, and how often each source needs to refresh.'],
  ['Engineer and validate the data', 'Stage incoming records, standardize dates and identifiers, and join records across systems. Publish curated tables and views in Azure and reconcile key totals against the source systems.'],
  ['Run and monitor the workflow', 'Schedule extraction, transformation, validation, and publishing in sequence. Set up failure and stale-data alerts, document reruns, and agree who owns incidents and changes after handover.'],
  ['Serve data where teams work', 'Connect Power BI or Tableau to the reporting database, serve websites and internal apps through views or APIs, and send selected updates through email or WhatsApp. Test access and delivery before release.'],
]

const outcomes = [
  ['Finance', 'Reconcile balances across systems and trace a report figure back to its transactions.'],
  ['Operations', 'Review stock, orders, or exceptions from a scheduled refresh and receive alerts in the channels teams already use.'],
  ['Management', 'Use shared KPI definitions across dashboards and recurring reports.'],
]

const deliveryResponsibilities = [
  ['What we handle', 'Remote discovery and design, pipeline and reporting development, testing, deployment, documentation, and handover. With an AMC, we also handle the monitoring and maintenance agreed for the supported components.'],
  ['What you provide', 'A project sponsor and business contacts, approved remote access and sample data, source-system documentation, cloud subscriptions and licenses, and owners to validate results and approve releases.'],
]

const userDeliverables = [
  ['Power BI reports', 'pbi.png', 'Open a dashboard, filter it by period or business unit, and drill into sales, stock, or finance detail. We can also connect the reporting database to Tableau.'],
  ['WhatsApp integration', 'WhatsApp.png', 'Receive scheduled summaries and exception alerts, such as an overdue order or a failed data refresh, through WhatsApp.'],
  ['Custom websites and portals', 'WebReports.png', 'Sign in to a web portal to search records, review operational reports, and access detail based on your role.'],
  ['Scheduled email reports', 'Outlook.png', 'Get a daily or weekly summary in your inbox and follow a link to investigate the figures in more detail.'],
]

const focusedEngagements = [
  ['Pipeline Health Check & Recovery', 'Refreshes fail, reports go stale, or nobody knows how to rerun a load.', 'A review of pipeline runs, data checks, and dependencies, followed by a prioritized recovery plan.'],
  ['Financial Reporting & Reconciliation', 'Finance spends too much time reconciling Excel reports to the ERP.', 'Agreed account mappings, reconciled reporting views, and drill-down from statement lines to journal entries.'],
  ['Automated Reports & Exception Alerts', 'Teams manually send daily reports or discover issues too late.', 'Scheduled delivery by email or WhatsApp, with alerts for agreed exceptions such as stale data, low stock, or overdue orders.'],
  ['Azure Cost & Performance Review', 'SQL reports are slow or cloud costs are rising.', 'A review of query performance, refresh schedules, and Azure resource usage, with prioritized fixes.'],
]

const supportLevels = [
  ['Normal', 'Questions about reports, usage, or issues with a workaround', 'Within 48 hours'],
  ['System-critical', 'Production outage or failed data delivery blocking a critical business process', 'Within 2 hours'],
]

const changeSteps = ['Log the request', 'Assess scope, cost, and schedule', 'Get client approval', 'Build, validate, and release']

const sectionLinks = [
  ['challenge', 'Challenge'],
  ['approach', 'Project approach'],
  ['architecture', 'Architecture'],
  ['implementation', 'Implementation'],
  ['outcomes', 'Outcomes'],
  ['user-deliverables', 'Reports & integrations'],
  ['engagements', 'Service options'],
  ['delivery', 'Delivery & support'],
]

const sectionClass = 'scroll-mt-24 border-b border-slate-200 px-5 py-10 sm:px-8 sm:py-14'
const contentClass = 'mx-auto max-w-6xl'
const headingClass = 'text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl'

export default function AzureReportingPitch() {
  return (
    <article className="azure-service bg-white text-slate-950">
      <header className="azure-service-hero bg-slate-950 bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 px-5 py-10 text-white sm:px-8 sm:py-16">
        <div className={`${contentClass} relative grid items-center gap-10 lg:grid-cols-[1fr_19rem]`}>
          <div className="azure-pitch-intro">
            <Link to="/services" className="inline-block text-sm font-semibold text-blue-300 hover:text-blue-200">← Back to Services</Link>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">Azure Data &amp; ERP Reporting</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">Bring data from ERP systems, spreadsheets, and business apps into Azure. We build and operate pipelines that turn source data into reports, dashboards, application data, and scheduled updates.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/case-studies/sap-b1-to-azure-data-warehouse" variant="light">Read the case study</Button>
              <Button to="/contact" variant="glass">Discuss a similar project</Button>
            </div>
          </div>
          <ul aria-label="Example Azure and reporting tools" className="azure-service-tools grid grid-cols-2 gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
            {technologies.map(([name, file]) => (
              <li key={name} className="flex flex-col items-center gap-2 rounded-xl bg-slate-950/65 p-3 text-center text-xs font-semibold text-white">
                <span className="grid size-10 place-items-center rounded-lg bg-white p-1.5">
                  <AssetLogo file={file} className="max-h-full w-full object-contain" />
                </span>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <nav aria-label="On this page" className="azure-service-nav border-b border-slate-200 px-5 py-3 sm:px-8">
        <ul className={`${contentClass} flex flex-wrap gap-x-2 gap-y-1`}>
          {sectionLinks.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="block rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-100 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-blue-700">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="challenge" className={sectionClass}>
        <div className={`${contentClass} grid gap-4 md:grid-cols-[1fr_2fr]`}>
          <h2 className={headingClass}>The challenge</h2>
          <p className="max-w-3xl leading-7 text-slate-700">The data already exists, but the people who need it can wait days for an extract or spend hours preparing one. The source may be an on-premises database, access may be limited to a few specialists, or regulatory rules may restrict where data can be stored or shared. We can connect sources such as Microsoft Dynamics, SAP, Excel, Zoho, and Odoo, along with other databases, APIs, and files.</p>
        </div>
      </section>

      <section id="approach" className={`${sectionClass} bg-slate-50`}>
        <div className={contentClass}>
          <h2 className={headingClass}>How we’d approach your project</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {stakeholders.map(([title, description]) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-7 text-slate-700">{description}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-8 text-xl font-bold">Agree the project charter</h3>
          <p className="mt-2 max-w-3xl leading-7 text-slate-700">We interview the people who use and own the data, review sample reports and source records, and map the current workflow. We turn those findings into a charter with milestones, owners, and acceptance criteria.</p>
          <dl className="mt-4 grid gap-x-8 gap-y-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2 lg:grid-cols-3">
            {charter.map(([title, description]) => (
              <div key={title} className="border-l-2 border-blue-700/40 pl-3">
                <dt className="font-semibold">{title}</dt>
                <dd className="mt-1 leading-7 text-slate-700">{description}</dd>
              </div>
            ))}
          </dl>
          <AzureProjectPlan />
        </div>
      </section>

      <section id="architecture" className="azure-service-architecture scroll-mt-24 bg-slate-900 px-5 py-10 text-white sm:px-8 sm:py-14">
        <div className={contentClass}>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">How the platform fits together</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">An extraction pipeline brings source data into Azure. A curated reporting layer gives dashboards, apps, and scheduled workflows shared business definitions.</p>
          <AzureArchitecture />
        </div>
      </section>

      <section id="implementation" className={sectionClass}>
        <div className={contentClass}>
          <h2 className={headingClass}>How we build and run it</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">Once the charter is approved, we build the first release around the agreed sources, refresh schedule, and delivery channels.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {implementation.map(([title, description]) => (
              <div key={title} className="azure-service-step rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-7 text-slate-700">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="outcomes" className={`${sectionClass} bg-slate-50`}>
        <div className={contentClass}>
          <h2 className={headingClass}>What teams can do</h2>
          <dl className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5">
            {outcomes.map(([requirement, result]) => (
              <div key={requirement} className="grid gap-1 py-4 sm:grid-cols-[1fr_2fr] sm:gap-6">
                <dt className="font-semibold">{requirement}</dt>
                <dd className="leading-7 text-slate-700">{result}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="user-deliverables" className={sectionClass}>
        <div className={contentClass}>
          <h2 className={headingClass}>Reports and integrations your teams use</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {userDeliverables.map(([title, logo, description]) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white p-2">
                  <AssetLogo file={logo} className="max-h-full w-full object-contain" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-2 leading-7 text-slate-700">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="engagements" className={`${sectionClass} bg-slate-50`}>
        <div className={contentClass}>
          <h2 id="engagements-heading" className={headingClass}>Focused Azure data services</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">Book an off-site engagement for a specific reporting, pipeline, or Azure performance issue.</p>
          <div role="region" aria-labelledby="engagements-heading" tabIndex={0} className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
            <table aria-labelledby="engagements-heading" className="w-full min-w-[42rem] table-fixed border-collapse text-left text-sm leading-6">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th scope="col" className="w-1/4 px-4 py-3 sm:px-5">Service</th>
                  <th scope="col" className="w-1/3 px-4 py-3 sm:px-5">When you need it</th>
                  <th scope="col" className="px-4 py-3 sm:px-5">What you get</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {focusedEngagements.map(([title, need, deliverable]) => (
                  <tr key={title} className="align-top even:bg-slate-50">
                    <th scope="row" className="px-4 py-4 font-semibold text-blue-950 sm:px-5">{title}</th>
                    <td className="px-4 py-4 text-slate-700 sm:px-5">{need}</td>
                    <td className="px-4 py-4 text-slate-700 sm:px-5">{deliverable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="delivery" className={sectionClass}>
        <div className={contentClass}>
          <h2 className={headingClass}>Delivery, maintenance, and support</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">All work is off-site, including discovery, implementation, training, and support. Use the eight-week plan above as a starting estimate for a first release. We confirm dates after reviewing source access, data quality, the number of integrations, and who signs off.</p>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {deliveryResponsibilities.map(([title, description]) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <dt className="text-lg font-bold">{title}</dt>
                <dd className="mt-2 leading-7 text-slate-700">{description}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-8 text-xl font-bold">Annual maintenance contract (AMC)</h3>
          <p className="mt-2 max-w-3xl leading-7 text-slate-700">An AMC can cover pipeline monitoring, failed refresh investigation and reruns, defect fixes, and periodic health reviews. At handover we agree which components are covered, who receives alerts, and how to reach support.</p>
          <div className="azure-service-support mt-4 grid gap-3 sm:grid-cols-2" role="group" aria-label="Email support response targets">
            {supportLevels.map(([level, description, response]) => (
              <div key={level} className="rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6">
                <h4 className="font-semibold text-blue-950">{level}</h4>
                <p className="mt-1 text-2xl font-bold text-blue-950">{response}</p>
                <p className="mt-2 leading-7 text-slate-700">{description}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">Email the agreed support address with the affected system, business impact, and when the issue started. Mark a production-blocking issue as system-critical for priority escalation. The targets above cover the initial response. We confirm ownership, next steps, and the update schedule in that response.</p>

          <h3 className="mt-8 text-xl font-bold">Customization and change requests</h3>
          <p className="mt-2 max-w-3xl leading-7 text-slate-700">We can tailor source mappings, KPIs, reports, access roles, and delivery workflows. For changes after scope approval, we follow the steps below. The client validates the change against agreed acceptance criteria before release.</p>
          <ol aria-label="Change request workflow" className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {changeSteps.map((step, index) => (
              <li key={step} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 font-semibold">
                <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-950">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 sm:py-14">
        <div className={`${contentClass} azure-service-cta rounded-3xl bg-slate-950 p-6 text-white sm:p-10`}>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Start with one reporting problem</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">Tell us which reports are hard to produce, who needs them, and which systems you use. You can start with a description of the problem and keep your data and credentials private. We’ll help you identify a first release and explain what access, effort, and budget it would take.</p>
          <Button to="/contact" variant="light" className="mt-5">Discuss a similar project</Button>
        </div>
      </section>
    </article>
  )
}
