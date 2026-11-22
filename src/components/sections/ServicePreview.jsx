import { useRef, useState } from 'react'
import Button from '../ui/Button'

const services = [
  {
    title: 'Business Analysis & Strategy',
    description: 'We assess markets, customers, and competitors to help you decide which opportunities to pursue. We turn that research into a SWOT analysis, clear priorities, and a go-to-market plan.',
    focus: 'Market research · SWOT · Go-to-market',
    accent: 'bg-blue-600',
  },
  {
    title: 'Operations, SOPs & Audit',
    description: 'We map how work moves through your business, identify gaps in inventory controls and approvals, and document who owns each step. We build SOPs and audit plans your team can use to check that controls are working.',
    focus: 'Inventory controls · SOPs · Internal audit',
    accent: 'bg-teal-600',
  },
  {
    title: 'Azure Data & ERP Reporting',
    description: 'We connect ERP data to Azure databases and pipelines, then build reporting for finance, sales, inventory, and operations. We can deliver reports and alerts in dashboards, WhatsApp, Microsoft Teams, or Slack.',
    focus: 'Azure databases · Data pipelines · Reporting',
    accent: 'bg-indigo-600',
  },
  {
    title: 'Custom Business Applications',
    description: 'We build and deploy applications around the way your teams work. Examples include HR onboarding, learning and development, audit action tracking, and approval workflows.',
    focus: 'HR onboarding · Learning & development · Audit',
    accent: 'bg-violet-600',
  },
  {
    title: 'Enterprise AI Agents',
    description: 'We build AI agents that use ERP data to answer business questions, flag exceptions, and guide teams through defined workflows. We design them around a specific use case and the data each team is allowed to access.',
    focus: 'ERP data · Exception monitoring · Workflow support',
    accent: 'bg-cyan-700',
  },
]

export default function ServicePreview() {
  const carousel = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  function move(direction) {
    const track = carousel.current
    const firstCard = track.children[0]
    const secondCard = track.children[1]
    const step = secondCard.offsetLeft - firstCard.offsetLeft

    track.scrollBy({ left: direction * step })
  }

  function updateEdges(event) {
    const { scrollLeft, scrollWidth, clientWidth } = event.currentTarget
    const start = scrollLeft <= 1
    const end = scrollWidth - clientWidth - scrollLeft <= 1

    setEdges((previous) => (
      previous.start === start && previous.end === end ? previous : { start, end }
    ))
  }

  const controlClass = 'rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-blue-500 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-600 disabled:cursor-default disabled:opacity-40'

  return (
    <section aria-labelledby="home-services-title" className="relative overflow-hidden bg-[#f4f7fb]">
      <div className="absolute inset-0 bg-soft-grid opacity-70" />
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="home-services-title" className="text-3xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            How we help
          </h2>
          <div className="flex gap-2">
            <button type="button" aria-controls="home-service-cards" disabled={edges.start} onClick={() => move(-1)} className={controlClass}>
              Previous
            </button>
            <button type="button" aria-controls="home-service-cards" disabled={edges.end} onClick={() => move(1)} className={controlClass}>
              Next
            </button>
          </div>
        </div>

        <ul
          id="home-service-cards"
          ref={carousel}
          onScroll={updateEdges}
          className="relative mt-8 grid snap-x snap-mandatory auto-cols-[minmax(0,1fr)] grid-flow-col gap-4 overflow-x-auto scroll-smooth pb-4 motion-reduce:scroll-auto md:auto-cols-[calc((100%-1rem)/2)] lg:auto-cols-[calc((100%-2rem)/3)]"
        >
          {services.map(({ title, description, focus, accent }) => (
            <li key={title} className="group flex min-w-0 snap-start flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-300 focus-within:border-blue-300">
              <div aria-hidden="true" className={`h-1.5 ${accent}`} />
              <div className="flex flex-1 flex-col p-5 sm:p-7">
                <h3 className="text-xl font-extrabold tracking-tight text-slate-950">{title}</h3>
                <p className="mt-4 flex-1 text-base leading-7 text-slate-600">{description}</p>
                <p className="mt-6 border-t border-slate-200 pt-4 text-sm font-semibold leading-6 text-slate-700">{focus}</p>
                <div className="mt-4 transition-opacity [@media(hover:hover)_and_(pointer:fine)]:opacity-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:group-focus-within:opacity-100">
                  <Button to="/contact" variant="dark" className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                    Discuss a project
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
