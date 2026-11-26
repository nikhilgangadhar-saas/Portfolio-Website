import { Link } from 'react-router-dom'
import AssetLogo from '../ui/AssetLogo'
import Button from '../ui/Button'
import { serviceCaseStudies } from '../../data/caseStudies'
import OperationsTimeline from './OperationsTimeline'
import OperationsSectionNav from './OperationsSectionNav'
import './azure-reporting-pitch.css'

const project = serviceCaseStudies.find(({ id }) => id === 'case-study-operations-sops-audit')
const sections = [
  ['challenge', 'Challenge'],
  ['approach', 'Project approach'],
  ['workflow', 'Workflow'],
  ['project-timeline', 'Timeline'],
  ['implementation', 'Implementation'],
  ['outcomes', 'Deliverables'],
  ['delivery', 'Delivery & follow-up'],
]

const discovery = [
  ['Department leads', 'Agree which processes, handoffs, and recurring issues to investigate. Identify the staff who perform the work and the managers who own it.'],
  ['Site teams', 'Use Gemba walks with operators to observe actual work, review records and exceptions, and reconcile observations to the as-is process map.'],
  ['Leadership', 'Agree the project scope, decision owners, access, timing, and what the first release needs to achieve.'],
]

const workflow = [
  ['Discover', 'Interview departments and map the current process.'],
  ['Audit', 'Compare site evidence with recommended controls.'],
  ['Plan and approve', 'Prioritize findings and agree owners, milestones, and acceptance criteria.'],
  ['Implement', 'Coordinate changes, release the SOP, and train the teams.'],
  ['Measure and re-audit', 'Review performance, test controls again, and revise the plan as evidence changes.'],
]

const workstreams = [
  ['SOPs and control forms', 'Define standard work, remove duplicate approvals, and design control forms that capture transaction references, evidence, sign-off, and exceptions.'],
  ['People and accountability', 'Review role capacity and segregation of duties. Identify gaps in middle management, data entry, and audit support, then assign KRAs and train process owners.'],
  ['Machinery and facilities', 'Run Gemba walks and map material flow. Use capacity and utilization analysis to assess warehouse layout, handling equipment, and facility changes.'],
  ['ERP and transaction capture', 'Specify item and location master data, receipts, transfers, stock issues, posting permissions, and reconciliation checks. Walk through representative transactions before rollout.'],
  ['Audit and control framework', 'Build a risk and control matrix, define audit cadence and sampling, assign corrective actions, and re-test exceptions before closing findings.'],
]

const outputs = [
  ['As-is maps and audit findings', 'Swimlane maps, Gemba observations, and a findings register linking evidence to control gaps and owners.'],
  ['Strategy and implementation roadmap', 'A SWOT analysis and cost-benefit analysis to compare options, plus priorities, dependencies, milestones, and a RACI matrix.'],
  ['SOPs, control forms, and training', 'Versioned standard work, approval rules, exception routes, transaction-level evidence forms, and training for affected roles.'],
  ['ERP process requirements', 'Master data requirements, required transaction fields, posting roles, and end-to-end scenarios for validation.'],
  ['Audit framework and KPI/KRA scorecard', 'Risk-based sampling, corrective action tracking and re-tests, with measures such as transfer lead time, stock adjustments, wastage, and time to act on exceptions.'],
]

const documents = [
  ['Process maps', 'word.png'],
  ['Audit reports', 'pdf.png'],
  ['SOP training', 'ppt.png'],
  ['KPI tracking', 'excel.png'],
]

const decisionRoles = ['Sponsor', 'Process owner', 'Site lead', 'BA team']
const ownership = [
  ['Approve scope and target-state controls', 'A', 'C', 'C', 'R'],
  ['Validate the as-is process and audit evidence', 'I', 'A', 'R', 'R'],
  ['Approve the SOP and acceptance criteria', 'I', 'A', 'C', 'R'],
  ['Coordinate rollout and training', 'I', 'A', 'R', 'C'],
  ['Review corrective actions and re-audit results', 'I', 'A', 'R', 'R'],
]
const roleLabels = { R: 'Responsible', A: 'Accountable', C: 'Consulted', I: 'Informed' }

const sampleFinding = [
  ['Finding and evidence', 'Sampled stock transfers lack consistent evidence of approval before posting.'],
  ['Risk and control objective', 'Unauthorized stock movements. Verify approval before posting and retain an audit trail.'],
  ['Corrective action and owner', 'Add a pre-posting check to the SOP. The warehouse process owner validates the revised handoff.'],
  ['Acceptance criteria and re-test', 'In the follow-up sample, each posted transfer has a dated approval linked to its transaction reference.'],
]

const sectionClass = 'scroll-mt-24 border-b border-slate-200 px-5 py-10 sm:px-8 sm:py-14'
const contentClass = 'mx-auto max-w-6xl'
const headingClass = 'text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl'

