import './azure-reporting-pitch.css'

export default function OperationsSectionNav({ sections, wide = false }) {
  return (
    <nav aria-label="On this page" className="azure-service-nav border-b border-slate-200 px-5 py-3 sm:px-8">
      <ul className={`mx-auto flex flex-wrap gap-x-2 gap-y-1 ${wide ? 'max-w-7xl' : 'max-w-6xl'}`}>
        {sections.map(([id, label]) => (
          <li key={id}>
            <a href={'#' + id} className="block rounded-full px-3 py-2 text-sm font-semibold text-slate-700 focus-visible:outline-2 focus-visible:outline-blue-700">{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
