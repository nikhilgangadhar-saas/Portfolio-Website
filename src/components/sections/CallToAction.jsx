import Button from '../ui/Button'

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-premium-grid opacity-70" />
      <div className="motion-blob-one absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="motion-blob-two absolute right-0 bottom-0 h-96 w-96 rounded-full bg-emerald-400/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/20 backdrop-blur md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Need a practical system for a messy business problem?
              </h2>

              <p className="mt-4 max-w-2xl text-slate-300">
                Start with a focused advisory conversation or explore the
                product library for templates, tools, and business system ideas.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button to="/contact">Book Advisory</Button>
              <Button to="/products" variant="glass">
                View Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}