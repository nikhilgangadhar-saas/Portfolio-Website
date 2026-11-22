import { Link } from 'react-router-dom'
import { homepageMenus } from '../../data/headerNav'

export default function HeaderMenuLinks({ menu, onNavigate, showDescriptions = false }) {
  const { overview, items } = homepageMenus[menu]

  return (
    <>
      <Link
        to={overview.href}
        onClick={onNavigate}
        className="mb-1.5 block rounded-lg bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
      >
        {overview.title}
      </Link>
      <ul className="divide-y divide-slate-200/70 border-t border-slate-200 pt-1">
        {items.map(({ id, href, title, focus, examples }) => {
          const description = focus || examples?.[0]
          return (
            <li key={id}>
              <Link
                to={href ?? `/#${id}`}
                onClick={onNavigate}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-200/60 focus-visible:bg-slate-200/60"
              >
                {title}
                {showDescriptions && description && (
                  <span className="mt-1 block font-normal leading-5 text-slate-600">{description}</span>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
