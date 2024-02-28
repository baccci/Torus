'use client'

import useMeasure from 'react-use-measure'
import { cn } from '@/lib/tailwindClassMerge'
import { Slider } from './Slider'
import { useSliders } from './hooks'
import { MultiSliderContext, useMultiSlider } from './context'
import type { MultiSliderType } from './types'

export const MultiSlider: MultiSliderType = (props) => {
  const {
    children,
    min,
    max,
    onValueChange,
    values: controlledValues,
    disabled,
    className,
    initialValues,
    arrowKeyMajorStep,
    arrowKeyMinorStep,
    ...rest
  } = props

  const sliderProps = {
    children,
    min,
    max,
    onValueChange,
    controlledValues,
    initialValues,
    arrowKeyMajorStep,
    arrowKeyMinorStep,
  }

  const [wrapperRef, bounds] = useMeasure()

  // sliders state in general, widths, gestures and values
  const { widths, sliders, values, draggingState } = useSliders({ bounds, ...sliderProps })

  // sliders context
  const multiSliderContextValue = useMultiSlider({ bounds, widths, values, ...draggingState, ...props })

  return (
    <MultiSliderContext.Provider value={multiSliderContextValue}>
      <div
        ref={wrapperRef}
        data-dragging={draggingState.dragging}
        aria-label='multi-slider'
        tabIndex={0}
        className={cn(
          'h-11 flex gap-4 md:gap-3 select-none relative isolate',
          'data-[dragging="true"]:cursor-grabbing',
          { 'grayscale-[100%]': disabled },
          '[--slider-bg-color:#CBD5E1] [--slider-thumb-color:#CBD5E1] [--slider-bg-hover-color:#fff] [--slider-thumb-hover-color:#fff] [--slider-thumb-ring-color:rgb(37_99_235)] [--slider-thumb-dragging-color:white',
          props.className
        )}
        {...rest}
      >
        {sliders}
      </div>
    </MultiSliderContext.Provider>
  )
}

MultiSlider.Slider = Slider