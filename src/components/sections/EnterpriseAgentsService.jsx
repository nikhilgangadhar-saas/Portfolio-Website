import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import OperationsSectionNav from './OperationsSectionNav'

const sections = [
  ['challenge', 'Challenge'],
  ['architecture', 'Data layer'],
  ['stack', 'Technical stack'],
  ['deliverables', 'Deliverables'],
  ['delivery', 'Project delivery'],
  ['costs', 'Hosting & costs'],
  ['roadmap', 'Planned chat entry'],
]

const layers = [
  ['Curate the ERP data', 'Agree which data sources, entities, and metric definitions the agent can use. Reconcile the figures against existing reports.'],
  ['Define approved queries', 'Set the permitted metrics, periods, and breakdowns. Validate requests and enforce access permissions before execution.'],
  ['Answer where teams work', 'Offer a dedicated web portal and supported WhatsApp queries. Ask for clarification when the question needs more detail.'],
  ['Build reports and dashboards', 'Use the validated data from a conversation to create tables, charts, or a dashboard in the portal.'],
]

const deliverables = [
  ['Governed reporting layer', 'A catalogue of approved queries, agreed metric definitions, and access rules for each role.'],
  ['Dedicated web portal', 'A place to ask follow-up questions, compare periods, and build reporting views from the conversation.'],
  ['WhatsApp integration', 'On-demand responses to supported questions through WhatsApp, with the access rules agreed for that channel.'],
  ['Validation and handover', 'Reference reports, example questions and expected results, permission test cases, and documentation for operational owners.'],
]

const responsibilities = [
  ['We handle', 'Map business questions to ERP data, implement approved queries and the portal, test permissions and outputs, and document the release.'],
  ['You provide', 'A sponsor, business and ERP owners, approved access to reporting data, sample questions, and reference reports for reconciliation.'],
  ['We approve together', 'Agree the first-release scope, metric definitions, and access matrix. Validate representative questions, pilot with designated roles, and sign off before rollout.'],
]

const stack = [
  ['Data engineering', 'Map ERP sources, define refresh cadence and ownership, normalize keys and dimensions, and reconcile curated datasets to source reports.'],
  ['SQL reporting layer', 'Use approved SQL and metric definitions for date ranges, aggregations, rankings, and comparisons. Review query performance and source-to-report totals before rollout.'],
  ['MCP capability layer', 'Register each business query as a Model Context Protocol (MCP) capability with validated inputs and outputs. Check the authenticated user’s permissions before execution.'],
  ['Natural language and model selection', 'The NLP layer turns a question into a structured request for a metric, period, and breakdown. Choose a supported LLM for the deployment and test its accuracy, latency, and usage cost against sample questions.'],
  ['Web portal context', 'Keep the current analysis, date ranges, and results across turns. A filter change can run a new query, while a chart edit can reuse the active dataset.'],
  ['WhatsApp context', 'Associate supported follow-ups with the sender’s conversation and honor conversation resets. Agree which questions and responses are available on WhatsApp during scoping.'],
  ['Hosting and operations', 'Deploy a containerized application in the agreed environment. Plan for secure ERP connectivity, identity, secret management, logs, backups, and recovery ownership.'],
]

const costs = [
  ['Implementation', 'Discovery, ERP connectors, data engineering, SQL and MCP development, portal and WhatsApp setup, testing, training, and release.'],
  ['Infrastructure', 'Application hosting, database and storage, connectivity, logging, backups, and any required licenses.'],
  ['Usage', 'LLM requests and tokens, WhatsApp messaging charges where applicable, and consumption-based cloud services.'],
  ['Support and changes', 'Agreed ongoing support or maintenance coverage. New data sources, capabilities, or workflows are estimated through change control.'],
]

const sectionClass = 'scroll-mt-24 border-b border-slate-200 px-5 py-10 sm:px-8 sm:py-14'
const width = 'mx-auto max-w-6xl'
const heading = 'text-2xl font-bold tracking-tight sm:text-3xl'

