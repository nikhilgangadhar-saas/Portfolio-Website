import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
const services = [
  {
    title: 'Business Analysis & Strategy',
    description: 'We support business decisions with SWOT analysis, market research, and go-to-market planning.',
  },
  {
    title: 'Operations, SOPs & Audit',
    description: 'We improve inventory controls and day-to-day workflows, document SOPs, and design internal audit plans.',
  },
  {
    title: 'Azure Data & ERP Reporting',
    description: 'We build Azure databases and data pipelines, connect ERP data, and deliver reports and alerts through dashboards, WhatsApp, Microsoft Teams, or Slack.',
  },
  {
    title: 'Custom Business Applications',
    description: 'We build or deploy applications for HR onboarding, learning and development, internal audit, and approvals.',
  },
  {
    title: 'Enterprise AI Agents',
    description: 'We build agents that use ERP data to answer business questions, flag exceptions, and support defined workflows.',
  },
]

export default function ServicePreview() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7fb]">
      <div className="absolute inset-0 bg-soft-grid opacity-70" />
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-20">
        <SectionHeader
          eyebrow="Services"
          title="How we help"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title}>
              <h3 className="text-lg font-extrabold text-slate-950">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {service.description}
              </p>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}