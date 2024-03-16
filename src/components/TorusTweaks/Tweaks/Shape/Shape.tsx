
import { TweakWrapper } from '../TweakWrapper'
import { Range } from '@/components/ui/Range'
import { useTweaksContext } from '../../context'
import { PI } from '@/constants/constants'
import { PointShapeSelector } from './PointShapeSelector'
import { useTweaks } from '@/stores/tweaks'

export const Shape = () => {
  const { ...tweaks } = useTweaksContext()
  const {
    theta,
    phi,
    outerRadius,
    innerRadius
  } = useTweaks()

  const thetaDisplayValue = (PI * 2 / theta).toFixed(2)
  const phiDisplayValue = (PI * 2 / phi).toFixed(2)
  return (
    <div className='flex flex-col gap-12 w-full'>
      <TweakWrapper>
        <Range.Root>
          <Range
            id='theta-increment'
            value={theta}
            customValueDisplay={thetaDisplayValue}
            min={0.1}
            max={2}
            step={0.01}
            label='Dots per ring'
            onChange={tweaks.handleChangeThethaIncrement}
          />
        </Range.Root>
        <Range.Root>
          <Range
            id='phi-increment'
            value={phi}
            customValueDisplay={phiDisplayValue}
            min={0.1}
            max={2}
            step={0.01}
            label='Amount of rings'
            onChange={tweaks.handleChangePhiIncrement}
          />
        </Range.Root>
      </TweakWrapper>
      <TweakWrapper>
        <Range.Root>
          <Range
            id='outer-radius'
            value={outerRadius}
            min={0}
            max={10}
            step={0.1}
            label='Outer radius'
            onChange={tweaks.handleOuterRadiusChange}
          />
        </Range.Root>
        <Range.Root>
          <Range
            id='inner-radius'
            value={innerRadius}
            min={0}
            max={10}
            step={0.1}
            label='Inner radius'
            onChange={tweaks.handleInnerRadiusChange}
          />
        </Range.Root>
        <PointShapeSelector />
      </TweakWrapper>
    </div>
  )
}