export default function EnterpriseAgentsService() {
  return (
    <article className="azure-service bg-white text-slate-950">
      <header className="azure-service-hero px-5 text-white sm:px-8">
        <div className={width}>
          <Link to="/services" className="inline-block text-sm font-semibold text-blue-300 hover:text-blue-200">← Back to Services</Link>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">Enterprise AI Agents</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">Ask a business question and get a report on demand from a governed ERP data layer. Use a dedicated web portal or WhatsApp, then turn the conversation and its data into a dashboard in the portal.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/case-studies/sequence-bi-governed-erp-reporting" variant="light">Read the SequenceBI case study</Button>
            <Button to="/contact" variant="glass">Discuss a project</Button>
          </div>
        </div>
      </header>

      <OperationsSectionNav sections={sections} />

      <section id="challenge" className={sectionClass}>
        <div className={`${width} grid gap-4 md:grid-cols-[1fr_2fr]`}>
          <h2 className={heading}>The challenge</h2>
          <p className="leading-7 text-slate-700">Dashboards serve recurring reporting needs. When leadership asks for a new comparison or operations needs a more specific breakdown, teams can lose time looking across reports or waiting on an extract. A governed query layer gives them a way to ask for the figures directly, using the same definitions and permissions.</p>
        </div>
      </section>

      <section id="architecture" className={`${sectionClass} azure-service-architecture text-white`}>
        <div className={width}>
          <h2 className={heading}>How the governed data layer works</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {layers.map(([title, description]) => (
              <li key={title} className="rounded-xl border border-white/15 bg-slate-950 p-5">
                <h3 className="font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="stack" className={`${sectionClass} bg-slate-50`}>
        <div className={width}>
          <h2 className={heading}>Technical stack and responsibilities by layer</h2>
          <dl className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5">
            {stack.map(([title, description]) => (
              <div key={title} className="grid gap-1 py-4 sm:grid-cols-[1fr_2fr] sm:gap-6">
                <dt className="font-semibold text-blue-950">{title}</dt>
                <dd className="leading-7 text-slate-700">{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="deliverables" className={sectionClass}>
        <div className={width}>
          <h2 className={heading}>What you receive</h2>
          <dl className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5">
            {deliverables.map(([title, description]) => (
              <div key={title} className="grid gap-1 py-4 sm:grid-cols-[1fr_2fr] sm:gap-6">
                <dt className="font-semibold text-blue-950">{title}</dt>
                <dd className="leading-7 text-slate-700">{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="delivery" className={`${sectionClass} bg-slate-50`}>
        <div className={width}>
          <h2 className={heading}>Project delivery and ownership</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">Start with a defined set of questions and reporting owners. The project plan covers discovery, reconciliation, permissions, pilot testing, and release. New metrics or data sources go through the same review before they are added.</p>
          <dl className="mt-5 grid gap-4 md:grid-cols-3">
            {responsibilities.map(([title, description]) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-5">
                <dt className="font-bold">{title}</dt>
                <dd className="mt-2 leading-7 text-slate-700">{description}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold">Discovery calls and sign-off</h3>
              <p className="mt-2 leading-7 text-slate-700">Meet business owners to collect example questions and expected answers. Meet ERP, data, and IT owners to review schemas, refresh requirements, access, and hosting. Record decisions, milestones, and approvers in the project charter and RACI.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold">Change management and support</h3>
              <p className="mt-2 leading-7 text-slate-700">Log change requests and assess impact on access, data definitions, test coverage, cost, and schedule before approval. Agree a support channel, escalation owner, and coverage for query errors, failed refreshes, portal issues, and WhatsApp delivery.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="costs" className={sectionClass}>
        <div className={width}>
          <h2 className={heading}>Hosting, infrastructure, and cost drivers</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">You provide or approve the hosting account, ERP connectivity, and required service accounts and licenses. We configure the application and its integrations in the agreed environment. Before implementation we assign billing, deployment access, monitoring, and backup responsibilities.</p>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {costs.map(([title, description]) => (
              <div key={title} className="azure-service-step rounded-2xl border border-slate-200 bg-white p-5">
                <dt className="font-bold">{title}</dt>
                <dd className="mt-2 leading-7 text-slate-700">{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="roadmap" className={`${sectionClass} bg-slate-50`}>
        <div className={width}>
          <h2 className={heading}>Planned extension for chat-based data entry</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">The planned workflow collects the required fields in chat, validates them, shows a preview, and asks for confirmation or approval before submission. Each write would use a separately authorized capability and retain an audit record of the request and outcome.</p>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 sm:py-14">
        <div className={`${width} azure-service-cta rounded-3xl p-6 text-white sm:p-10`}>
          <h2 className={heading}>Start with a question your team keeps asking</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">Tell us what the question is, which ERP data answers it, and who should be able to see the result. We’ll use that to scope the first release.</p>
          <Button to="/contact" variant="light" className="mt-5">Discuss a project</Button>
        </div>
      </section>
    </article>
  )
}
