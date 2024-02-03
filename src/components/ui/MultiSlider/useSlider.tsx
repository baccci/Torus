import getChildrenOnDisplayName from '@/lib/getComponentChildrens'
import { cn } from '@/lib/tailwindClassMerge'
import React, { useEffect, useMemo, useState } from 'react'
import { useEventHandlers } from './useEventHandlers'
import { valueToSize } from './utils'
import { safeParseNumber } from '@/lib/safeParseNumber'

export interface UseSliderArgs {
  children: React.ReactNode
  sizes: number[]
  setSizes: React.Dispatch<React.SetStateAction<number[]>>
  wrapperRef: React.RefObject<HTMLDivElement>
  updateValues: (sizes: number[]) => void
  values: number[]
  disabled?: boolean
  min: number | string
  max: number | string
}

export const useSlider = (args: UseSliderArgs) => {
  const {
    children,
    sizes,
    setSizes,
    updateValues,
    values,
    disabled,
    min,
    max,
    wrapperRef
  } = args

  const rawSliders = useMemo(() => getChildrenOnDisplayName(children, 'Slider'), [children])

  const [clicking, setClicking] = useState(false)
  const [sliderIndex, setSliderIndex] = useState<number | null>(null)
  const [lastX, setLastX] = useState<number | null>(null)

  const updateSizes = (movement: number, index: number) => {
    if (disabled) return

    const newSizes = [...sizes]
    const currentIndexSizeChange = newSizes[index] + movement
    const nextIndexSizeChange = newSizes[index + 1] - movement

    if (currentIndexSizeChange < 0 || nextIndexSizeChange < 0) return

    newSizes[index] = currentIndexSizeChange
    newSizes[index + 1] = nextIndexSizeChange

    updateValues(newSizes)
    setSizes(newSizes)
  }

  // Events handlers
  const {
    handleSliderKeyDown,
    handleSliderMouseDown,
    handleSliderMouseMove,
    handleSliderTouchMove,
    handleSliderTouchStart
  } = useEventHandlers({
    ...args,
    updateSizes,
    clicking,
    setClicking,
    sliderIndex,
    setSliderIndex,
    lastX,
    setLastX,
  })

  // If values are controlled, the sizes are updated when component is mounted
  useEffect(() => {
    if (!values || !values.length) return

    const wrapperSize = wrapperRef.current?.getBoundingClientRect().width || 1

    // Calculate the accumulated sizes but not adding themselves
    // If 1 value = 1px size and total size is 70: [10, 20, 70] => [10, 10, 50]
    // Without this process, the end sizes would be [10, 20, 70], 
    // thus the sum of them 10 + 20 + 70 = 100, which is grater than the total size
    const accumulatedValues = values.reduce((acc: number[], value: number, index: number) => {
      if (index === 0) return [value]
      const previousValue = values[index - 1]
      const reducedValue = value - previousValue
      return [...acc, reducedValue]
    }, [])
    const newSizes = accumulatedValues.map((value) => {
      const minNumber = safeParseNumber(min)
      const maxNumber = safeParseNumber(max)
      const newSize = valueToSize(value, minNumber, maxNumber, wrapperSize)

      return newSize
    })

    const accumulatedSizes = newSizes.reduce((acc: number, value: number) => acc + value, 0)
    const remainingSize = wrapperSize - accumulatedSizes
    newSizes.push(remainingSize)

    setSizes(newSizes)
  }, [])

  useEffect(() => {
    const handleMouseUp = () => {
      setClicking(false)
      setSliderIndex(null)
      setLastX(null)
    }

    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleSliderMouseMove)
    window.addEventListener('touchmove', handleSliderTouchMove)
    window.addEventListener('touchend', handleMouseUp)

    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleSliderMouseMove)
      window.removeEventListener('touchmove', handleSliderTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [clicking, sizes, lastX])

  const sliders = rawSliders.map((slider, index) => {
    const isLast = index === rawSliders.length - 1

    const newSlider = React.cloneElement(slider, {
      childClassName: cn({ 'after:content-none': isLast }),
      isLast,
      width: `${sizes[index]}px`,
      onMouseDown: handleSliderMouseDown,
      onKeyDown: handleSliderKeyDown,
      onTouchStart: handleSliderTouchStart,
      draggingThis: clicking && sliderIndex === index,
      dragging: clicking,
      value: values[index],
      disabled,
      min,
      max,
      index
    })

    return newSlider
  })

  return {
    sliders,
    dragging: clicking
  }
}