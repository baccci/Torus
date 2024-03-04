import React from 'react'
import getChildrenOnDisplayName from '@/lib/getComponentChildrens'
import { useGestures } from './useGestures'
import { useSlidersValues } from './useSliderState'
import type { RectReadOnly } from 'react-use-measure'
import type { SliderProps } from '../types'

interface UseSliderArgs {
  children: React.ReactNode
  bounds: RectReadOnly
  min: number | string
  max: number | string
  onValueChange?: (values: number[]) => void
  controlledValues?: number[]
  initialValues?: number[]
  arrowKeyMajorStep?: number
  arrowKeyMinorStep?: number
}

export const useSliders = ({
  children,
  bounds,
  controlledValues,
  min,
  max,
  onValueChange,
  initialValues,
  arrowKeyMajorStep,
  arrowKeyMinorStep
}: UseSliderArgs) => {
  const numberOfSliders = React.useMemo(() => getNumberOfSliders(children, 'Slider'), [children])
  const sliderValuesProps = {
    bounds,
    numberOfSliders,
    controlledValues,
    initialValues,
    onValueChange,
    max,
    min
  }

  const [state, api] = useSlidersValues(sliderValuesProps)
  const [bindGestures, gestureState] = useGestures({ api, arrowKeyMajorStep, arrowKeyMinorStep })
  const sliders = React.useMemo(() => getSliders(children, { ...bindGestures }), [children, bindGestures])

  return {
    sliders,
    widths: state.widths,
    values: state.values,
    draggingState: {
      dragging: gestureState.dragging,
      draggingIndex: gestureState.sliderIndex
    }
  }
}

function getSliders(children: React.ReactNode, props?: SliderProps) {
  const rawSliders = getChildrenOnDisplayName<SliderProps>(children, 'Slider')

  const sliders = rawSliders.map((slider, index) => {
    const newSlider = React.cloneElement(slider, { ...injectSliderProps(index, rawSliders.length, props) })
    return newSlider
  })

  return sliders
}

function injectSliderProps(index: number, totalSliders: number, props?: SliderProps) {
  const isLast = index === totalSliders - 1
  const zIndex = totalSliders - index

  const finalProps = {
    index,
    isLast,
    zIndex,
    ...props
  }

  return finalProps
}

function getNumberOfSliders(children: React.ReactNode, displayName: string) {
  let numberOfSliders = 0
  React.Children.forEach(children, (child: unknown) => {
    const childType = child as { type: { displayName: string } }
    if (React.isValidElement(child) && childType.type.displayName === displayName) {
      numberOfSliders++
    }
  })
  return numberOfSliders
}