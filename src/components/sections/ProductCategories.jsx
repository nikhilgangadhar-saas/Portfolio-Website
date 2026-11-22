import Button from '../ui/Button'

const offerings = [
  {
    title: 'Documents & Templates',
    description: 'Word and PDF packs for teams that need to document how work gets done and how controls are checked.',
    examples: ['Warehouse SOP packs', 'Audit plans and checklists', 'Approval matrices'],
  },
  {
    title: 'Excel Tools',
    description: 'Excel workbooks for recurring operational tasks, with a clear place to record inputs, review results, and follow up.',
    examples: ['Stock count and reconciliation', 'Inventory ageing', 'Audit action tracking'],
  },
  {
    title: 'Data & Reporting Services',
    description: 'We build data pipelines, connect ERP and other business systems, and deliver reports through the channels your team already uses.',
    examples: ['Azure data engineering and ERP pipelines', 'WhatsApp reporting and alerts', 'SequenceBI'],
  },
  {
    title: 'Business Applications',
    description: 'We build and deploy applications for people operations, internal audit, and business controls.',
    examples: ['HR application for onboarding, learning and development', 'Audit & Control App for findings, actions, and follow-up'],
  },
]

export default function ProductCategories() {
  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-12">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">Products &amp; Solutions</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map(({ title, description, examples }) => (
            <article key={title} className="flex flex-col rounded-2xl border border-white/15 bg-slate-900 p-5">
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 flex-1 text-base leading-6 text-slate-300">{description}</p>
              <ul className="mt-4 space-y-2 border-t border-white/15 pt-4 text-sm leading-5 text-slate-200">
                {examples.map((example) => <li key={example}>{example}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Button to="/contact" variant="light">Ask about an offering</Button>
        </div>
      </div>
    </section>
  )
}
