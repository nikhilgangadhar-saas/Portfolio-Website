const auditDescription = 'Create, assign, and run audits. Raise incident reports, assign actions, and track follow-up.'

export const applications = [
  { id: 'people-review', name: 'HR - People Review', initials: 'HR', suffix: 'L&D', description: 'Onboarding and L&D solution.', tone: 'bg-linear-to-br from-[#315cff] to-[#132238] text-white' },
  { id: 'internal-audit', name: 'Internal Audit and Control', initials: 'IA', suffix: '&C', description: auditDescription, tone: 'bg-linear-to-br from-[#132238] via-[#132238] to-[#a12727] text-white' },
  { id: 'sequence-bi', name: 'Sequence BI', initials: 'SEQ', suffix: 'BI', description: 'A custom AI bot that connects to your curated database and uses retrieval-augmented generation (RAG) to answer business questions in your existing workflows. Answers are grounded in approved data and respect the access rules you define.', tone: 'bg-[linear-gradient(145deg,#240a15_5%,#641f37_39%,#a15b70_49%,#52172b_56%,#270a16_95%)] text-white' },
]
