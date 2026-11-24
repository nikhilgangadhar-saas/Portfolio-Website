import { applications } from '../../data/applications'
import ApplicationLogo from './ApplicationLogo'
import AssetLogo from './AssetLogo'

export default function ServiceLogos({ logos, className }) {
  if (!logos) return null

  return (
    <div aria-hidden="true" className={`flex flex-wrap items-start content-start gap-3 ${className}`}>
      {applications.filter((app) => logos.apps?.includes(app.id)).map((app) => (
        <ApplicationLogo key={app.id} application={app} className="size-10 rounded-lg text-sm" suffixClassName="text-[8px]" />
      ))}
      {logos.files.map((file) => (
        <AssetLogo key={file} file={file} className="size-10 object-contain" />
      ))}
    </div>
  )
}
