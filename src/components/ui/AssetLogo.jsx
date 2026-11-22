import { useState } from 'react'

export default function AssetLogo({ file, className }) {
  const [unavailable, setUnavailable] = useState(false)
  if (unavailable) return null

  return (
    <img
      src={`/assets/${file}`}
      alt=""
      className={className}
      onError={() => setUnavailable(true)}
    />
  )
}
