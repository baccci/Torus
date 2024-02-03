import { useEffect, useState } from 'react'
import { sizeToValue } from './utils'

interface UseValuesArgs {
  sizes: number[]
  min: number | string
  max: number | string
  wrapperRef: React.RefObject<HTMLDivElement>
  onValueChange?: (values: number[]) => void
  controlledValues?: number[]
}

export const useValues = ({ sizes, min, max, wrapperRef, onValueChange, controlledValues }: UseValuesArgs) => {
  const [uncontrolledValues, setUncontrolledValues] = useState<number[]>([])
  const values = controlledValues || uncontrolledValues

  // calculate and updates the values based on the sizes, min and max and the wrapper width
  const updateValues = (sizes: number[]) => {
    const minNumber = typeof min === 'string' ? parseInt(min) : min
    const maxNumber = typeof max === 'string' ? parseInt(max) : max
    const wrapperSize = wrapperRef.current?.getBoundingClientRect().width || 1
    const sizesWithoutLast = sizes.slice(0, sizes.length - 1)

    // Calculate the accumulated sizes
    const accumulatedSizes: number[] = sizesWithoutLast.reduce((acc: number[], value: number, index: number) => {
      if (index === 0) return [value]
      acc.push(acc[index - 1] + value)

      return [...acc]
    }, [])

    // Calculate the values
    const newValues = accumulatedSizes.map((size) => {
      const value = sizeToValue(size, minNumber, maxNumber, wrapperSize) //(size / wrapperSize) * (maxNumber - minNumber) + minNumber
      return Math.round(value)
    })

    !controlledValues && setUncontrolledValues(newValues)
    onValueChange && onValueChange(newValues)
  }

  // Update the values when the wrapper mounts and if the values are not controlled
  useEffect(() => {
    if (!wrapperRef.current || values.length) return
    updateValues(sizes)
  }, [wrapperRef.current])

  return { values, updateValues }
}