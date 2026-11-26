import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import OperationsSectionNav from './OperationsSectionNav'

const sections = [
  ['challenge', 'Challenge'],
  ['approach', 'Project approach'],
  ['analysis', 'Analysis'],
  ['deliverables', 'Deliverables'],
  ['governance', 'Project management'],
  ['implementation', 'Implementation'],
]

const phases = [
  ['Frame the decision', 'Agree what management needs to decide, which brands, markets, and channels are in scope, and what success looks like.'],
  ['Build the baseline', 'Reconcile sales, costs, stock, production, and collections. Agree how to calculate gross margin, inventory cover, and overdue receivables.'],
  ['Validate in the field', 'Test the data against what customers value and how teams actually sell, replenish, dispatch, and collect. Use interviews and site visits where relevant.'],
  ['Compare options and recommend', 'Assess scope, cash requirements, and operational constraints. Recommend what to defend, test, or exit, with decision owners and review criteria.'],
]

const analyses = [
  ['Brand and SKU profitability', 'Net sales, gross margin percentage and value, product cost, pricing, and channel mix.', 'Identify where to protect availability, revisit pricing, or rationalize the range.'],
  ['Customer and channel segmentation', 'Buying reasons, service needs, order patterns, payment terms, and collections.', 'Separate key-account service from emerging-channel tests and set appropriate credit terms.'],
  ['Inventory and production', 'Inventory cover, ageing, shelf-life exposure, capacity constraints, and order patterns.', 'Set stock targets, define make-to-order candidates, and agree when a channel gets allocation priority.'],
  ['Growth options', 'Compare channel readiness, cost to serve, investment needs, and the evidence behind expected demand.', 'Rank options and define the pilot, scale-up criteria, and conditions for exit.'],
]

const governance = [
  ['We handle', 'Facilitate discovery, prepare the baseline, document assumptions, evaluate options, and build the recommendation and implementation roadmap.'],
  ['You provide', 'A sponsor, data owners, source extracts and definitions, access to relevant teams and sites, and decision owners who can approve changes.'],
  ['We review together', 'Agree the charter and RACI, validate the baseline, review options, and sign off on the rollout. Record open issues, decisions, owners, and dates.'],
]

const deliverables = [
  ['Strategy roadmap', 'Channel priorities, rollout phases, decision owners, dependencies, and review milestones.'],
  ['Key positions and hiring criteria', 'Role profiles, hiring criteria, and key result areas (KRAs) and performance indicators (KPIs) for each priority position.'],
  ['Merchandising and stocking plan', 'Assortment by channel, priority SKUs, stock cover targets, replenishment rules, and options for substitutions and slow-moving stock.'],
  ['Marketing plan', 'Target audiences, campaign briefs, retail and digital activities, an activity calendar, and measures for reviewing results.'],
  ['Expected turnover forecast', 'Projected sales revenue by channel or product family, with volume, price, and product mix assumptions and scenarios for different demand levels.'],
  ['Operating capacity plan', 'Translate forecast volumes into warehouse staffing, shift requirements, truck capacity, and office staffing in finance, logistics, and supply chain management.'],
  ['Working capital and KPI review', 'Credit and collection assumptions, expected inventory requirements, and a scorecard for turnover, gross margin, stock cover, wastage, and receivables.'],
]

const sectionClass = 'scroll-mt-24 border-b border-slate-200 px-5 py-10 sm:px-8 sm:py-14'
const width = 'mx-auto max-w-6xl'
const heading = 'text-2xl font-bold tracking-tight sm:text-3xl'

export default function BusinessStrategyService() {
  return (
    <article className="azure-service bg-white text-slate-950">
      <header className="azure-service-hero px-5 text-white sm:px-8">
        <div className={width}>
          <Link to="/services" className="inline-block text-sm font-semibold text-blue-300 hover:text-blue-200">← Back to Services</Link>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">Business Analysis &amp; Strategy</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">Decide where to put your production capacity, inventory, sales effort, and cash. We combine operating data with fieldwork and turn the findings into decisions your teams can implement and measure.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/case-studies/three-brand-profitability-and-channel-strategy" variant="light">Read the three-brand case study</Button>
            <Button to="/contact" variant="glass">Discuss a project</Button>
          </div>
        </div>
      </header>
      <OperationsSectionNav sections={sections} />

      <section id="challenge" className={sectionClass}>
        <div className={`${width} grid gap-4 md:grid-cols-[1fr_2fr]`}>
          <h2 className={heading}>The challenge</h2>
          <p className="leading-7 text-slate-700">A strong sales line can hide slow-moving stock, uneven margins, or cash tied up in receivables. We connect commercial, production, and finance data to show which products, customers, and channels are worth prioritizing.</p>
        </div>
      </section>

      <section id="approach" className={`${sectionClass} azure-service-architecture text-white`}>
        <div className={width}>
          <h2 className={heading}>From discovery to recommendation</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {phases.map(([title, description]) => (
              <li key={title} className="rounded-xl border border-white/15 bg-slate-950 p-5">
                <h3 className="font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="analysis" className={sectionClass}>
        <div className={width}>
          <h2 id="strategy-outputs" className={heading}>Analysis and decisions</h2>
          <div role="region" aria-labelledby="strategy-outputs" tabIndex={0} className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 focus-visible:outline-2 focus-visible:outline-blue-700">
            <table aria-labelledby="strategy-outputs" className="w-full min-w-[38rem] text-left text-sm leading-6">
              <thead className="bg-slate-900 text-white">
                <tr><th scope="col" className="p-3">Workstream</th><th scope="col" className="p-3">What we analyze</th><th scope="col" className="p-3">Decision it supports</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {analyses.map(([title, inputs, outcome]) => (
                  <tr key={title} className="align-top even:bg-slate-50">
                    <th scope="row" className="p-3 font-semibold text-blue-950">{title}</th>
                    <td className="p-3 text-slate-700">{inputs}</td>
                    <td className="p-3 text-slate-700">{outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="deliverables" className={`${sectionClass} bg-slate-50`}>
        <div className={width}>
          <h2 className={heading}>What you receive</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">For a growth and profitability engagement, we agree which of these deliverables are needed and who will use each one.</p>
          <dl className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5">
            {deliverables.map(([title, description]) => (
              <div key={title} className="grid gap-1 py-4 sm:grid-cols-[1fr_2fr] sm:gap-6">
                <dt className="font-semibold text-blue-950">{title}</dt>
                <dd className="leading-7 text-slate-700">{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="governance" className={sectionClass}>
        <div className={width}>
          <h2 className={heading}>Project management and ownership</h2>
          <dl className="mt-5 grid gap-4 md:grid-cols-3">
            {governance.map(([title, description]) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-5">
                <dt className="font-bold">{title}</dt>
                <dd className="mt-2 leading-7 text-slate-700">{description}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 max-w-3xl leading-7 text-slate-700">We set milestones after scoping data access and fieldwork. If new evidence changes an assumption, we show which recommendation or milestone it affects and review the change with the sponsor.</p>
        </div>
      </section>

      <section id="implementation" className={sectionClass}>
        <div className={width}>
          <h2 className={heading}>Pilot, measure, and adjust</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">The rollout plan assigns actions to sales, finance, planning, production, and warehouse owners. We agree a baseline and review cadence for measures such as sales, gross margin, stock cover, wastage, and collections. Early results determine whether to scale a change, revise it, or stop the pilot.</p>
          <Button to="/contact" variant="dark" className="mt-5">Discuss a project</Button>
        </div>
      </section>
    </article>
  )
}
