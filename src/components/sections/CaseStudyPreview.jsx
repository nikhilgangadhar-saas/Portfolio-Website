import Button from '../ui/Button'
import Card from '../ui/Card'
import SectionHeader from '../ui/SectionHeader'
import { caseStudies } from '../../data/caseStudies'

export default function CaseStudyPreview() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7fb]">
      <div className="absolute inset-0 bg-soft-grid opacity-70" />
      <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-amber-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <SectionHeader
          title="Built from real operational problems."
          subtitle="The work combines business understanding, control design, data engineering, and practical application development."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <Card key={study.title}>
              <div className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                {study.tag}
              </div>

              <h3 className="text-xl font-extrabold text-slate-950">
                {study.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {study.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <Button to="/case-studies">View Case Studies</Button>
        </div>
      </div>
    </section>
  )
}