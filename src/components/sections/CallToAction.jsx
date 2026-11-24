import Button from '../ui/Button'

export default function CallToAction() {
  return (
    <section aria-labelledby="home-contact-title" className="bg-slate-100 text-slate-950">
      <div className="w-full px-5 py-10 sm:px-8 lg:py-12">
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 id="home-contact-title" className="text-3xl font-extrabold tracking-tight md:text-4xl">
              What can we help you improve?
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-6 text-slate-700">
              Tell us what you’re working on and where you need support. We’ll get back to you to discuss the next step.
            </p>
          </div>

          <Button to="/contact" variant="dark" className="shrink-0">Discuss a project</Button>
        </div>
      </div>
    </section>
  )
}
