import { cn } from '@/lib/tailwindClassMerge'
import { Thumb } from './Thumb'
import { useThumb } from './hooks/useThumb'
import { useGestures } from './hooks/useGestures'
import { useSlider, Provider } from './context'
import { useMeasure } from './hooks/useMeasure'
import { Line } from './Line'
import type { Slider2DType } from './types'

const SLIDER2D_DISPLAY_NAME = 'Slider2D'

export const Slider2D: Slider2DType = (props) => {
  const {
    valuesDebounce: _valuesDebounce,
    initialValues: _initialValues,
    anchorValues: _anchorValues,
    anchorMargin: _anchorMargin,
    values: controlledValues,
    onChange: _onChange,
    min: _min,
    max: _max,
    className,
    children,
    lines,
    style,
    size,
    ...rest
  } = props

  const [sliderRef, bounds, getRef] = useMeasure()
  const thumb = useThumb({ children, bounds })
  const contextValue = useSlider({ ...props, bounds, controlledValues })
  const bind = useGestures({ api: contextValue.api, sliderRef })

  return (
    <Provider value={contextValue}>
      <div
        ref={getRef}
        style={{ width: size, height: size, ...style }}
        className={cn(
          'rounded-lg bg-black border-borderblack border flex relative isolate select-none',
          { 'cursor-grabbing': contextValue.dragging },
          '[--line-color:#222]',
          className
        )}
        {...bind}
        {...rest}
      >
        {thumb}
        {children}
        <Line orientation='horizontal' lines={lines} />
        <Line orientation='vertical' lines={lines} />
      </div>
    </Provider>
  )
}

Slider2D.displayName = SLIDER2D_DISPLAY_NAME
Slider2D.Thumb = Thumb
