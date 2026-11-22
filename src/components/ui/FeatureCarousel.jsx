import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Button from './Button'

export default function FeatureCarousel({ id, heading, items, actionLabel, allLink, allLinkLabel = 'View all case studies', light = false }) {
  const carousel = useRef(null)
  const gesture = useRef(null)
  const suppressClick = useRef(false)
  const dialog = useRef(null)
  const resumedAfterDialog = useRef(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const location = useLocation()

  useEffect(() => {
    const item = location.hash && items.find((entry) => entry.id && location.hash === `#${entry.id}`)
    if (item) setSelectedItem(item)
  }, [items, location])

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
          (resumedAfterDialog.current || !track.matches(':focus-visible, :has(:focus-visible)')) && !gesture.current) {
        const loopWidth = track.children[items.length].offsetLeft
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
  }, [items.length])

  useEffect(() => {
    if (selectedItem && !dialog.current.open) dialog.current.showModal()
  }, [selectedItem])

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
    <section aria-labelledby={`${id}-title`} className="bg-[#f4f7fb]">
      <div className="mx-auto w-full max-w-[100rem] px-5 py-8 sm:px-8 lg:py-10">
        <h2 id={`${id}-title`} className="text-3xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
          {heading}
        </h2>

        <ul
          id={`${id}-cards`}
          ref={carousel}
          tabIndex={0}
          onKeyDown={() => { resumedAfterDialog.current = false }}
          aria-label={`${heading}. Swipe, drag, or use the arrow keys to browse.`}
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
          {[...items, ...items, ...items, ...items].map((service, index) => {
            const { title, description, focus } = service
            const duplicate = index >= items.length
            return (
              <li id={duplicate ? undefined : service.id} key={index} aria-hidden={duplicate || undefined} className={`relative flex min-w-0 flex-col overflow-hidden rounded-2xl border transition-colors hover:border-slate-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-slate-500 ${light ? "border-slate-300 bg-white text-slate-950" : "border-slate-700 bg-slate-900 text-white"}`}>
                <header className={`flex min-h-24 items-center justify-center border-b px-5 py-4 text-center ${light ? "border-slate-200 bg-slate-100" : "border-white/15 bg-slate-800"}`}>
                  <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                </header>
                <p className={`flex-1 px-5 py-4 text-base leading-6 ${light ? "text-slate-700" : "text-slate-300"}`}>{description}</p>
                <footer className={`border-t px-5 py-3 text-center ${light ? "border-slate-200 bg-slate-50 text-slate-700" : "border-white/15 bg-slate-950 text-slate-300"}`}>
                  <span className="text-sm font-medium">{focus}</span>
                </footer>
                <button
                  type="button"
                  tabIndex={duplicate ? -1 : 0}
                  aria-label={`View details for ${title}`}
                  aria-haspopup="dialog"
                  onClick={() => setSelectedItem(service)}
                  className="absolute inset-0 cursor-pointer"
                />
              </li>
            )
          })}
        </ul>
        <dialog
          ref={dialog}
          aria-labelledby={`${id}-dialog-title`}
          onClose={() => {
            resumedAfterDialog.current = true
            setSelectedItem(null)
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) event.currentTarget.close()
          }}
          className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-lg overflow-auto rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-2xl backdrop:bg-slate-950/65 backdrop:backdrop-blur-sm"
        >
          {selectedItem && (
            <div>
              <header className="text-center border-b border-white/15 bg-slate-900 p-5 text-white sm:p-6">
                <h2 id={`${id}-dialog-title`} className="text-2xl font-semibold tracking-tight">{selectedItem.title}</h2>
              </header>
              <div className="space-y-4 p-5 sm:p-6">
                <p className="text-base leading-7 text-slate-700">{selectedItem.details ?? selectedItem.description}</p>
                <p className="text-sm font-semibold text-slate-900">{selectedItem.focus}</p>
              </div>
              <footer className="border-t border-slate-200 bg-slate-50 p-5 text-center sm:px-6">
                <Button to={selectedItem.href ?? "/contact"} variant="dark" className="focus-visible:outline-2 focus-visible:outline-offset-2">
                  {actionLabel}
                </Button>
              </footer>
            </div>
          )}
        </dialog>
        {allLink && (
          <div className="mt-5 flex justify-center">
            <Button to={allLink} variant="secondary">{allLinkLabel}</Button>
          </div>
        )}
      </div>
    </section>
  )
}
