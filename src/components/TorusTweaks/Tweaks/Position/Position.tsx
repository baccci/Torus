import { Range } from '@/components/ui/Range'
import { useTweaksContext } from '../../context'
import { useTweaks } from '@/stores/tweaks'
import { FixedPositionSlider } from './FixedPositionSlider'

export const Position = () => {
  const { ...events } = useTweaksContext()
  const { xMovement, yMovement } = useTweaks()

  return (
    <div className='flex flex-col lg:flex-row w-full gap-20 lg:gap-12'>
      <FixedPositionSlider className='w-full h-32 lg:w-1/2' />
      <div className='flex flex-col gap-12 w-full lg:w-1/2'>
        <Range.Root className='lg:w-full'>
          <Range
            id='x-increment'
            value={xMovement}
            customValueDisplay={xMovement * 1000}
            min={0}
            max={0.01}
            step={0.0001}
            label='X movement'
            aria-label='X movement'
            onChange={events.handleChangeXMovement}
            />
        </Range.Root>
        <Range.Root className='lg:w-full'>
          <Range
            id='y-increment'
            value={yMovement}
            customValueDisplay={yMovement * 1000}
            min={0}
            max={0.01}
            step={0.0001}
            label='Y movement'
            onChange={events.handleChangeYMovement}
          />
        </Range.Root>
      </div>
    </div>
  )
}
