import SectionHeader from '../ui/SectionHeader'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { productCategories } from '../../data/products'

export default function ProductCategories() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7fb]">
      <div className="absolute inset-0 bg-soft-grid opacity-70" />
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <SectionHeader
          title="Templates, tools, and small systems you can actually use."
          subtitle="Built for SMEs that need practical control before expensive enterprise systems."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {productCategories.map((category) => (
            <Card key={category.id}>
              <h3 className="text-2xl font-extrabold text-slate-950">
                {category.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {category.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {category.products.slice(0, 4).map((product) => (
                  <span
                    key={product.slug}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    {product.name}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <Button to="/products">View Product Library</Button>
        </div>
      </div>
    </section>
  )
}