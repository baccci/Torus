import React from 'react'
import { createContext } from '@/lib/createContext'
import { calculateCoordinatesFromValues, calculateValuesFromCoordinates } from './utils'
import { useOnMount } from '@/hooks/useOnMount'
import { getAnchoredValues } from './hooks/useAnchoredValues'
import type { RectReadOnly } from 'react-use-measure'
import type { Slider2DProps, Values } from './types'

interface UseSliderProps extends Slider2DProps{
  bounds: RectReadOnly
  controlledValues?: [number, number]
}

export const useSlider = ({
  'aria-label': ariaLabel,
  controlledValues,
  valuesDebounce,
  initialValues,
  title: _title,
  anchorValues,
  anchorMargin,
  onChange,
  bounds,
  label,
  min,
  max
}: UseSliderProps) => {
  const [mounted, setMounted] = React.useState(false)
  const [uncontrolledValues, setUncontrolledValues] = React.useState<Values>(initialValues ?? [0, 0])
  const values = controlledValues ?? uncontrolledValues
  const setValues = React.useRef(onChange ?? setUncontrolledValues)

  const title = _title ?? label ?? ariaLabel

  const [dragging, setDragging] = React.useState(false)
  const coordinates = calculateCoordinatesFromValues(
    values,
    bounds,
    min,
    max
  )

  useOnMount(function setInitialValuesOnMount() {
    setMounted(true)

    if (!initialValues) return
    setValues.current?.(initialValues)
  }, { effect: 'layout' })

  const api = React.useMemo(() => ({
    currentX: (coordinates?.x || 0) + bounds.left,
    currentY: (coordinates?.y || 0) + bounds.top,
    setCoordinate: (x: number, y: number, bounds: DOMRect) => {
      const values = calculateValuesFromCoordinates(
        { x, y },
        bounds,
        min,
        max
      )

      const anchoredValues = getAnchoredValues({ values, anchorValues, anchorMargin })
      setValues.current?.(anchoredValues)
    },
    setDragging: (dragging: boolean) => setDragging(dragging),
    getDragging: () => dragging,
    moveX: function(x: number) {
      const newX = this.currentX + x
      const values = calculateValuesFromCoordinates(
        { x: newX, y: this.currentY },
        bounds,
        min,
        max
      )

      setValues.current?.(values)
    },
    moveY: function(y: number) {
      const newY = this.currentY + y
      const values = calculateValuesFromCoordinates(
        { x: this.currentX, y: newY },
        bounds,
        min,
        max
      )

      setValues.current?.(values)
    }
  }), [dragging, min, max, anchorValues, anchorMargin, coordinates, bounds])

  return {
    valuesDebounce,
    initialValues,
    coordinates,
    dragging,
    mounted,
    values,
    api,
    title
  }
}

export type SliderApi = ReturnType<typeof useSlider>['api']
export type SliderContextType = ReturnType<typeof useSlider>

const sliderContext = createContext<SliderContextType>()

export const Provider = sliderContext[0]
export const useSliderContext = sliderContext[1]