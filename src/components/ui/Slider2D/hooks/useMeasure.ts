import React from 'react'
import useMeasureHook from 'react-use-measure'

export const useMeasure = () => {
  const [ref, bounds] = useMeasureHook()
  const sliderRef = React.useRef<HTMLDivElement | null>(null)

  const getRef = (element: HTMLDivElement | null) => {
    if (!element) return

    sliderRef.current = element
    ref(element)
  }

  return [
    sliderRef,
    bounds,
    getRef
  ] as const
}