export default function OperationsAuditService() {
  return (
    <article className="azure-service bg-white text-slate-950">
      <header className="azure-service-hero px-5 text-white sm:px-8">
        <div className={`${contentClass} grid items-center gap-10 lg:grid-cols-[1fr_19rem]`}>
          <div className="azure-pitch-intro">
            <Link to="/services" className="inline-block text-sm font-semibold text-blue-300 hover:text-blue-200">← Back to Services</Link>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">Operations, SOPs &amp; Audit</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">Find where procurement, inventory, and warehouse processes break down. Turn audit evidence into an implementation plan, release procedures teams can use, and check whether the changes work.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to={project.href} variant="light">Read the SCM case study</Button>
              <Button to="/contact" variant="glass">Discuss a project</Button>
            </div>
          </div>
          <ul aria-label="Example project deliverables" className="azure-service-tools grid grid-cols-2 gap-2 rounded-2xl border border-white/15 p-3">
            {documents.map(([title, logo]) => (
              <li key={title} className="flex flex-col items-center gap-2 rounded-xl p-3 text-center text-xs font-semibold">
                <span className="grid size-10 place-items-center rounded-lg bg-white p-1.5">
                  <AssetLogo file={logo} className="max-h-full w-full object-contain" />
                </span>
                {title}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <OperationsSectionNav sections={sections} />

      <section id="challenge" className={sectionClass}>
        <div className={`${contentClass} grid gap-4 md:grid-cols-[1fr_2fr]`}>
          <h2 className={headingClass}>The challenge</h2>
          <p className="max-w-3xl leading-7 text-slate-700">A purchase, stock movement, or warehouse handoff can work differently at each site. When teams rely on informal approvals or records spread across systems, it becomes difficult to trace decisions and tell whether controls are working.</p>
        </div>
      </section>

      <section id="approach" className={`${sectionClass} bg-slate-50`}>
        <div className={contentClass}>
          <h2 className={headingClass}>How we scope the project</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {discovery.map(([title, description]) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-7 text-slate-700">{description}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-8 text-xl font-bold">Agree the audit scope and decision process</h3>
          <p className="mt-2 max-w-3xl leading-7 text-slate-700">The charter defines the sites and processes in scope, the records and observations we need, and who approves the recommended controls. We use a RACI matrix to assign who does the work, who owns the decision, and who needs to be consulted or informed.</p>
          <div role="region" aria-label="Example RACI matrix" tabIndex={0} className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="px-4 py-3 text-left text-base font-bold">Example RACI matrix</caption>
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th scope="col" className="p-3">Decision or activity</th>
                  {decisionRoles.map(role => <th key={role} scope="col" className="p-3 text-center">{role}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {ownership.map(([decision, ...roles]) => (
                  <tr key={decision}>
                    <th scope="row" className="p-3 font-semibold">{decision}</th>
                    {roles.map((role, index) => (
                      <td key={decisionRoles[index]} className="p-3 text-center">
                        <span aria-hidden="true" className="font-bold text-blue-900">{role}</span>
                        <span className="sr-only">{roleLabels[role]}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-slate-600">R = Responsible · A = Accountable · C = Consulted · I = Informed</p>
        </div>
      </section>

      <section id="workflow" className="azure-service-architecture scroll-mt-24 px-5 py-10 text-white sm:px-8 sm:py-14">
        <div className={contentClass}>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">From discovery to re-audit</h2>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {workflow.map(([title, description], index) => (
              <li key={title} className="rounded-xl border border-white/15 bg-slate-950 p-4">
                <span aria-hidden="true" className="mb-3 grid size-8 place-items-center rounded-lg bg-blue-200 font-bold text-slate-950">{index + 1}</span>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-300">{description}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-3xl leading-7 text-slate-300">When new evidence changes a finding, we review it with the process owners, update the recommendation and its impact on the schedule, and agree the course correction before changing the SOP or rollout plan.</p>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">We map the as-is workflow in swimlanes, then use gap analysis to define the to-be controls. Each finding records its evidence, risk, control objective, corrective action, and owner. A change log captures revisions to the approved baseline and their downstream impact.</p>
        </div>
      </section>

      <div className={`${sectionClass} bg-slate-50`}>
        <div className={contentClass}>
          <OperationsTimeline />
        </div>
      </div>

      <section id="implementation" className={sectionClass}>
        <div className={contentClass}>
          <h2 className={headingClass}>How we implement the changes</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">Once the strategy is approved, we assign workstreams and sequence their dependencies. For Lean implementation, process owners walk through the revised flow, check for redundant approvals and handling, and validate roles, equipment, and ERP records before release.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {workstreams.map(([title, description]) => (
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
          <h2 className={headingClass}>What you receive</h2>
          <dl className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5">
            {outputs.map(([title, description]) => (
              <div key={title} className="grid gap-1 py-4 sm:grid-cols-[1fr_2fr] sm:gap-6">
                <dt className="font-semibold">{title}</dt>
                <dd className="leading-7 text-slate-700">{description}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm leading-6">
              <caption className="px-4 py-3 text-left text-base font-bold">Illustrative audit findings register entry</caption>
              <thead className="bg-slate-900 text-white">
                <tr><th scope="col" className="p-3">Field</th><th scope="col" className="p-3">Example</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sampleFinding.map(([field, example]) => (
                  <tr key={field} className="align-top">
                    <th scope="row" className="w-1/3 p-3 font-semibold">{field}</th>
                    <td className="p-3 text-slate-700">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="delivery" className={sectionClass}>
        <div className={contentClass}>
          <h2 className={headingClass}>Delivery and follow-up</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-bold">What we handle</h3>
              <p className="mt-2 leading-7 text-slate-700">We lead discovery, process mapping, the audit, the implementation plan, SOP authoring, and release support. We agree which processes require site observation and coordinate those visits with you.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-bold">What you provide</h3>
              <p className="mt-2 leading-7 text-slate-700">A sponsor and named process owners, access to staff and sites, sample transactions and records, and people who can validate the findings and approve changes.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-bold">How we follow up</h3>
              <p className="mt-2 leading-7 text-slate-700">Agree an audit schedule at release. Track open actions, review KPIs and role accountabilities, and issue findings and recommendations after each follow-up review.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 sm:py-14">
        <div className={`${contentClass} azure-service-cta rounded-3xl p-6 text-white sm:p-10`}>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Start with a process you want to improve</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">Tell us which handoff, approval, or recurring exception is causing problems and where it happens. We’ll help define what to review first and who should be involved.</p>
          <Button to="/contact" variant="light" className="mt-5">Discuss a project</Button>
        </div>
      </section>
    </article>
  )
}
