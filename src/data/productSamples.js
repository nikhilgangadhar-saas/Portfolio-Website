export const productSamples = {
  "sop-control": [
    {
      "slug": "warehouse-sop-starter-pack",
      "name": "Warehouse SOP Starter Pack",
      "description": "Document the checks and handoffs for warehouse receiving.",
      "format": "DOCX",
      "file": "/downloads/warehouse-sop-starter-pack-sample.docx"
    },
    {
      "slug": "internal-audit-plan-checklist",
      "name": "Internal Audit Plan & Checklist Pack",
      "description": "Plan an audit and record evidence against each control.",
      "format": "DOCX",
      "file": "/downloads/internal-audit-plan-checklist-sample.docx"
    },
    {
      "slug": "approval-matrix-template",
      "name": "Approval Matrix Template",
      "description": "Define who can request, review, and approve operational decisions.",
      "format": "DOCX",
      "file": "/downloads/approval-matrix-template-sample.docx"
    }
  ],
  "excel-tools": [
    {
      "slug": "stock-reconciliation-template",
      "name": "Stock Count & Reconciliation Workbook",
      "description": "Compare book stock against a physical count and review variances.",
      "workflow": "Enter book stock and physical counts by SKU, warehouse, bin, and lot. Record recounts, review quantity and value variances, and assign an owner and disposition.",
      "requirements": "Microsoft Excel or a compatible XLSX editor, an ERP stock snapshot at the count cut-off, counts in matching units, and unit costs for valuation.",
      "sheets": [["Reconciliation", "Enter book quantities, first counts, and recounts. Review quantity and value differences, assign an owner, and record the next action."]],
      "format": "XLSX",
      "file": "/downloads/stock-reconciliation-template-sample.xlsx"
    },
    {
      "slug": "inventory-ageing-template",
      "name": "Inventory Ageing Workbook",
      "description": "Group inventory by days since receipt.",
      "workflow": "Break down stock value by days since receipt, then flag expired and soon-to-expire lots. Apply Excel’s Data Filter to the detail range to review a warehouse, SKU, or lot.",
      "requirements": "Microsoft Excel or a compatible XLSX editor, remaining quantity and receipt date by lot or receipt layer, unit cost in one currency, and expiry dates where applicable.",
      "sheets": [
        ["Start Here", "Review the setup instructions, required data, and workbook guide."],
        ["Inventory Master", "Maintain SKU descriptions, categories, units of measure, and expiry tracking requirements."],
        ["Stock Details", "Enter remaining stock by SKU, warehouse, and lot, including receipt date and unit cost."],
        ["Stock Ageing Report", "Review inventory value, weighted age, expiry exposure, and data quality exceptions."],
        ["PDF Report", "Export a formatted management summary from Excel."]
      ],
      "sampleLimit": "The sample contains illustrative data. It has 8 editable rows on Inventory Master and 12 on Stock Details. The report and PDF sheets are protected.",
      "fullLimit": "The full edition lets you load your own data into tables with 200 prepared SKU rows and 300 prepared stock detail rows. Reporting settings are editable.",
      "format": "XLSX",
      "file": "/downloads/inventory-ageing-template-sample.xlsx"
    },
    {
      "slug": "inventory-movement-workbook",
      "name": "Inventory Movement Workbook",
      "description": "Track receipts, issues, and warehouse transfers and reconcile closing stock.",
      "workflow": "Log movements by transaction reference, SKU, and warehouse. Select a SKU, warehouse, and date range to calculate inbound, outbound, net movement, and closing stock.",
      "requirements": "Microsoft Excel or a compatible XLSX editor, dated ERP movement records, and opening stock for the selected SKU and warehouse.",
      "sheets": [["Movement", "Log receipts, issues, and transfers. The same sheet calculates opening, inbound, outbound, net movement, and closing stock for your selection."]],
      "format": "XLSX",
      "file": "/downloads/inventory-movement-workbook-sample.xlsx"
    }
  ],
  "data-products": [
    {
      "slug": "sequencebi",
      "name": "SequenceBI",
      "description": "Review a sample KPI specification for management reporting.",
      "format": "DOCX",
      "file": "/downloads/sequencebi-sample.docx"
    },
    {
      "slug": "azure-erp-pipeline-setup",
      "name": "Azure Data Engineering & ERP Pipeline Setup",
      "description": "See a sample scope for moving ERP data into a reporting layer.",
      "format": "DOCX",
      "file": "/downloads/azure-erp-pipeline-setup-sample.docx"
    },
    {
      "slug": "whatsapp-reporting-alerts",
      "name": "WhatsApp Reporting & Alerts",
      "description": "See how a daily summary and exception alert can be specified.",
      "format": "DOCX",
      "file": "/downloads/whatsapp-reporting-alerts-sample.docx"
    }
  ],
  "small-apps": [
    {
      "slug": "hr-onboarding-learning-app",
      "name": "HR Onboarding & Learning App",
      "description": "Review a sample onboarding workflow and progress record.",
      "format": "DOCX",
      "file": "/downloads/hr-onboarding-learning-app-sample.docx"
    },
    {
      "slug": "audit-control-app",
      "name": "Audit & Control App",
      "description": "Review a sample finding, assignment, and closure workflow.",
      "format": "DOCX",
      "file": "/downloads/audit-control-app-sample.docx"
    }
  ]
}
