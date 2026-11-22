import { useEffect, useRef, useState } from 'react'

const teamMembers = [
  {
    name: 'Nikhil Gangadharappa',
    initials: 'NG',
    summary: 'Leads business control, data reporting, and application design.',
    role: 'Founder · Business Control & Data Products',
    intro:
      'Business data and internal control professional focused on SOPs, governance, reporting systems, warehouse control, and practical business applications.',
    focus: [
      'Business control and SOP design',
      'Data products and reporting automation',
      'SAP B1, SQL, Power BI, Azure data workflows',
      'Warehouse, SCM, inventory, and action tracking systems',
    ],
    skills: [
      ['Business Control', 'SOPs, audit actions, governance, approval workflows'],
      ['Data Products', 'SQL, Power BI, Excel tools, reporting models'],
      ['Operations', 'SCM, warehouse control, stock movement, inventory accuracy'],
      ['Implementation', 'React apps, Azure workflows, reporting automation'],
      ['Leadership', 'Board reporting, KPI design, cross-functional execution'],
    ],
    experience: [
      'Business Data Director working across data, reporting, control, and operational improvement.',
      'Built SAP B1 reporting models, Azure SQL reporting layers, and automated management reports.',
      'Designed internal control workflows, SOP governance, audit follow-up, and re-audit structures.',
    ],
    education: [
      'Business, data, and operational control experience across SME environments.',
      'Hands-on technical stack: SQL, Excel, Power BI, React, Azure, automation workflows.',
    ],
  },
  {
    name: 'Meghana Gangadhar',
    initials: 'MG',
    summary: 'Leads project planning, coordination, and delivery follow-up.',
    role: 'Project Manager · Delivery & Coordination',
    intro:
      'Project management professional supporting planning, coordination, documentation, follow-up, and delivery discipline across business and implementation work.',
    focus: [
      'Project planning and milestone tracking',
      'Stakeholder coordination and follow-up',
      'Documentation, action logs, and delivery support',
      'Client communication and implementation discipline',
    ],
    skills: [
      ['Project Planning', 'Scope, timelines, milestones, task breakdown'],
      ['Coordination', 'Stakeholders, follow-up, delivery tracking'],
      ['Documentation', 'Requirements, meeting notes, action logs'],
      ['Client Support', 'Communication, status updates, closure tracking'],
      ['Execution Support', 'Process tracking and implementation discipline'],
    ],
    experience: [
      'Supports structured delivery, documentation, and project coordination.',
      'Helps convert business requirements into clear action plans and follow-up routines.',
      'Focuses on keeping implementation work organized, visible, and accountable.',
    ],
    education: [
      'Project management, coordination, documentation, and client support experience.',
      'Practical delivery focus across business and operational work.',
    ],
  },
]

export default function Team() {
  const dialog = useRef(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (selected && !dialog.current.open) dialog.current.showModal()
  }, [selected])

  return (
    <section className="bg-slate-100 px-5 py-12 sm:px-8 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">Meet the team</h1>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {teamMembers.map((member) => (
            <article key={member.name} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-center shadow-sm">
              <div aria-hidden="true" className="grid aspect-[2/1] place-items-center bg-linear-to-br from-slate-800 to-slate-950">
                <span className="grid size-24 place-items-center rounded-full border border-white/20 bg-white/5 font-serif text-3xl text-slate-200">
                  {member.initials}
                </span>
              </div>
              <div className="flex flex-1 flex-col items-center px-5 py-6 sm:px-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-950">{member.name}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-700">{member.role}</p>
                <p className="mt-3 flex-1 text-base leading-6 text-slate-600">{member.summary}</p>
                <button
                  type="button"
                  aria-label={`View expertise for ${member.name}`}
                  aria-haspopup="dialog"
                  onClick={() => setSelected(member)}
                  className="mt-5 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  View expertise
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="team-profile-title"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
        className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-2xl overflow-auto rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-2xl backdrop:bg-slate-950/65 backdrop:backdrop-blur-sm"
      >
        {selected && (
          <div>
            <header className="flex items-start justify-between gap-4 bg-slate-950 p-5 text-white sm:p-6">
              <div>
                <h2 id="team-profile-title" className="text-2xl font-bold tracking-tight">{selected.name}</h2>
                <p className="mt-1 text-sm text-slate-300">{selected.role}</p>
              </div>
              <button type="button" aria-label="Close profile" onClick={() => dialog.current.close()} className="rounded-full border border-white/20 px-3 py-1 text-xl leading-none hover:bg-white/10">
                ×
              </button>
            </header>

            <div className="space-y-5 p-5 text-base leading-6 text-slate-700 sm:p-6">
              <p>{selected.intro}</p>
              <ProfileList title="Areas of focus" items={selected.focus} />
              <section>
                <h3 className="font-bold text-slate-950">Skills</h3>
                <dl className="mt-2 divide-y divide-slate-200 border-y border-slate-200">
                  {selected.skills.map(([area, strength]) => (
                    <div key={area} className="grid gap-1 py-2 sm:grid-cols-[9rem_1fr]">
                      <dt className="font-semibold text-slate-950">{area}</dt>
                      <dd>{strength}</dd>
                    </div>
                  ))}
                </dl>
              </section>
              <ProfileList title="Experience highlights" items={selected.experience} />
              <ProfileList title="Background" items={selected.education} />
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}

function ProfileList({ title, items }) {
  return (
    <section>
      <h3 className="font-bold text-slate-950">{title}</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  )
}
