import FeatureCarousel from '../ui/FeatureCarousel'

const services = [
  {
    title: 'Business Analysis & Strategy',
    description: 'We assess markets, customers, and competitors to help you decide which opportunities to pursue. We turn that research into a SWOT analysis, clear priorities, and a go-to-market plan.',
    focus: 'Market research · SWOT · Go-to-market',
  },
  {
    title: 'Operations, SOPs & Audit',
    description: 'We map how work moves through your business, identify gaps in inventory controls and approvals, and document who owns each step. We build SOPs and audit plans your team can use to check that controls are working.',
    focus: 'Inventory controls · SOPs · Internal audit',
  },
  {
    title: 'Azure Data & ERP Reporting',
    description: 'We connect ERP data to Azure databases and pipelines, then build reporting for finance, sales, inventory, and operations. We can deliver reports and alerts in dashboards, WhatsApp, Microsoft Teams, or Slack.',
    focus: 'Azure databases · Data pipelines · Reporting',
  },
  {
    title: 'Custom Business Applications',
    description: 'We build and deploy applications around the way your teams work. Examples include HR onboarding, learning and development, audit action tracking, and approval workflows.',
    focus: 'HR onboarding · Learning & development · Audit',
  },
  {
    title: 'Enterprise AI Agents',
    description: 'We build AI agents that use ERP data to answer business questions, flag exceptions, and guide teams through defined workflows. We design them around a specific use case and the data each team is allowed to access.',
    focus: 'ERP data · Exception monitoring · Workflow support',
  },
]

export default function ServicePreview() {
  return <FeatureCarousel id="home-services" heading="How we help" items={services} actionLabel="Discuss a project" />
}
