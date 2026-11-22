import Button from '../ui/Button'

const tools = [
  {
    title: 'Stock Count & Reconciliation Workbook',
    format: 'Excel workbook',
    description: 'Compare physical counts with system stock, explain variances, and track adjustment approvals.',
    included: 'Count sheet, variance register, and adjustment approval log.',
    example: 'System stock: 120 units. Physical count: 116. Variance: −4. Adjustment: pending approval.',
  },
  {
    title: 'Warehouse SOP Starter Pack',
    format: 'Editable procedures and checklists',
    description: 'Standardize receiving, storage, transfers, stock counts, and dispatch.',
    included: 'Editable SOPs, role assignments, and checklists for each warehouse process.',
    example: 'Receiving checklist: match the delivery to the purchase order, count items, check for damage, and record discrepancies before posting the receipt.',
  },
  {
    title: 'Audit Action Tracker',
    format: 'Tracking workbook',
    description: 'Assign audit findings, monitor deadlines, and record closure evidence and follow-up reviews.',
    included: 'Findings register, action owners, due dates, evidence references, and re-audit status.',
    example: 'Finding: unsigned stock adjustments. Owner: warehouse lead. Evidence required: approved adjustments. Status: awaiting review.',
  },
]

export default function ProductCategories() {
  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-12">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">Tools &amp; Templates</h2>

        <div className="mt-6 grid items-start gap-4 md:grid-cols-3">
          {tools.map((tool) => (
            <article key={tool.title} className="rounded-2xl border border-white/15 bg-slate-900 p-5">
              <p className="text-sm font-medium text-slate-300">{tool.format}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{tool.title}</h3>
              <p className="mt-3 text-base leading-6 text-slate-300">{tool.description}</p>
              <details className="mt-4 border-t border-white/15 pt-3">
                <summary className="cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-offset-4">
                  View product
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-200">{tool.included}</p>
                <div className="my-4 rounded-xl bg-slate-950 p-3">
                  <p className="text-sm font-semibold">Sample preview</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{tool.example}</p>
                </div>
                <Button to="/contact" variant="light">Request access</Button>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
