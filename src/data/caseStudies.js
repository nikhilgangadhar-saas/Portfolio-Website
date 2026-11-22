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
    title: 'SAP B1 to Azure Data Warehouse',
    tag: 'Data Engineering',
    summary:
      'Built a reporting-ready data warehouse layer from SAP Business One using SQL, pipelines, and structured reporting models.',
    problem:
      'Management reporting was dependent on SAP extracts, manual Excel files, and repeated data preparation work.',
    solution:
      'Designed a structured Azure SQL reporting layer fed from SAP B1 data, with domain schemas, fact tables, and reporting-ready views.',
    tools: ['SAP Business One', 'SQL Server', 'Azure SQL', 'ADF', 'Power BI'],
    impact: [
      'Reduced dependency on manual SAP extracts',
      'Created a stable reporting layer for management reports',
      'Improved consistency across sales, inventory, payment, and production reporting',
      'Prepared the foundation for automation and dashboarding',
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