import { services } from './homepageOfferings'

export const caseStudies = [
  {
    slug: 'sequence-bi-governed-erp-reporting',
    title: 'SequenceBI: From ERP Questions to On-Demand Reports',
    summary: 'We built SequenceBI so operations and leadership can ask a business question, get an answer from approved ERP data, and use the conversation to build a report or dashboard.',
    clientTitle: 'The next question needs a different view',
    client: 'Scheduled dashboards cover the questions the data team can anticipate. A follow-up about a specific period, customer, or product may require searching through several dashboards or asking the data team for another extract. SequenceBI gives teams a direct way to ask for the figures they need.',
    facts: [['Access channels', 'Web and WhatsApp'], ['Data access', 'Governed ERP layer']],
    problem: [
      'Operations and leadership needed answers at different levels of detail, from daily sales trends to customer and product rankings.',
      'Answers needed to use consistent business definitions and respect access permissions.',
    ],
    plan: [
      'We registered approved reporting capabilities for summaries, daily series, rankings, and period comparisons.',
      'We separated question interpretation from query execution so the application could validate scope and permissions before requesting data.',
    ],
    solution: [
      'Approved queries run over a curated ERP reporting layer. Validated figures drive the answer, table, or chart.',
      'The dedicated web portal retains the active analysis across follow-ups and supports dashboards built from the conversation. WhatsApp provides an additional channel for supported queries.',
    ],
    pipelineTitle: 'How a question becomes a report',
    pipelineLabel: 'Architecture',
    pipeline: [
      { title: 'Ask', detail: 'Use the web portal or send a supported question through WhatsApp.', logo: 'WhatsApp.png' },
      { title: 'Resolve', detail: 'Determine the metric, reporting period, and breakdown.', logo: 'word.png' },
      { title: 'Validate and query', detail: 'Check access and run an approved reporting capability.', logo: 'Database.png' },
      { title: 'Present', detail: 'Return the result and use the web conversation to assemble a dashboard.', logo: 'WebReports.png' },
    ],
    delivery: [
      { title: 'Data engineering and SQL reporting', text: 'We used a curated ERP reporting dataset as the input to approved SQL for totals, daily series, rankings, and comparisons. Named periods and custom date ranges resolve before execution, keeping date boundaries and metric calculations consistent.' },
      { title: 'Governed ERP layer', text: 'Registered Model Context Protocol (MCP) capabilities use approved SQL and validated input and output contracts. Data access is scoped to the authenticated user and tenant.' },
      { title: 'Natural language and LLM configuration', text: 'The web NLP layer classifies each turn as a new analysis, a scope change, a presentation edit, or a clarification. The selected OpenAI model is configurable at deployment. The application validates the structured plan before any reporting query runs.' },
      { title: 'Web portal context', text: 'The authenticated conversation retains the active dataset and request, including table-only results. A date-range change runs a new query. A chart edit can reuse validated figures after rechecking permissions.' },
      { title: 'WhatsApp context', text: 'WhatsApp tracks the previous response for the sender to support follow-up questions and lets the sender reset the conversation. It uses a separate chat flow from the portal’s structured analysis state.' },
      { title: 'Reports, dashboards, and hosting', text: 'The web workflow renders tables and charts from validated results and uses conversation data to assemble dashboards. The application is packaged in a Python container with SQL Server connectivity for deployment.' },
      { title: 'Planned chat-based data entry', text: 'The roadmap adds a write workflow. Chat would collect and validate the fields, preview the proposed record, and request confirmation before a separately authorized action submits it. Reporting remains the current use case.' },
    ],
    traceabilityTitle: 'Example conversation and execution path',
    traceability: [
      ['Compare daily sales for August and July.', 'Daily sales comparison', 'Resolve the two calendar periods, validate scope, and retrieve the authorized figures.'],
      ['Show that as a line chart.', 'Presentation update', 'Render the active comparison as a line chart.'],
      ['Switch to columns.', 'Chart update', 'Reuse the same values and preserve both date ranges.'],
      ['Build a dashboard for this review.', 'Conversation-based dashboard', 'Present the relevant reporting views in the portal.'],
    ],
    tools: ['Curated ERP data', 'Approved SQL', 'MCP capability registry', 'Structured planning', 'Web portal', 'WhatsApp'],
    results: [
      { area: 'Leadership', delivered: 'On-demand period comparisons and reporting views', use: 'Ask a follow-up and assemble the relevant views for a management review.' },
      { area: 'Operations', delivered: 'Daily trends and customer or product breakdowns', use: 'Investigate a change without finding a dashboard built for that exact question.' },
      { area: 'Data and IT', delivered: 'Approved capabilities, validated requests, and access checks', use: 'Keep metric definitions and permitted data access consistent across questions.' },
    ],
  },
  {
    slug: 'three-brand-profitability-and-channel-strategy',
    title: 'Three Brands, Two Markets: A Profitability and Growth Strategy',
    summary: 'A food manufacturer sold similar products under three brands in the same market. We analyzed procurement, production, customers, margins, and stock coverage to recommend separate strategies for established HoReCa and emerging retail.',
    clientTitle: 'One manufacturer, three overlapping brands',
    client: 'Brands A and B were priced similarly, while Brand C was slightly cheaper. The decision was where to focus capacity, stock, credit, and marketing when the brands had little visible differentiation.',
    facts: [['Reported sales increase', '4×'], ['Consecutive record sales months', '5']],
    problem: [
      'Brand A led historical sales and gross margin and served the largest accounts. A scatter plot helped confirm where sales and margins were concentrated.',
      'The top HoReCa customers were wholesalers and restaurants that prioritized reliable supply. Fieldwork at warehouses and sales offices found little perceived difference between the brands.',
      'Supermarket visits and stock data showed a different retail problem. Sales were weak, finished goods were approaching expiry, and raw materials were expiring.',
    ],
    plan: [
      'We traced the full cycle from materials procured by brand through production capacity and sales. We grouped SKUs by HoReCa or retail, product family (mayonnaise, ketchup, vinegar, or sauces), and gross profitability.',
      'We reviewed customer buying reasons and collections by account. Upfront-paying Tier A customers and credit customers had been treated alike.',
      'Using trailing three- or six-month sales, we compared inventory coverage. The top ten SKUs had less than one month of cover, while some slow movers exceeded 18 months.',
    ],
    solution: [
      'We recommended protecting established HoReCa demand while testing retail on a smaller scale, with separate material requirements planning (MRP) and HoReCa priority during stockouts.',
      'Management accepted the recommendations, hired key staff, prioritized top accounts and exports, accelerated finished-goods delivery, and expanded warehouse capacity.',
    ],
    pipelineTitle: 'From commercial diagnosis to operating decisions',
    pipelineLabel: 'Analysis workflow',
    pipeline: [
      { title: 'Reconcile the cycle', detail: 'Procurement, production capacity, SKU sales, gross margin, and collections', logo: 'Database.png' },
      { title: 'Segment demand', detail: 'Brand, product family, channel, account, and stock coverage', logo: 'excel.png' },
      { title: 'Validate in the market', detail: 'Warehouse and sales-office visits for HoReCa and supermarket visits for retail', logo: 'word.png' },
      { title: 'Set operating priorities', detail: 'Production, stock allocation, credit, marketing, and assortment', logo: 'ppt.png' },
    ],
    delivery: [
      { title: 'Established HoReCa business', text: 'Increase production and target two months of stock for the top ten SKUs. Offer Brands B or C when A is unavailable and give top customers faster delivery and priority support.' },
      { title: 'Emerging retail business', text: 'Start with a limited rollout. Use events and supermarket relationships to develop demand. Offer up to 45 days of credit to eligible supermarket chains and wholesalers.' },
      { title: 'Production and inventory', text: 'Move toward produce-to-order, keep separate MRP plans by segment, and give HoReCa allocation priority during stockouts. Use approved marketing giveaways and events to move eligible near-expiry stock.' },
      { title: 'Capacity and staffing plan', text: 'We assessed what higher sales would require across the operation: more warehouse workers, an additional shift, more trucks, and added office capacity in finance, logistics, and supply chain management. This connected the sales plan to staffing, dispatch, and back-office workload.' },
      { title: 'Portfolio and market development', text: 'Pause new flavours for six months, review weak SKUs for discontinuation, and test digital marketing, social channels, and food-delivery platforms. Management also prioritized export orders.' },
    ],
    traceabilityTitle: 'Evidence behind the recommendations',
    traceability: [
      ['Brand A led sales and gross margin, while top accounts prioritized supply', 'Top-account service and stock priority', 'Protect availability and use alternate brands where customers accept them.'],
      ['Top ten SKUs below one month of cover and some slow movers above 18 months', 'Two-month target for top sellers and produce-to-order for the wider range', 'Shift inventory and capacity toward proven demand.'],
      ['Retail sell-through was weak and stock was nearing expiry', 'Small retail rollout with separate MRP and targeted events', 'Test demand before committing more stock.'],
      ['Upfront and credit accounts were treated alike', 'Segmented commercial and credit terms', 'Prioritize collections while giving eligible retail accounts terms suited to that channel.'],
    ],
    tools: ['Historical sales analysis', 'Gross margin analysis', 'Scatter plot', 'SKU segmentation', 'Inventory coverage', 'Site and market visits', 'Material requirements planning'],
    results: [
      { area: 'Sales', delivered: 'Top-account allocation, faster delivery, and approved brand substitutions', use: 'Sales increased fourfold and reached five consecutive record months.' },
      { area: 'Finance', delivered: 'Upfront payment priority for established accounts and bulk material purchasing', use: 'Receivables fell, cash flow improved, and both gross margin percentage and value improved. Operating costs rose only slightly.' },
      { area: 'Warehousing', delivered: 'Additional warehouse space and improved inventory flow', use: 'Warehouse conditions improved as stock moved more smoothly. Raw material and finished-goods wastage fell.' },
      { area: 'Production', delivered: 'Better material flow and fewer disruptions', use: 'Production capacity increased as more space became available and disruptions were avoided.' },
      { area: 'Export', delivered: 'Higher priority for export orders', use: 'Additional orders increased production demand and material consumption.' },
      { area: 'Retail', delivered: 'A phased retail development plan', use: 'Implementation was still in progress, with no significant improvement reported at the time.' },
    ],
  },
  {
    slug: 'operational-audit-control-roadmap',
    title: 'From Supply Chain Audit to an Operating SOP',
    summary: 'We mapped supply chain work across plants, warehouses, and offices, used audit findings to build a board-approved roadmap, and implemented it through a phased rollout of the supply chain SOP.',
    client: 'The business operated across plants, warehouses, and offices. The supply chain review covered procurement, inventory, and warehouse operations, including where teams relied on ERP records and where decisions happened on the floor.',
    clientTitle: 'Supply chain operations across multiple sites',
    facts: [
      ['Full engagement timeline', '12 weeks'],
      ['Staff we helped train', '120+'],
    ],
    showOperationsTimeline: true,
    problem: [
      'We began by speaking with the departments about how work moved between teams, who made decisions, and where issues kept recurring.',
      'We built an as-is process map with the teams, then used Gemba walks at the sites to validate handoffs, decision points, and exceptions against actual practice.',
      'The audit documented the evidence and used gap analysis to compare the as-is process with the recommended to-be controls.',
    ],
    plan: [
      'We submitted a strategy to management covering five improvement areas. SWOT analysis framed operating constraints and opportunities. Cost-benefit analysis weighed staffing, facilities, machinery, and ERP changes against the expected operational improvements.',
      'We used the approved roadmap to sequence SOP changes, hiring, warehouse and equipment changes, ERP rollout, and audit oversight.',
    ],
    solution: [
      'We brought the workstreams together in one operating SOP. The procedure set out who owned each step, what controls applied, and where the work and evidence were recorded.',
      'We helped train more than 120 staff, set KPIs and KRAs, and organized follow-up audits and reporting.',
    ],
    pipelineTitle: 'From discovery to follow-up audit',
    pipelineLabel: 'Project workflow',
    pipeline: [
      { title: 'Listen and map', detail: 'Department discussions, process mapping, and site observation', logo: 'word.png' },
      { title: 'Audit and recommend', detail: 'Evidence, control gaps, and a strategy for approval', logo: 'pdf.png' },
      { title: 'Implement and train', detail: 'SOPs, control forms, staffing, facilities, and ERP changes', logo: 'ppt.png' },
      { title: 'Measure and re-audit', detail: 'KPIs, KRAs, audit reports, and recommendations', logo: 'excel.png' },
    ],
    delivery: [
      { title: 'SOPs and control forms', text: 'Released the supply chain SOP with step ownership, decision rules, and exception routing. Simplified approval workflows to remove duplicate handoffs and paired key controls with forms that capture who acted, what they approved, and which transaction it relates to.' },
      { title: 'People and accountability', text: 'Defined key hires for middle management, data entry, and audit support. Assigned process owners and aligned their KRAs and training with the revised controls.' },
      { title: 'Machinery and facilities', text: 'Planned new warehouses and machinery around stock movement and capacity. Reorganized warehouse operations to improve utilization and support the revised material flow.' },
      { title: 'ERP and transaction capture', text: 'Introduced an ERP workflow to capture receipts, stock transfers, and issues at the point of activity. Mapped mandatory fields, item and location references, and posting responsibilities so transactions could be traced and reconciled.' },
      { title: 'Audit and control framework', text: 'Set up regular audit involvement to oversee implementation. Defined the audit cadence, evidence and sampling requirements, findings reports, corrective-action ownership, and re-tests for closure.' },
    ],
    challengesTitle: 'How we adjusted the plan',
    challenges: [
      { title: 'Reset leadership ownership', text: 'When key leaders lacked ownership of the rollout, they were replaced. We reassigned decisions and actions before proceeding with affected workstreams.' },
      { title: 'Reorganize warehouses', text: 'We revised the warehouse footprint and stock movement plan as facilities were replaced or reorganized. The revised SOP reflected the updated locations and handoffs.' },
      { title: 'Re-run the process after the first change', text: 'We repeated the process walkthrough and re-tested controls after the first implementation changes. The findings informed revisions to the SOP, forms, and rollout sequence.' },
    ],
    traceability: [
      ['Department interviews and site walkthroughs', 'As-is process map', 'Trace handoffs, decision points, and exceptions between teams.'],
      ['Current-state evidence compared with recommended controls', 'Gap analysis and strategy document', 'Give leadership an evidence base for approving the to-be controls and priorities.'],
      ['Approved strategy and workstream dependencies', 'Released SOP and control forms', 'Translate the approved changes into operating steps, roles, and controls.'],
      ['New evidence during implementation', 'Revised priorities and workstream actions', 'Adjust the rollout or update the procedure as findings change.'],
      ['Released SOP, KPIs, and KRAs', 'Audit framework, findings register, and re-test schedule', 'Re-test controls, review performance, and track recommendations.'],
    ],
    tools: ['Department interviews', 'Process mapping', 'Gemba walks', 'SWOT analysis', 'Cost-benefit analysis', 'Lean operations implementation', 'Control audit', 'Strategy and SOP documents', 'KPI and KRA reviews'],
    results: [
      { area: 'Leadership', delivered: 'Board-approved strategy and control roadmap', use: 'Prioritize implementation and review the actions that need decisions.' },
      { area: 'Supply chain teams', delivered: 'Released SOP and training support for more than 120 staff', use: 'Follow the same procedure and understand where each handoff belongs.' },
      { area: 'Process owners', delivered: 'Key performance indicators and key result areas', use: 'Review performance and clarify what each role is accountable for.' },
      { area: 'Warehousing', delivered: 'Reorganized facilities and revised stock movement controls', use: 'Improved space utilization and reduced inventory wastage.' },
      { area: 'Logistics', delivered: 'Clearer transfer handoffs and exception ownership', use: 'Acted faster on stock movement issues and dispatch exceptions.' },
      { area: 'Production', delivered: 'Revised material movement and ERP posting steps', use: 'Improved visibility of available material and response to shortages.' },
      { area: 'Sales', delivered: 'Improved stock movement and availability', use: 'Improved inventory flow supported increased sales.' },
      { area: 'Audit and management', delivered: 'Follow-up audit schedule, reports, and recommendations', use: 'Track open actions and verify whether changes are working.' },
    ],
  },
  {
    slug: 'sap-b1-to-azure-data-warehouse',
    title: 'From On-Premises SAP Business One to Azure Reporting',
    tag: 'Data Engineering',
    summary: 'We rebuilt a failing data pipeline for a manufacturing and distribution business and created a shared Azure SQL reporting layer for finance, sales, inventory, and production.',
    client: 'The client ran manufacturing and distribution operations. Each side had its own SAP Business One company database. Finance needed statements it could reconcile to SAP, while operations needed to trace stock by item, warehouse, and batch.',
    clientTitle: 'A manufacturing and distribution business',
    facts: [
      ['SAP company databases', '2'],
      ['Inventory and procurement refresh', 'Twice daily'],
    ],
    problem: [
      'SAP Business One ran on premises, and the existing data pipeline was failing.',
      'Finance and operations teams fell back on SAP exports and Excel to prepare recurring reports.',
      'We reviewed the SAP company databases, the available transaction history, and the reports people needed to produce.',
      'That gave us a list of source records and business checks to use when rebuilding the pipeline.',
    ],
    plan: [
      'We grouped the work by business area and agreed what each report needed to answer.',
      'For inventory, that meant knowing which item moved, in which warehouse, against which document, and at what batch level.',
      'For finance, it meant agreeing how account mappings, opening balances, and journal activity would produce statements that could be reconciled back to SAP.',
    ],
    solution: [
      'Azure Data Factory copied data from on-premises SAP Business One into Azure SQL.',
      'We built separate reporting models for manufacturing and distribution, then published views and stored procedures for the application.',
      'Scheduled loads kept the data current, and a pipeline monitoring screen let administrators inspect run status from the same application.',
    ],
    delivery: [
      {
        title: 'Inventory and procurement',
        text: [
          'We modeled inventory movements, batch-level transactions, daily stock snapshots, and purchase order tracking.',
          'Manufacturing reporting also used bill-of-materials data.',
          'The inventory and procurement pipelines ran twice a day.',
        ],
      },
      {
        title: 'Financial statements',
        text: [
          'We loaded the chart of accounts, opening balances, and journal entries.',
          'SQL account mappings grouped accounts into statement lines, and stored procedures returned summaries, account-level detail, and the underlying journal activity.',
          'We started with manufacturing and then built the corresponding distribution reports.',
        ],
      },
      {
        title: 'Reporting and monitoring',
        text: [
          'We published reports through an internal FastAPI application.',
          'Sales users could review daily trends and calendar patterns.',
          'Finance users could switch between yearly and monthly views and drill into account and journal detail.',
          'Administrators could see Azure Data Factory run status from the app.',
        ],
      },
    ],
    challenges: [
      {
        title: 'Finding changes across two SAP company databases',
        text: [
          'Manufacturing loads used the source activity date to select changes.',
          'Distribution used a query for documents changed in a rolling two-day window.',
          'This let scheduled loads process updated documents without reloading all inventory history.',
        ],
      },
      {
        title: 'Keeping reporting totals traceable',
        text: [
          'We combined opening balances with posted activity and checked that journal debits and credits balanced.',
          'The report drill-down let finance trace statement lines back to their accounts and entries.',
          'Cash-flow entries without a confirmed classification were surfaced as an unclassified difference for review.',
        ],
      },
      {
        title: 'Fixing a slow monthly drill-down',
        text: [
          'Distribution’s detailed monthly profit and loss view failed while the yearly view loaded.',
          'We traced the failure to an expensive SQL execution plan and corrected it.',
          'The detailed monthly view then loaded successfully.',
        ],
      },
    ],
    tools: ['SAP Business One', 'SQL Server', 'Azure Data Factory', 'Azure SQL', 'T-SQL', 'Python / FastAPI', 'Azure Container Apps'],
    pipeline: [
      { title: 'SAP Business One', detail: 'On-premises manufacturing and distribution data', logo: 'SAP.png' },
      { title: 'Azure Data Factory', detail: 'Scheduled extraction and refresh', logo: 'adf.png' },
      { title: 'Azure SQL', detail: 'Reporting tables, views, and stored procedures', logo: 'sql.png' },
      { title: 'Reporting app', detail: 'Business reports, drill-downs, and pipeline monitoring', logo: 'WebReports.png' },
    ],
    results: [
      { area: 'Finance', delivered: 'Profit and loss, balance sheet, and cash flow reports for both businesses', use: 'Drill from a statement line into accounts and source journal entries.' },
      { area: 'Inventory and procurement', delivered: 'Inventory movements, batch activity, stock snapshots, and purchase order tracking', use: 'Review stock and open orders using data refreshed twice daily.' },
      { area: 'Sales and production', delivered: 'A shared reporting layer fed by SAP', use: 'Review sales trends and build production reporting with fewer manual exports.' },
      { area: 'Administration', delivered: 'Azure Data Factory run status inside the reporting app', use: 'Check whether scheduled refreshes succeeded and identify failed runs.' },
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
    title: 'Building an Internal Audit & Control Application',
    summary: 'We planned, designed, and built an in-house web application for a food-industry business operating across four countries and more than ten facilities. It brought audits, incident reporting, and daily ERP movement monitoring into one workflow.',
    client: 'The internal control department hired multiple auditors and needed a consistent way to conduct recurring audits across facilities. The application put the operating SOP into practice through standardized templates, evidence capture, action ownership, and closure tracking.',
    clientTitle: 'Internal control across multiple countries and facilities',
    facts: [
      ['Countries', '4'],
      ['Facilities', '10+'],
    ],
    problem: [
      'Auditors needed repeatable audit templates across locations and a central repository for images and supporting evidence.',
      'Internal teams needed to raise nonconformities at the point of discovery and track corrective actions to closure.',
      'The control team needed daily visibility of ERP movements to flag issues promptly.',
    ],
    plan: [
      'We mapped the roles for auditors, report users, incident users, action owners, and management.',
      'We translated the SOP into audit templates, evidence requirements, assignment and escalation steps, and status tracking.',
    ],
    solution: [
      'We built a web application covering audit creation, assignment, execution, and closure, with 6M and operational audits among the supported types.',
      'The application connected findings and incidents to evidence and corrective actions. Email and WhatsApp integrations made assignments and updates more visible.',
    ],
    pipelineTitle: 'From audit assignment to corrective action closure',
    pipelineLabel: 'Workflow',
    pipeline: [
      { title: 'Create and assign', detail: 'Select an audit template, facility, and auditor.', logo: 'word.png' },
      { title: 'Conduct and capture', detail: 'Record findings, images, and supporting evidence.', logo: 'WebReports.png' },
      { title: 'Assign corrective action', detail: 'Route incidents to the appropriate stakeholder and send updates.', logo: 'WhatsApp.png' },
      { title: 'Track and close', detail: 'Review corrective actions and monitor recurring findings.', logo: 'pdf.png' },
    ],
    delivery: [
      { title: '6M audits', text: 'Use a structured checklist to review people, machines, materials, methods, measurement, and the operating environment. Retain the finding, photos, and supporting records against the audit assignment.' },
      { title: 'Operational audits', text: 'Create and assign site-level checklists for adherence to the operating SOP. Review process handoffs, records, and controls using a common audit format across facilities.' },
      { title: 'Incidents and corrective actions', text: 'Raise an incident where the issue occurs, assign it to the appropriate stakeholder, and track the corrective action from creation to closure. Keep the original evidence linked to the finding so the closure can be reviewed against what was reported.' },
      { title: 'Daily ERP movement monitoring', text: 'Review daily movements and flag exceptions promptly so the control team can investigate.' },
      { title: 'Management reporting', text: 'Review findings, closure, and repeat nonconformities over time. Individual and department-head KPI attribution was identified as a future extension.' },
    ],
    challengesTitle: 'Examples of nonconformities by team',
    traceabilityTitle: 'From audit evidence to corrective action',
    challenges: [
      { title: 'Production', text: 'Example checks include missing pre-start verification, incomplete batch records, or measurement checks without supporting evidence. Attach the relevant record or photo and route the finding to the production owner.' },
      { title: 'Warehousing', text: 'Example checks include a stock quantity or location mismatch, missing lot identification, or a movement that was recorded on the floor but is absent from ERP. Record the item and location and assign the warehouse team to investigate.' },
      { title: 'Logistics', text: 'Example checks include mismatched dispatch quantities, incomplete dispatch documentation, or a transfer that has been issued but remains unconfirmed at the destination. Route the exception to the appropriate dispatch or receiving owner.' },
    ],
    traceability: [
      ['Recurring audits across facilities', '6M and operational audit templates', 'Assign the appropriate checklist and retain evidence against the audit.'],
      ['An issue found during an audit or on the floor', 'Incident record and supporting evidence', 'Give the relevant production, warehouse, or logistics owner a finding they can act on.'],
      ['Daily ERP movements', 'Flagged movement for review', 'Give the control team a starting point for checking the source transaction.'],
      ['Corrective action and closure status', 'Linked finding and action history', 'Check whether the issue was addressed and monitor recurrence.'],
    ],
    tools: ['Web application', 'Audit templates', 'Evidence repository', 'ERP movement monitoring', 'WhatsApp', 'Email'],
    results: [
      { area: 'Audit and control', delivered: 'Standardized audit execution and evidence capture', use: 'Recorded three times as many nonconformities.' },
      { area: 'Action owners', delivered: 'Assignment and end-to-end corrective action tracking', use: 'Corrective action completion reached 100%.' },
      { area: 'Management', delivered: 'Longitudinal visibility of findings and recurrence', use: 'Repeat nonconformities fell by 90%.' },
      { area: 'Internal teams', delivered: 'WhatsApp and email notifications', use: 'Improved visibility of assignments and updates.' },
    ],
  },
]

export function getCaseStudy(slug) {
  return caseStudies.find((study) => study.slug === slug)
}

const serviceCaseStudyMap = [
  { serviceId: 'business-analysis-strategy', slug: 'three-brand-profitability-and-channel-strategy', published: true },
  { serviceId: 'operations-sops-audit', slug: 'operational-audit-control-roadmap', published: true },
  { serviceId: 'azure-data-erp-reporting', slug: 'sap-b1-to-azure-data-warehouse', published: true },
  { serviceId: 'custom-business-applications', slug: 'incident-observation-management-app', published: true },
  { serviceId: 'enterprise-ai-agents', slug: 'sequence-bi-governed-erp-reporting', published: true },
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
