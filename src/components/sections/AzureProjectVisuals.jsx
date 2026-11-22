import AssetLogo from '../ui/AssetLogo'

const responsibility = {
  R: { label: 'Responsible', style: 'bg-blue-100 text-blue-900' },
  A: { label: 'Accountable', style: 'bg-slate-900 text-white' },
  C: { label: 'Consulted', style: 'bg-slate-100 text-slate-700' },
  I: { label: 'Informed', style: 'text-slate-600' },
}

const roles = ['Sponsor', 'Operations', 'IT', 'Project team']
const decisions = [
  ['Approve project charter', 'A', 'C', 'C', 'R'],
  ['Define KPIs and report needs', 'I', 'A', 'C', 'R'],
  ['Approve source access', 'I', 'C', 'A', 'R'],
  ['Build and validate pipelines', 'I', 'C', 'A', 'R'],
  ['Accept the reports', 'I', 'A', 'C', 'R'],
]

const weeks = Array.from({ length: 8 }, (_, index) => index + 1)
const phases = [
  ['Discovery & charter', 1, 2],
  ['Access & solution design', 2, 3],
  ['Pipelines & warehouse', 3, 5],
  ['Reports & distribution', 5, 6],
  ['Reconciliation & acceptance', 6, 7],
  ['Release & handover', 8, 8],
]

const warehouseFlow = [
  ['SAP Business One', 'Source transactions and master data', 'SAP.png'],
  ['Azure Data Factory', 'Scheduled extraction and loading', 'adf.png'],
  ['Azure SQL', 'Curated warehouse and reporting views', 'sql.png'],
]

const delivery = [
  ['Power BI', 'Management dashboards', 'pbi.png'],
  ['Web reports', 'Operational reports and drill-downs', 'WebReports.png'],
  ['Logic Apps', 'Scheduled email distribution', 'LogicApps.png'],
]

export function AzureArchitecture() {
  return (
    <figure className="mt-7 rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-6">
      <div className="azure-flow">
        <ol aria-label="Source and warehouse pipeline" className="azure-flow-main">
          {warehouseFlow.map((node) => <DiagramNode key={node[0]} node={node} />)}
        </ol>
        <ul aria-label="Reporting and delivery from Azure SQL" className="azure-flow-delivery">
          {delivery.map((node) => <DiagramNode key={node[0]} node={node} />)}
        </ul>
      </div>
      <figcaption className="mt-5 border-t border-white/15 pt-4 text-sm text-slate-300">
        SAP data flows through Data Factory into Azure SQL. The warehouse feeds dashboards, web reports, and scheduled email.
      </figcaption>
    </figure>
  )
}

function DiagramNode({ node: [title, description, logo] }) {
  return (
    <li className="relative flex gap-3 rounded-xl border border-white/15 bg-slate-950 px-4 py-3 sm:items-center">
      {logo && (
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white p-1.5">
          <AssetLogo file={logo} className="max-h-full w-full object-contain" />
        </span>
      )}
      <div>
        <div className="text-sm font-bold text-white">{title}</div>
        <div className="mt-0.5 text-sm leading-5 text-slate-300">{description}</div>
      </div>
    </li>
  )
}

export function AzureProjectPlan() {
  return (
    <div className="mt-8 grid min-w-0 gap-4 xl:grid-cols-2">
      <figure className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <figcaption id="azure-raci" className="text-lg font-bold">Example RACI matrix</figcaption>
        <div className="mt-3 overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2" role="region" aria-labelledby="azure-raci" tabIndex={0}>
          <table aria-labelledby="azure-raci" className="w-full min-w-88 border-collapse text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th scope="col" className="px-2 py-2 text-left">Decision</th>
                {roles.map((role) => <th scope="col" key={role} className="px-1 py-2 text-center">{role}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {decisions.map(([decision, ...assignments]) => (
                <tr key={decision}>
                  <th scope="row" className="px-2 py-2 text-left font-medium">{decision}</th>
                  {assignments.map((code, index) => (
                    <td key={roles[index]} className="px-1 py-2 text-center">
                      <span className={`inline-grid size-6 place-items-center rounded-md font-bold ${responsibility[code].style}`}>
                        <span aria-hidden="true">{code}</span>
                        <span className="sr-only">{responsibility[code].label}</span>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
          {Object.entries(responsibility).map(([code, { label }]) => <li key={code}><strong>{code}</strong> {label}</li>)}
        </ul>
      </figure>

      <figure className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <figcaption id="azure-timeline" className="text-lg font-bold">Example eight-week plan</figcaption>
        <div className="mt-3 overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2" role="region" aria-labelledby="azure-timeline" tabIndex={0}>
          <table aria-labelledby="azure-timeline" className="w-full min-w-88 border-collapse text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th scope="col" className="px-2 py-2 text-left">Phase</th>
                {weeks.map((week) => (
                  <th scope="col" key={week} className="w-7 py-2 text-center">
                    <span className="sr-only">Week </span>{week}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {phases.map(([phase, start, end]) => (
                <tr key={phase}>
                  <th scope="row" className="px-2 py-2 text-left font-medium">{phase}</th>
                  {weeks.map((week) => {
                    const active = week >= start && week <= end
                    return (
                      <td key={week} className="border-x border-slate-100 px-px py-2 text-center">
                        <span className={`block h-3 ${active ? 'bg-blue-700' : ''}`}>
                          <span className="sr-only">{active ? 'Scheduled' : '—'}</span>
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-600">Timing depends on source access, data quality, and sign-off.</p>
      </figure>
    </div>
  )
}
