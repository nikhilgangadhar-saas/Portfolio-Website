import { services } from './homepageOfferings'

export const caseStudies = [
  {
    slug: 'operational-audit-control-roadmap',
    title: 'Operational Audit & Control Roadmap',
    tag: 'Operations & Governance',
    summary: 'We reviewed operations across plants, warehouses, and offices and secured board approval for a roadmap covering ERP, procurement, inventory, and warehouse operations.',
    problem: 'Leadership needed a clear view of operational gaps and a prioritized plan for improving controls across sites.',
    solution: 'We led a four-week operational audit, presented the findings to the board, and developed SOPs to support implementation.',
    tools: ['Operational audit', 'Process review', 'SOPs'],
    impact: [
      'Secured board approval for the improvement roadmap',
      'Helped train more than 120 staff',
    ],
  },
  {
    slug: 'sap-b1-to-azure-data-warehouse',
    title: 'From On-Premises SAP Business One to Azure Reporting',
    tag: 'Data Engineering',
    summary: 'We rebuilt a failing data pipeline for a manufacturing and distribution business and created a shared Azure SQL reporting layer for finance, sales, inventory, and production.',
    problem: 'SAP Business One ran on premises, and the existing data pipeline was failing. Finance and operations teams fell back on SAP exports and Excel to prepare recurring reports. We reviewed the SAP company databases, the available transaction history, and the reports people needed to produce. That gave us a list of source records and business checks to use when rebuilding the pipeline.',
    plan: 'We grouped the work by business area and agreed what each report needed to answer. For inventory, that meant knowing which item moved, in which warehouse, against which document, and at what batch level. For finance, it meant agreeing how account mappings, opening balances, and journal activity would produce statements that could be reconciled back to SAP.',
    solution: 'Azure Data Factory copied data from on-premises SAP Business One into Azure SQL. We built separate reporting models for manufacturing and distribution, then published views and stored procedures for the application. Scheduled loads kept the data current, and a pipeline monitoring screen let administrators inspect run status from the same application.',
    delivery: [
      { title: 'Inventory and procurement', text: 'We modeled inventory movements, batch-level transactions, daily stock snapshots, and purchase order tracking. Manufacturing reporting also used bill-of-materials data. The inventory and procurement pipelines ran twice a day.' },
      { title: 'Financial statements', text: 'We loaded the chart of accounts, opening balances, and journal entries. SQL account mappings grouped accounts into statement lines, and stored procedures returned summaries, account-level detail, and the underlying journal activity. We started with manufacturing and then built the corresponding distribution reports.' },
      { title: 'Reporting and monitoring', text: 'We published reports through an internal FastAPI application. Sales users could review daily trends and calendar patterns. Finance users could switch between yearly and monthly views and drill into account and journal detail. Administrators could see Azure Data Factory run status from the app.' },
    ],
    challenges: [
      { title: 'Finding changes across two SAP company databases', text: 'Manufacturing loads used the source activity date to select changes. Distribution used a query for documents changed in a rolling two-day window. This let scheduled loads process updated documents without reloading all inventory history.' },
      { title: 'Keeping reporting totals traceable', text: 'We combined opening balances with posted activity and checked that journal debits and credits balanced. The report drill-down let finance trace statement lines back to their accounts and entries. Cash-flow entries without a confirmed classification were surfaced as an unclassified difference for review.' },
      { title: 'Fixing a slow monthly drill-down', text: 'Distribution’s detailed monthly profit and loss view failed while the yearly view loaded. We traced the failure to an expensive SQL execution plan and corrected it. The detailed monthly view then loaded successfully.' },
    ],
    tools: ['SAP Business One', 'SQL Server', 'Azure Data Factory', 'Azure SQL', 'T-SQL', 'Python / FastAPI', 'Azure Container Apps'],
    impact: [
      'Finance could review profit and loss, balance sheet, and cash-flow reports for both businesses, with drill-down to source entries.',
      'Inventory teams gained scheduled views of stock movements, batch activity, stock on hand, and purchase order status.',
      'Sales and production reporting could use a common reporting layer, reducing reliance on individual SAP exports.',
      'Administrators could check whether scheduled refreshes succeeded from within the reporting application.',
    ],
  },
  {
    slug: 'automated-daily-sales-inventory-reports',
    title: 'Automated Daily Sales & Inventory Reports',
    tag: 'Automation',
    summary:
      'Designed automated reporting flows for sales, inventory, payments, and business performance monitoring.',
    problem:
      'Daily business reporting required manual preparation, formatting, and distribution, creating delay and inconsistency.',
    solution:
      'Built automated report distribution flows using SQL queries, scheduled pipelines, email distribution, and WhatsApp-ready reporting structures.',
    tools: ['Azure SQL', 'Logic Apps', 'Power BI', 'Email Automation', 'WhatsApp Cloud API'],
    impact: [
      'Enabled scheduled daily reporting',
      'Improved management visibility',
      'Reduced repeated manual reporting work',
      'Created reusable reporting distribution patterns',
    ],
  },
  {
    slug: 'warehouse-stock-transfer-control-app',
    title: 'Warehouse & Stock Transfer Control App',
    tag: 'Business Apps',
    summary:
      'Created a lightweight control application for stock transfers, warehouse movement, drafts, approvals, and tracking.',
    problem:
      'Stock transfers were handled through disconnected files, messages, and manual follow-ups, making control and traceability weak.',
    solution:
      'Designed a small workflow application for transfer creation, draft management, item lines, approval tracking, and status monitoring.',
    tools: ['React', 'JavaScript', 'Azure Functions', 'SQL Database', 'Static Web App Pattern'],
    impact: [
      'Improved transfer visibility',
      'Created structured draft and approval workflow',
      'Supported item, warehouse, and batch-level thinking',
      'Reduced dependency on informal follow-up',
    ],
  },
  {
    slug: 'audit-sop-reaudit-framework',
    title: 'Internal Audit & SOP Re-Audit Framework',
    tag: 'Governance',
    summary:
      'Created an evidence-based audit follow-up model focused on findings, owners, deadlines, evidence, and re-audit results.',
    problem:
      'Audit findings often lose momentum after reporting because ownership, deadlines, and evidence expectations are unclear.',
    solution:
      'Structured the audit follow-up cycle around named owners, stakeholders, due dates, documented evidence, and SAP/data-based re-audit.',
    tools: ['SAP Evidence', 'Excel Trackers', 'SOP Frameworks', 'Management Reporting'],
    impact: [
      'Created clear accountability for findings',
      'Improved follow-up discipline',
      'Separated evidence-based review from informal explanations',
      'Supported stronger governance and escalation',
    ],
  },
  {
    slug: 'incident-observation-management-app',
    title: 'Incident & Observation Management App',
    tag: 'Control Apps',
    summary:
      'Built a lightweight application structure to capture incidents, observations, categories, severity, ownership, and closure workflow.',
    problem:
      'Incidents and observations were difficult to track consistently across owners, categories, and closure status.',
    solution:
      'Designed a structured app workflow for logging, classifying, assigning, monitoring, and closing incidents and observations.',
    tools: ['React', 'JavaScript', 'SQL Database', 'Serverless API'],
    impact: [
      'Improved incident visibility',
      'Created structured classification',
      'Supported management follow-up',
      'Built a foundation for audit and control reporting',
    ],
  },
]

