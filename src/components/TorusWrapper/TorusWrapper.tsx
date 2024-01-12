import T from '@/models/Torus'
import { Torus } from '@components/Torus/Torus'
import { TorusTweaks } from '../TorusTweaks/TorusTweaks'

export const TorusWrapper = () => {
  const torus = new T({})

  return (
    <>
      <Torus torus={torus} />
      <TorusTweaks torus={torus} />
    </>
  )
}
