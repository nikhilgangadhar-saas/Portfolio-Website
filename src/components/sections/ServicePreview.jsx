import { useEffect, useRef, useState } from 'react'
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
  const dialog = useRef(null)
  const [selectedService, setSelectedService] = useState(null)

  useEffect(() => {
    const track = carousel.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame
    let lastTime
    let remainder = 0

    function advance(time) {
      const elapsed = Math.min(time - (lastTime ?? time), 40)
      lastTime = time

      if (!reducedMotion.matches && !document.hidden && !dialog.current?.open &&
          !track.matches(':hover, :focus-within') && !gesture.current) {
        const loopWidth = track.children[services.length].offsetLeft
        let position = track.scrollLeft
        if (position >= loopWidth * 2) position -= loopWidth
        if (position < loopWidth) position += loopWidth

        remainder += elapsed * 0.036
        const distance = Math.floor(remainder)
        remainder -= distance
        track.scrollLeft = position + distance
      }

      frame = window.requestAnimationFrame(advance)
    }

    frame = window.requestAnimationFrame(advance)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (selectedService && !dialog.current.open) dialog.current.showModal()
  }, [selectedService])

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
    }
    track.scrollLeft = active.left - distance
  }

  function endDrag(event) {
    if (gesture.current?.pointer !== event.pointerId) return
    gesture.current = null
  }

  function preventDragClick(event) {
    if (suppressClick.current && event.detail !== 0) {
      event.preventDefault()
      event.stopPropagation()
    }
    suppressClick.current = false
  }

  return (
    <section aria-labelledby="home-services-title" className="bg-[#f4f7fb]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
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
          className="relative mt-5 grid cursor-grab auto-cols-[88%] grid-flow-col gap-3 overflow-x-auto overscroll-x-contain select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-slate-500 active:cursor-grabbing sm:auto-cols-[46%] lg:auto-cols-[31%]"
        >
          {[...services, ...services, ...services].map((service, index) => {
            const { title, description, focus } = service
            const duplicate = index >= services.length
            return (
              <li key={index} aria-hidden={duplicate || undefined} className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 text-white transition-colors hover:border-slate-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-slate-300">
                <header className="flex min-h-24 items-center border-b border-white/15 bg-slate-800 px-5 py-4">
                  <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                </header>
                <p className="flex-1 px-5 py-4 text-base leading-6 text-slate-300">{description}</p>
                <footer className="flex items-center justify-between gap-3 border-t border-white/15 bg-slate-950 px-5 py-3">
                  <span className="text-sm font-medium text-slate-300">{focus}</span>
                  <span className="shrink-0 text-sm font-semibold text-white">Details</span>
                </footer>
                <button
                  type="button"
                  tabIndex={duplicate ? -1 : 0}
                  aria-label={`View details for ${title}`}
                  aria-haspopup="dialog"
                  onClick={() => setSelectedService(service)}
                  className="absolute inset-0 cursor-pointer"
                />
              </li>
            )
          })}
        </ul>
        <dialog
          ref={dialog}
          aria-labelledby="service-dialog-title"
          onClose={() => setSelectedService(null)}
          className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-lg overflow-auto rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-2xl backdrop:bg-slate-950/65 backdrop:backdrop-blur-sm"
        >
          {selectedService && (
            <>
              <header className="flex items-start justify-between gap-4 border-b border-white/15 bg-slate-900 p-5 text-white sm:p-6">
                <h2 id="service-dialog-title" className="text-2xl font-semibold tracking-tight">{selectedService.title}</h2>
                <form method="dialog">
                  <button type="submit" className="rounded-full border border-white/30 px-3 py-1.5 text-sm font-semibold hover:bg-white/15">Close</button>
                </form>
              </header>
              <div className="space-y-4 p-5 sm:p-6">
                <p className="text-base leading-7 text-slate-700">{selectedService.description}</p>
                <p className="text-sm font-semibold text-slate-900">{selectedService.focus}</p>
              </div>
              <footer className="border-t border-slate-200 bg-slate-50 p-5 sm:px-6">
                <Button to="/contact" variant="dark" className="focus-visible:outline-2 focus-visible:outline-offset-2">
                  Discuss a project
                </Button>
              </footer>
            </>
          )}
        </dialog>
      </div>
    </section>
  )
}
