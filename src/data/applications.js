const auditDescription = 'Create, assign, and run audits. Raise incident reports, assign actions, and track follow-up.'

export const applications = [
  { id: 'people-review', name: 'HR - People Review', initials: 'HR', suffix: 'L&D', description: 'Onboarding and L&D solution.', tone: 'bg-linear-to-br from-[#315cff] to-[#132238] text-white' },
  { id: 'internal-audit', name: 'Internal Audit and Control', initials: 'IA', suffix: '&C', description: auditDescription, tone: 'bg-linear-to-br from-[#132238] via-[#132238] to-[#a12727] text-white' },
  { id: 'sequence-bi', name: 'Sequence BI', initials: 'SEQ', suffix: 'BI', description: 'A custom AI bot that uses RAG to answer questions from your curated database.', tone: 'bg-[linear-gradient(145deg,#240a15_5%,#641f37_39%,#a15b70_49%,#52172b_56%,#270a16_95%)] text-white' },
]
