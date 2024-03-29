
import { TweakWrapper } from './TweakWrapper'
import { Range } from '@/components/ui/Range'
import { useTweaksContext } from '../context'
import { useTweaks } from '@/stores/tweaks'

export const View = () => {
  const { ...tweaks } = useTweaksContext()
  const { fieldOfView, distanceTorus } = useTweaks()

  return (
    <TweakWrapper>
      <Range.Root>
        <Range
          id='field-of-view'
          value={fieldOfView}
          min={0}
          max={1000}
          step={1}
          label='Field of view'
          onChange={tweaks.handleFieldOfViewChange}
        />
      </Range.Root>
      <Range.Root>
        <Range
          id='distance-torus'
          value={distanceTorus}
          min={0}
          max={100}
          step={1}
          label='Distance of torus'
          onChange={tweaks.handleDistanceTorusChange}
        />
      </Range.Root>
    </TweakWrapper>
  )
}
