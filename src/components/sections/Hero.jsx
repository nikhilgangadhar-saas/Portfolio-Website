import Button from '../ui/Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-premium-grid opacity-80" />

      <div className="motion-blob-one absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-500/25 blur-3xl" />
      <div className="motion-blob-two absolute -right-28 top-32 h-96 w-96 rounded-full bg-emerald-400/18 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl" />

      <div className="absolute left-[8%] top-[18%] hidden h-20 w-20 rounded-full border border-blue-300/20 md:block">
        <div className="motion-orbit h-3 w-3 rounded-full bg-blue-300 shadow-lg shadow-blue-300/40" />
      </div>

      <div className="absolute bottom-[14%] right-[10%] hidden h-24 w-24 rounded-full border border-emerald-300/20 md:block">
        <div className="motion-orbit h-3 w-3 rounded-full bg-emerald-300 shadow-lg shadow-emerald-300/40" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[100rem] gap-10 px-5 py-14 sm:px-8 lg:gap-12 lg:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Business advisory, operational improvement, and technology implementation
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            We help growing businesses decide where to focus, improve how they operate,
            and build the systems to support that work.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/contact">Discuss a project</Button>
            <Button to="/case-studies" variant="glass">
              View case studies
            </Button>
          </div>
        </div>

        <div className="relative">
          <FloatingCard
            className="-left-3 top-8 hidden md:block motion-float-one"
            title="SOP Compliance"
            value="92%"
            tone="emerald"
          />

          <FloatingCard
            className="right-0 top-0 hidden md:block motion-float-two"
            title="Pending Actions"
            value="14"
            tone="amber"
          />

          <FloatingCard
            className="-bottom-5 right-12 hidden md:block motion-float-three"
            title="Report Ready"
            value="09:00"
            tone="blue"
          />

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl shadow-blue-950/40 backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/90 p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">
                    Business Control Dashboard
                  </div>
                  <div className="text-xs text-slate-400">
                    SOPs · Inventory · Reporting · Actions
                  </div>
                </div>
                <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Illustrative example
                </div>
              </div>

              <div className="grid gap-4">
                <DashboardRow label="Inventory Accuracy" value="86%" width="86%" />
                <DashboardRow label="SOP Compliance" value="92%" width="92%" />
                <DashboardRow label="Open Actions" value="14" width="42%" />
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950 p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold">Daily Control Pulse</div>
                    <div className="text-xs text-slate-400">
                      Warehouse · Sales · Payments
                    </div>
                  </div>
                  <div className="text-xs text-emerald-300">Updated</div>
                </div>

                <div className="mt-6 flex h-28 items-end gap-3">
                  {[48, 72, 58, 84, 64, 94, 76].map((height, index) => (
                    <div
                      key={index}
                      className="motion-bars flex-1 rounded-t-xl bg-gradient-to-t from-blue-500 to-emerald-300"
                      style={{
                        height: `${height}%`,
                        animationDelay: `${index * 0.18}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="mt-5 h-1 rounded-full bg-white/10">
                  <div className="motion-pulse-line h-1 rounded-full bg-gradient-to-r from-blue-400 to-emerald-300" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -z-10 left-10 top-10 h-full w-full rounded-[2rem] bg-blue-500/10 blur-xl" />
        </div>
      </div>
    </section>
  )
}

function DashboardRow({ label, value, width }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-300">{label}</span>
        <span className="text-sm font-bold text-blue-300">{value}</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-slate-800">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-300"
          style={{ width }}
        />
      </div>
    </div>
  )
}

function FloatingCard({ title, value, tone, className }) {
  const tones = {
    blue: 'bg-blue-500/15 text-blue-200 border-blue-300/20',
    emerald: 'bg-emerald-500/15 text-emerald-200 border-emerald-300/20',
    amber: 'bg-amber-500/15 text-amber-200 border-amber-300/20',
  }

  return (
    <div
      className={`absolute z-10 rounded-2xl border px-4 py-3 shadow-xl shadow-slate-950/30 backdrop-blur-xl ${tones[tone]} ${className}`}
    >
      <div className="text-xs font-semibold opacity-80">{title}</div>
      <div className="mt-1 text-xl font-extrabold">{value}</div>
    </div>
  )
}