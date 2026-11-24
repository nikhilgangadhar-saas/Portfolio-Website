import { Link, useParams } from 'react-router-dom'
import AssetLogo from '../components/ui/AssetLogo'
import Button from '../components/ui/Button'
import { getCaseStudy, serviceCaseStudies } from '../data/caseStudies'
import './case-study-detail.css'

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
    <div className={study.pipeline ? "azure-case-study" : undefined}>
      <section className="case-study-hero relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-premium-grid opacity-70" />
        <div className="motion-blob-one absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="motion-blob-two absolute right-0 bottom-0 h-96 w-96 rounded-full bg-emerald-400/15 blur-3xl" />

        <div className="case-study-intro relative mx-auto max-w-7xl px-5 py-20 md:py-24">
          <Link
            to="/case-studies"
            className="mb-5 inline-block text-sm font-semibold text-blue-300 hover:text-blue-200"
          >
            ← Back to Case Studies
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
              <Button to="/contact">Discuss Similar Work</Button>
              {service && (
                <Button to={service.serviceHref} variant="glass">View {service.focus} service</Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="case-study-body relative overflow-hidden bg-[#f4f7fb]">
        <div className="absolute inset-0 bg-soft-grid opacity-70" />
        <div className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl" />
        <div className="absolute right-0 bottom-40 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl" />

        <div className="case-study-content relative mx-auto max-w-7xl px-5 py-16">
          <div className={`case-study-overview grid gap-6 ${study.plan ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
            <CaseBlock title={study.plan ? "What we found" : "Business problem"} text={study.problem} />
            {study.plan && <CaseBlock title="How we planned the work" text={study.plan} />}
            <CaseBlock title="What we built" text={study.solution} />
          </div>

          {study.pipeline && <PipelineDiagram stages={study.pipeline} />}
          {study.delivery && <CaseSection title="What we delivered" entries={study.delivery} />}
          {study.challenges && <CaseSection title="Challenges and how we handled them" entries={study.challenges} />}

          {study.results && <ResultsTable rows={study.results} />}

          <div className={`case-study-tools mt-8 grid gap-6 ${study.impact ? "lg:grid-cols-[0.8fr_1.2fr]" : ""}`}>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
              <h2 className="case-study-heading text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Tools Used
              </h2>

              <div className="mt-5 flex flex-wrap gap-2">
                {study.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-slate-200 bg-[#f4f7fb] px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {study.impact && <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Results
              </div>

              <div className="mt-5 grid gap-3">
                {study.impact.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400" />
                    <div className="text-sm leading-6 text-slate-700">
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>}
          </div>

          <div className="case-study-cta mt-12 rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-900/20 md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-extrabold">
                  Want to build something similar?
                </h2>
                <p className="mt-4 max-w-2xl text-slate-300">
                  Tell us what your team needs to improve and how you work today.
                </p>
              </div>

              <Button to="/contact">Discuss a project</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CaseBlock({ title, text }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
      <h2 className="case-study-heading text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
        {title}
      </h2>
      <CaseCopy text={text} className="mt-5" />
    </div>
  )
}

function CaseCopy({ text, className }) {
  const copyClass = `${className} text-base leading-7 text-slate-700`

  if (!Array.isArray(text)) return <p className={copyClass}>{text}</p>

  return (
    <ul className={`${copyClass} list-disc space-y-2 pl-5 marker:text-blue-600`}>
      {text.map(point => <li key={point}>{point}</li>)}
    </ul>
  )
}

function CaseSection({ title, entries }) {
  return (
    <section className="case-study-section mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="case-study-heading text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {entries.map(({ title, text }) => (
          <div key={title} className="border-t border-slate-200 pt-4">
            <h3 className="font-semibold text-slate-950">{title}</h3>
            <CaseCopy text={text} className="mt-2" />
          </div>
        ))}
      </div>
    </section>
  )
}

function PipelineDiagram({ stages }) {
  return (
    <figure className="case-study-pipeline mt-8 rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
      <figcaption><h2 className="case-study-heading text-2xl font-bold tracking-tight">How data reaches the reports</h2></figcaption>
      <ol className="mt-6 grid gap-8 lg:grid-cols-4">
        {stages.map(({ title, detail, logo }, index) => (
          <li key={title} className="relative rounded-2xl border border-white/15 bg-slate-900 p-5">
            <div className="mb-4 grid size-11 place-items-center rounded-lg bg-white p-2">
              <AssetLogo file={logo} className="size-full object-contain" />
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
            {index < stages.length - 1 && (
              <span aria-hidden="true" className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-2xl leading-8 text-blue-300 lg:top-1/2 lg:right-0 lg:bottom-auto lg:left-auto lg:translate-x-[calc(100%+0.25rem)] lg:-translate-y-1/2 lg:-rotate-90">↓</span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  )
}

function ResultsTable({ rows }) {
  return (
    <section aria-labelledby="case-study-results" className="case-study-results mt-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
      <h2 id="case-study-results" className="case-study-heading text-2xl font-bold tracking-tight text-slate-950">Results by team</h2>
      <div className="case-study-table" role="region" aria-labelledby="case-study-results" tabIndex={0}>
        <table aria-labelledby="case-study-results" className="mt-5 w-full table-fixed border-collapse text-left text-xs leading-5 text-slate-700 sm:text-sm sm:leading-6">
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
              <tr key={area} className="border-b border-slate-200 align-top last:border-0">
                <th scope="row" className="wrap-break-word px-2 py-3 font-semibold text-slate-950 sm:px-4">{area}</th>
                <td className="px-2 py-3 sm:px-4">{delivered}</td>
                <td className="px-2 py-3 sm:px-4">{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