export function getCaseStudy(slug) {
  return caseStudies.find((study) => study.slug === slug)
}

const serviceCaseStudyMap = [
  { serviceId: 'business-analysis-strategy', title: 'Profitability & Assortment Across Retail, Wholesale and E-commerce', description: 'Channel profitability and the customer, product, and market data behind assortment decisions.' },
  { serviceId: 'operations-sops-audit', slug: 'operational-audit-control-roadmap' },
  { serviceId: 'azure-data-erp-reporting', slug: 'sap-b1-to-azure-data-warehouse', published: true },
  { serviceId: 'custom-business-applications', slug: 'incident-observation-management-app' },
  { serviceId: 'enterprise-ai-agents', title: 'Sequence BI · Business Q&A Over Company Data', description: 'A walkthrough of how an agent answers business questions using company data.' },
]

export const serviceCaseStudies = serviceCaseStudyMap.map(({ serviceId, slug, title, description, published }) => {
  const service = services.find(({ id }) => id === serviceId)
  const study = getCaseStudy(slug)
  return {
    id: `case-study-${serviceId}`,
    serviceHref: service.href,
    title: study?.title ?? title,
    description: study?.summary ?? description,
    focus: service.title,
    status: published ? undefined : 'Case study coming soon',
    href: published ? `/case-studies/${slug}` : service.href,
    actionLabel: published ? 'Read the case study' : 'View service',
  }
})
