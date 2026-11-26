import { applications } from './applications'

export const offerings = [
  {
    id: 'documents-templates',
    title: 'Documents & Templates',
    enquiry: 'Tell us which document you need and whether you want a template or a version tailored to your process.',
    description: 'Word and PDF packs for teams that need to document how work gets done and how controls are checked.',
    examples: ['warehouse SOP packs', 'audit plans and checklists', 'approval matrices'],
  },
  {
    id: 'excel-tools',
    title: 'Excel Tools',
    enquiry: 'Tell us what you need to track, what data you have, and which workbook you would like to review.',
    description: 'Excel workbooks for recurring operational tasks, with a clear place to record inputs, review results, and follow up.',
    examples: ['stock count and reconciliation workbooks', 'inventory ageing workbooks', 'audit action trackers'],
  },
  {
    id: 'data-reporting-services',
    title: 'Data & Reporting Services',
    enquiry: 'Tell us which ERP or data sources you use, what you want to report, and where your team needs to receive it. For SequenceBI, tell us what you are looking to evaluate.',
    description: 'We build data pipelines, connect ERP and other business systems, and deliver reports through the channels your team already uses.',
    examples: ['Azure data engineering and ERP pipelines', 'WhatsApp reporting and alerts', 'SequenceBI'],
  },
  {
    id: 'business-applications',
    title: 'Business Applications',
    enquiry: 'Tell us which app you are interested in, who will use it, and which workflow you want to cover. You can request a walkthrough or discuss a custom deployment.',
    description: 'Explore applications for hiring and training employees, running audits and tracking corrective actions, and getting on-demand reports from ERP data.',
    examples: ['HR - People Review', 'Internal Audit and Control', 'Sequence BI'],
  },
]

export const services = [
  {
    id: 'business-analysis-strategy',
    title: 'Business Analysis & Strategy',
    description: 'We assess markets, customers, and competitors to help you decide which opportunities to pursue. We turn that research into a SWOT analysis, clear priorities, and a go-to-market plan.',
    focus: 'Market research · SWOT · Go-to-market',
    logos: { files: ['ppt.png', 'excel.png'] },
  },
  {
    id: 'operations-sops-audit',
    title: 'Operations, SOPs & Audit',
    description: 'We map how work moves through your business, identify gaps in inventory controls and approvals, and document who owns each step. We build SOPs and audit plans your team can use to check that controls are working.',
    focus: 'Inventory controls · SOPs · Internal audit',
    logos: { files: ['word.png', 'pdf.png', 'WhatsApp.png'], apps: ['internal-audit'] },
  },
  {
    id: 'azure-data-erp-reporting',
    title: 'Azure Data & ERP Reporting',
    description: 'We bring ERP, spreadsheet, and application data into Azure, then build pipelines and reporting for finance, sales, inventory, and operations. We can serve that data through dashboards, web apps, and scheduled reports or alerts.',
    focus: 'Azure databases · Data pipelines · Reporting',
    logos: { files: ['Azure.png', 'sql.png', 'adf.png', 'pbi.png', 'WhatsApp.png', 'Database.png'] },
  },
  {
    id: 'custom-business-applications',
    title: 'Custom Business Applications',
    description: 'We build and deploy applications around the way your teams work. Examples include HR onboarding, learning and development, audit action tracking, and approval workflows.',
    focus: 'HR onboarding · Learning & development · Audit',
    logos: {
      files: ['Python.png', 'JavaScript.png', 'Azure.png', 'Git.png'],
      apps: applications.map(({ id }) => id),
    },
  },
  {
    id: 'enterprise-ai-agents',
    title: 'Enterprise AI Agents',
    description: 'We build AI agents that use ERP data to answer business questions, flag exceptions, and guide teams through defined workflows. We design them around a specific use case and the data each team is allowed to access.',
    focus: 'ERP data · Exception monitoring · Workflow support',
    logos: { files: ['Microsoft.png', 'SAP.png', 'WhatsApp.png', 'Outlook.png'] },
  },
].map((service) => ({ ...service, href: `/services/${service.id}` }))
