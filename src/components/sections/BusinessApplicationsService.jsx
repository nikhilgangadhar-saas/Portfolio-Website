import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import OperationsSectionNav from './OperationsSectionNav'

const sections = [
  ['challenge', 'Challenge'],
  ['approach', 'Project approach'],
  ['governance', 'Project management'],
  ['workflow', 'Workflow'],
  ['deliverables', 'Deliverables'],
  ['handover', 'Rollout & handover'],
]

const phases = [
  ['Discovery', 'Map the SOP in swimlanes. Identify actor roles, forms, decision points, exceptions, and the records used to verify each step.'],
  ['Design', 'Agree the state transitions, role permissions, required evidence, and notification rules. Validate screens and acceptance criteria with process owners.'],
  ['Build and pilot', 'Build the agreed workflow and integrations. Pilot with representative users and run end-to-end acceptance tests for normal and exception scenarios.'],
  ['Release and review', 'Train users, agree operational ownership, and review the first transactions and exceptions. Use the findings to prioritize changes.'],
]

const deliverables = [
  ['Audit management', 'Audit templates, site assignments, evidence capture, and finding review.', 'Auditors can conduct a 6M or operational audit and retrieve evidence by site and audit record.'],
  ['Incidents and corrective actions', 'Incident logging, ownership, status tracking, and closure.', 'A team member submits a finding, the owner records action taken, and the reviewer can trace the entire record.'],
  ['ERP exception monitoring', 'An agreed feed of ERP movements and rules for flagging exceptions.', 'The control team can see a flagged movement and locate its source transaction.'],
  ['Notifications and reporting', 'Email or WhatsApp updates and role-based reporting.', 'The right stakeholder receives the update, and management can review open actions and repeat findings.'],
]

const decisions = [
  ['Scope and first release', 'Business sponsor', 'Approved charter, prioritized backlog, and exclusions'],
  ['Workflow and control design', 'Process owner', 'Agreed user roles, state transitions, and acceptance criteria'],
  ['Access and integrations', 'IT or system owner', 'Approved environments, test access, and representative ERP records'],
  ['Pilot and release', 'Process owner and release approver', 'User acceptance test results, defect disposition, and release sign-off'],
]

const sectionClass = 'scroll-mt-24 border-b border-slate-200 px-5 py-10 sm:px-8 sm:py-14'
const contentClass = 'mx-auto max-w-6xl'
const headingClass = 'text-2xl font-bold tracking-tight sm:text-3xl'

