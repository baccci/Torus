import React from 'react'
import { Values } from './Values'
import { useTweaks } from '@/stores/tweaks'
import { cn } from '@/lib/tailwindClassMerge'
import { useTweaksContext } from '../../context'
import { HALF_PI, PI } from '@/constants/constants'
import { Slider2D } from '@/components/ui/Slider2D/Slider2D'
import { Marks } from './Marks'

type FixedPositionSliderProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const FixedPositionSlider: React.FC<FixedPositionSliderProps> = ({ className, ...props }) => {
  const { ...events } = useTweaksContext()
  const {
    xFixedValue,
    yFixedValue
  } = useTweaks()
  return (
    <div className={cn('flex flex-col gap-2 h-full font-mono', className)} {...props}>
      <div className='flex justify-between w-full text-sm'>
        Fixed Positions
        <Values values={[xFixedValue, yFixedValue]} debounce={500}/>
      </div>
      <Slider2D
        min={0}
        max={PI}
        values={[xFixedValue, yFixedValue]}
        anchorValues={[[HALF_PI, HALF_PI]]}
        anchorMargin={0.1}
        onChange={events.handleChangeFixedPosition}
        className='w-full h-full min-h-[100%]'
        label='Fixed position'
        lines
      >
        <Marks numberOfMarks={33} min={0} max={PI} orientation='horizontal' />
        <Marks numberOfMarks={17} min={0} max={PI} orientation='vertical' />
      </Slider2D>
    </div>
  )
}
