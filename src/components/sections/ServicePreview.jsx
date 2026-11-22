import { useEffect, useRef } from 'react'
import Button from '../ui/Button'

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
  const carousel = useRef(null)
  const gesture = useRef(null)
  const suppressClick = useRef(false)

  useEffect(() => {
    const track = carousel.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const timer = window.setInterval(() => {
      if (reducedMotion.matches || document.hidden || track.matches(':hover, :focus-within') || gesture.current) return

      const step = track.children[1].offsetLeft - track.children[0].offsetLeft
      const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step, behavior: 'smooth' })
    }, 4200)

    return () => window.clearInterval(timer)
  }, [])

  function startDrag(event) {
    suppressClick.current = false
    if (!event.isPrimary || event.button !== 0) return
    gesture.current = {
      pointer: event.pointerId,
      x: event.clientX,
      left: event.currentTarget.scrollLeft,
    }
  }

  function drag(event) {
    const active = gesture.current
    if (!active || active.pointer !== event.pointerId || event.pointerType !== 'mouse') return
    const distance = event.clientX - active.x
    if (!suppressClick.current && Math.abs(distance) < 6) return

    const track = event.currentTarget
    if (!suppressClick.current) {
      suppressClick.current = true
      track.setPointerCapture(event.pointerId)
      track.dataset.dragging = 'true'
    }
    track.scrollLeft = active.left - distance
  }

  function endDrag(event) {
    if (gesture.current?.pointer !== event.pointerId) return
    gesture.current = null
    delete event.currentTarget.dataset.dragging
  }

  function preventDragClick(event) {
    if (suppressClick.current && event.detail !== 0) {
      event.preventDefault()
      event.stopPropagation()
    }
    suppressClick.current = false
  }

  return (
    <section aria-labelledby="home-services-title" className="relative overflow-hidden bg-[#f4f7fb]">
      <div className="absolute inset-0 bg-soft-grid opacity-70" />
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-12">
        <h2 id="home-services-title" className="text-3xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
          How we help
        </h2>

        <ul
          id="home-service-cards"
          ref={carousel}
          tabIndex={0}
          aria-label="Services. Swipe, drag, or use the arrow keys to browse."
          onPointerDown={startDrag}
          onPointerMove={drag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={endDrag}
          onPointerLeave={(event) => {
            if (!suppressClick.current) endDrag(event)
          }}
          onClickCapture={preventDragClick}
          onDragStart={(event) => event.preventDefault()}
          className="relative mt-6 grid cursor-grab snap-x snap-mandatory auto-cols-[minmax(0,1fr)] grid-flow-col gap-4 overflow-x-auto pb-2 select-none focus-visible:outline-2 focus-visible:outline-slate-500 data-[dragging=true]:cursor-grabbing data-[dragging=true]:snap-none md:auto-cols-[calc((100%-1rem)/2)] lg:auto-cols-[calc((100%-2rem)/3)]"
        >
          {services.map(({ title, description, focus }) => (
            <li key={title} className="group relative flex min-w-0 snap-start flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-extrabold tracking-tight text-slate-950">{title}</h3>
                <p className="mt-3 flex-1 text-base leading-6 text-slate-600">{description}</p>
                <p className="mt-4 border-t border-slate-200 pt-3 text-sm font-semibold leading-5 text-slate-700">{focus}</p>
              </div>
              <div className="px-5 pb-5 [@media(hover:hover)_and_(pointer:fine)]:pointer-events-none [@media(hover:hover)_and_(pointer:fine)]:absolute [@media(hover:hover)_and_(pointer:fine)]:inset-0 [@media(hover:hover)_and_(pointer:fine)]:grid [@media(hover:hover)_and_(pointer:fine)]:place-items-center [@media(hover:hover)_and_(pointer:fine)]:bg-slate-950/25 [@media(hover:hover)_and_(pointer:fine)]:p-0 [@media(hover:hover)_and_(pointer:fine)]:opacity-0 [@media(hover:hover)_and_(pointer:fine)]:backdrop-blur-sm [@media(hover:hover)_and_(pointer:fine)]:transition-opacity [@media(hover:hover)_and_(pointer:fine)]:group-focus-within:pointer-events-auto [@media(hover:hover)_and_(pointer:fine)]:group-focus-within:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover:pointer-events-auto [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100">
                  <Button to="/contact" variant="dark" className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                    Discuss a project
                  </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
