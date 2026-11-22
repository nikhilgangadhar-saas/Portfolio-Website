import { useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import { services } from '../data/homepageOfferings'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { serviceId } = useParams()
  const service = services.find(({ id }) => id === serviceId)

  if (!service) return <NotFound />

  return (
    <section className="bg-slate-100 px-5 py-12 text-slate-950 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 border-t-4 border-t-slate-900 bg-white p-6 text-center shadow-sm sm:p-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">{service.title}</h1>
        <p className="mt-4 text-lg leading-7 text-slate-700">Service details coming soon.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button to="/services" variant="secondary">Back to services</Button>
          <Button to="/contact" variant="dark">Discuss a project</Button>
        </div>
      </div>
    </section>
  )
}
