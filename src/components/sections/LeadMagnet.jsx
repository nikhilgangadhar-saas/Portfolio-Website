import Button from '../ui/Button'

export default function LeadMagnet() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7fb]">
      <div className="absolute inset-0 bg-soft-grid opacity-70" />
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Free Resource
              </div>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
                Start with a practical business control checklist.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                Use this as a simple starting point to review SOPs, inventory
                controls, reporting gaps, and management visibility.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#f4f7fb] p-6">
              <h3 className="text-xl font-extrabold text-slate-950">
                SME Control Starter Checklist
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                A simple checklist for SOPs, warehouse controls, dashboards,
                action tracking, and approval workflows.
              </p>

              <div className="mt-6">
                <Button to="/contact">Request Free Checklist</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}