export default function BusinessApplicationsService({ caseStudyHref }) {
  return (
    <article className="azure-service bg-white text-slate-950">
      <header className="azure-service-hero px-5 text-white sm:px-8">
        <div className={contentClass}>
          <Link to="/services" className="inline-block text-sm font-semibold text-blue-300 hover:text-blue-200">← Back to Services</Link>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">Custom Business Applications</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">Turn an operating procedure into a web application that assigns work, captures evidence, and tracks decisions. Build around the people doing the work and the systems they already use.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to={caseStudyHref} variant="light">Read the audit app case study</Button>
            <Button to="/contact" variant="glass">Discuss a project</Button>
          </div>
        </div>
      </header>
      <OperationsSectionNav sections={sections} />

      <section id="challenge" className={sectionClass}>
        <div className={`${contentClass} grid gap-4 md:grid-cols-[1fr_2fr]`}>
          <h2 className={headingClass}>The challenge</h2>
          <p className="leading-7 text-slate-700">When forms, photos, decisions, and follow-ups live in separate inboxes or spreadsheets, teams struggle to see who owns the next action or whether it was completed. A shared application can connect the record, its evidence, and its status.</p>
        </div>
      </section>

      <section id="approach" className={`${sectionClass} bg-slate-50`}>
        <div className={contentClass}>
          <h2 className={headingClass}>How we deliver the application</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2">
            {phases.map(([title, description]) => (
              <li key={title} className="azure-service-step rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-7 text-slate-700">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="governance" className={sectionClass}>
        <div className={contentClass}>
          <h2 id="app-governance" className={headingClass}>Project management and decision ownership</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">We agree a project charter and RACI before development. The charter sets the first release scope, milestones, dependencies, and sign-off points. The RACI names who does the work, who approves it, and who needs to be consulted or informed.</p>
          <div role="region" aria-labelledby="app-governance" tabIndex={0} className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 focus-visible:outline-2 focus-visible:outline-blue-700">
            <table aria-labelledby="app-governance" className="w-full min-w-[36rem] text-left text-sm leading-6">
              <thead className="bg-slate-900 text-white">
                <tr><th scope="col" className="p-3">Decision</th><th scope="col" className="p-3">Example owner</th><th scope="col" className="p-3">Evidence for sign-off</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {decisions.map(([decision, owner, evidence]) => (
                  <tr key={decision} className="align-top even:bg-slate-50">
                    <th scope="row" className="p-3 font-semibold text-blue-950">{decision}</th>
                    <td className="p-3 text-slate-700">{owner}</td>
                    <td className="p-3 text-slate-700">{evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <dl className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <dt className="font-bold">Planning and reporting</dt>
              <dd className="mt-2 leading-7 text-slate-700">Agree a review cadence and track milestones, risks, assumptions, issues, and dependencies. Escalate blockers with a decision owner and a target date.</dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <dt className="font-bold">Change control</dt>
              <dd className="mt-2 leading-7 text-slate-700">Log requested changes and assess their impact on scope, permissions, integrations, cost, and schedule. Update the delivery baseline once the owner approves.</dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <dt className="font-bold">Acceptance and release</dt>
              <dd className="mt-2 leading-7 text-slate-700">Trace acceptance criteria to test scenarios. Pilot with representative roles, review defects with the process owner, and agree release readiness and handover.</dd>
            </div>
          </dl>
          <p className="mt-5 max-w-3xl leading-7 text-slate-700">We estimate the schedule after discovery. ERP access, the number of user roles and sites, and the time needed for pilot feedback and sign-off shape the milestones.</p>
        </div>
      </section>

      <section id="workflow" className={`${sectionClass} azure-service-architecture text-white`}>
        <div className={contentClass}>
          <h2 className={headingClass}>Example incident workflow</h2>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {['Log the issue and attach evidence', 'Triage and assign an owner', 'Record the corrective action', 'Review and close the finding'].map(step => (
              <li key={step} className="rounded-xl border border-white/15 bg-slate-950 p-4 font-semibold">{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section id="deliverables" className={sectionClass}>
        <div className={contentClass}>
          <h2 id="app-deliverables" className={headingClass}>What an internal control app can include</h2>
          <div role="region" aria-labelledby="app-deliverables" tabIndex={0} className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 focus-visible:outline-2 focus-visible:outline-blue-700">
            <table aria-labelledby="app-deliverables" className="w-full min-w-[38rem] text-left text-sm leading-6">
              <thead className="bg-slate-900 text-white">
                <tr><th scope="col" className="p-3">Module</th><th scope="col" className="p-3">What we build</th><th scope="col" className="p-3">Example acceptance check</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {deliverables.map(([module, deliverable, check]) => (
                  <tr key={module} className="align-top even:bg-slate-50">
                    <th scope="row" className="p-3 font-semibold text-blue-950">{module}</th>
                    <td className="p-3 text-slate-700">{deliverable}</td>
                    <td className="p-3 text-slate-700">{check}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="handover" className={`${sectionClass} bg-slate-50`}>
        <div className={contentClass}>
          <h2 className={headingClass}>Rollout and handover</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <dt className="font-bold">What we handle</dt>
              <dd className="mt-2 leading-7 text-slate-700">Workflow design, development, integration testing, release, and user documentation. We agree the support and change request process at handover.</dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <dt className="font-bold">What you provide</dt>
              <dd className="mt-2 leading-7 text-slate-700">A process owner, current SOPs and forms, representative test records, approved integration access, and users who can validate the pilot and sign off.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 sm:py-14">
        <div className={`${contentClass} azure-service-cta rounded-3xl p-6 text-white sm:p-10`}>
          <h2 className={headingClass}>Start with one workflow</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">Tell us who starts the work, where it stalls, and what evidence a reviewer needs. We’ll use that to scope the first release.</p>
          <Button to="/contact" variant="light" className="mt-5">Discuss a project</Button>
        </div>
      </section>
    </article>
  )
}
