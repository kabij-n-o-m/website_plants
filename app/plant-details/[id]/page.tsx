'use client'
import { usePathname, useParams } from 'next/navigation'

export default function PlantInfoPage() {
  const pathname = usePathname()
  const params = useParams()

  return (
    <div>
      <h2>Pathname: {pathname}</h2>
      <h2>Dynamic Parameter: {params.id}</h2>
    </div>
  )
}