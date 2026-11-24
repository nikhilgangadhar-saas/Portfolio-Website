import { Link, useParams } from 'react-router-dom'
import AssetLogo from '../components/ui/AssetLogo'
import Button from '../components/ui/Button'
import { getCaseStudy, serviceCaseStudies } from '../data/caseStudies'

const panelClass = 'min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7'
const headingClass = 'text-xl font-bold tracking-tight text-slate-950 sm:text-2xl'
const bodyClass = 'text-base leading-7 text-slate-700'

export default function CaseStudyDetail() {
  const { caseStudySlug } = useParams()
  const study = getCaseStudy(caseStudySlug)
  const service = serviceCaseStudies.find(({ href }) => href === `/case-studies/${caseStudySlug}`)

  if (!study) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-20">
        <h1 className="text-4xl font-extrabold text-slate-950">
          Case study not found
        </h1>
        <Link to="/case-studies" className="mt-6 inline-block text-blue-600">
          Back to case studies
        </Link>
      </section>
    )
  }

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-premium-grid opacity-70" />
        <div className="motion-blob-one absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 md:py-16">
          <Link
            to="/case-studies"
            className="mb-6 inline-block text-sm font-semibold text-blue-300 hover:text-blue-200"
          >
            ← Back to case studies
          </Link>

          <div className="max-w-4xl">
            <div className="mb-4 inline-flex rounded-full border border-blue-300/25 bg-blue-400/10 px-4 py-2 text-sm font-bold text-blue-200">
              {study.tag}
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
              {study.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {study.summary}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact">Discuss similar work</Button>
              {service && (
                <Button to={service.serviceHref} variant="glass">View {service.focus} service</Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-slate-50">
        <div className="mx-auto max-w-7xl space-y-6 px-5 py-10 sm:px-8 sm:py-14">
          <div className={`grid gap-6 ${study.plan ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
            <CaseBlock title={study.plan ? "What we found" : "Business problem"} text={study.problem} />
            {study.plan && <CaseBlock title="How we planned the work" text={study.plan} />}
            <CaseBlock title="What we built" text={study.solution} />
          </div>

          {study.pipeline && <PipelineDiagram stages={study.pipeline} />}
          {study.delivery && <CaseSection title="What we delivered" entries={study.delivery} />}
          {study.challenges && <CaseSection title="Challenges and how we handled them" entries={study.challenges} />}

          {study.results && <ResultsTable rows={study.results} />}

          <div className={`grid gap-6 ${study.impact ? 'lg:grid-cols-[0.8fr_1.2fr]' : ''}`}>
            <section className={panelClass}>
              <h2 className={headingClass}>Tools used</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {study.tools.map(tool => (
                  <li key={tool} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
                    {tool}
                  </li>
                ))}
              </ul>
            </section>

            {study.impact && (
              <section className={panelClass}>
                <h2 className={headingClass}>Results</h2>
                <ul className={`mt-4 list-disc space-y-2 pl-5 marker:text-blue-600 ${bodyClass}`}>
                  {study.impact.map(item => <li key={item}>{item}</li>)}
                </ul>
              </section>
            )}
          </div>

          <div className="rounded-2xl bg-slate-950 p-5 text-white sm:p-7">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  Want to build something similar?
                </h2>
                <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                  Tell us what your team needs to improve and how you work today.
                </p>
              </div>

              <Button to="/contact">Discuss a project</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function CaseBlock({ title, text }) {
  return (
    <section className={panelClass}>
      <h2 className={headingClass}>{title}</h2>
      <p className={`mt-3 ${bodyClass}`}>{text}</p>
    </section>
  )
}

function CaseSection({ title, entries }) {
  return (
    <section className={panelClass}>
      <h2 className={headingClass}>{title}</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {entries.map(({ title, text }) => (
          <div key={title} className="border-t border-blue-100 pt-4">
            <h3 className="font-semibold text-slate-950">{title}</h3>
            <p className="mt-2 leading-7 text-slate-700">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function PipelineDiagram({ stages }) {
  return (
    <figure className={panelClass}>
      <figcaption><h2 className={headingClass}>How data reaches the reports</h2></figcaption>
      <ol className="mt-6 grid gap-8 lg:grid-cols-4">
        {stages.map(({ title, detail, logo }, index) => (
          <li key={title} className="relative min-w-0 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
            <div className="mb-4 grid size-11 place-items-center rounded-lg border border-blue-100 bg-white p-2">
              <AssetLogo file={logo} className="size-full object-contain" />
            </div>
            <h3 className="font-semibold text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">{detail}</p>
            {index < stages.length - 1 && (
              <span aria-hidden="true" className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-2xl leading-8 text-blue-700 lg:top-1/2 lg:right-0 lg:bottom-auto lg:left-auto lg:translate-x-[calc(100%+0.25rem)] lg:-translate-y-1/2 lg:-rotate-90">↓</span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  )
}

function ResultsTable({ rows }) {
  return (
    <section aria-labelledby="case-study-results" className={panelClass}>
      <h2 id="case-study-results" className={headingClass}>Results by team</h2>
      <table aria-labelledby="case-study-results" className="mt-5 w-full table-fixed wrap-break-word border-collapse text-left text-xs leading-5 text-slate-700 sm:text-sm sm:leading-6">
        <colgroup>
          <col className="w-[26%] sm:w-1/5" />
          <col className="w-[37%] sm:w-2/5" />
          <col className="w-[37%] sm:w-2/5" />
        </colgroup>
        <thead className="bg-blue-50 text-slate-950">
          <tr>
            {['Team', 'What we delivered', 'How they use it'].map(label => (
              <th key={label} scope="col" className="px-2 py-3 sm:px-4">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ area, delivered, use }) => (
            <tr key={area} className="border-b border-slate-200 align-top even:bg-slate-50 last:border-0">
              <th scope="row" className="wrap-break-word px-2 py-3 font-semibold text-slate-950 sm:px-4">{area}</th>
              <td className="px-2 py-3 sm:px-4">{delivered}</td>
              <td className="px-2 py-3 sm:px-4">{use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
