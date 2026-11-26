const phases = [
  ['Week 1', 'Initial discovery and documentation', 'Document how the business operates, its customers, suppliers, and facilities, and how teams and reporting lines are organized. Review IT platforms, software, and technology. Collect existing SOPs, forms, approvals, and records, then check how current procedures are implemented.'],
  ['Week 2', 'Site discovery and initial audit', 'Visit sites to observe work and conduct the initial audit. Walk through systems and processes with staff, sample records, and compare actual handoffs, approvals, and exceptions with the documented procedures.'],
  ['Weeks 3–4', 'Strategy development and submission', 'Develop and submit the strategy from the audit findings. Discuss priorities and the proposed rollout with stakeholders. Prepare preliminary SOPs, forms, and supporting documents for review.'],
]

const rollout = [
  'Weeks 5–12',
  'Implementation and control validation',
  'Finalize SOPs and control forms, assign role owners, coordinate warehouse, equipment and ERP changes, and train staff. Use scheduled audits to verify control operation and update the rollout as evidence changes.',
]

export default function OperationsTimeline({ caseStudy = false }) {
  return (
    <section id="project-timeline" aria-labelledby="project-timeline-heading" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
      <h2 id="project-timeline-heading" className="text-2xl font-bold tracking-tight text-slate-950">Project timeline</h2>
      <p className="mt-2 max-w-3xl leading-7 text-slate-700">{caseStudy
        ? 'The 12-week engagement moved from Gemba walks and the as-is audit to a strategy submitted to management across five areas. The rollout covered SOPs and control forms, staffing, warehouses and machinery, ERP, and regular audits.'
        : 'The 12-week baseline reserves four weeks for discovery, audit, and strategy submission. Weeks 5–12 cover a phased rollout and control testing, with milestones adjusted to the approved scope and evidence from the first changes.'}</p>
      <div role="region" aria-labelledby="project-timeline-heading" tabIndex={0} className="mt-5 overflow-x-auto rounded-xl border border-slate-200 focus-visible:outline-2 focus-visible:outline-blue-700">
        <table aria-labelledby="project-timeline-heading" className="w-full min-w-[32rem] text-left text-sm leading-6">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th scope="col" className="w-28 p-3">Timing</th>
              <th scope="col" className="w-1/4 p-3">Phase</th>
              <th scope="col" className="p-3">Activities and outputs</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {[...phases, rollout].map(([timing, phase, activities]) => (
              <tr key={timing} className="align-top even:bg-slate-50">
                <th scope="row" className="p-3 font-bold text-blue-950">{timing}</th>
                <td className="p-3 font-semibold text-slate-950">{phase}</td>
                <td className="p-3 text-slate-700">{activities}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
