import { cn } from '@/lib/tailwindClassMerge'
import { Slider } from './Slider'
import { useSlider } from './useSlider'
import { useSizes } from './useSizes'
import React from 'react'
import type { MultiSliderType } from './types'
import { useValues } from './useValues'

export const MultiSlider: MultiSliderType = ({
  className,
  children,
  max,
  min,
  onValueChange,
  disabled,
  values: controlledValues,
  ...rest
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const { sizes, setSizes } = useSizes(children, wrapperRef)
  const { values, updateValues } = useValues({
    max,
    min,
    sizes,
    wrapperRef,
    onValueChange,
    controlledValues
  })
  const { sliders, dragging } = useSlider({
    children,
    sizes,
    setSizes,
    values,
    updateValues,
    disabled,
    min,
    max,
    wrapperRef
  })

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'h-11 flex gap-3.5 md:gap-3 select-none',
        { 'cursor-grabbing': dragging },
        { 'grayscale-[100%]': disabled },
        className
      )}
      {...rest}
    >
      {sliders}
    </div>
  )
}

MultiSlider.Slider = Slider