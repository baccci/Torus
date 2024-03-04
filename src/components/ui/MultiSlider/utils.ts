import { safeParseNumber } from '@/lib/safeParseNumber'

export const sizeToValue = (size: number, min: number, max: number, wrapperSize: number) => {
  const value = (size / wrapperSize) * (max - min) + min
  return Math.round(value)
}

export const valueToSize = (value: number, min: number, max: number, wrapperSize: number) => {
  const size = (wrapperSize * (value - min)) / (max - min)
  return size
}

export const valuesToSizes = (values: number[], min: number | string, max: number | string, wrapperSize: number) => {
  // Calculate the accumulated values but not adding themselves
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
    const size = valueToSize(value, minNumber, maxNumber, wrapperSize)

    return size
  })

  const accumulatedWidths = newSizes.reduce((acc: number, size) => acc + size, 0)
  const remainingSize = wrapperSize - accumulatedWidths
  newSizes.push(remainingSize)

  return newSizes
}

export const getNewSliderWidthsArray = (startingIndex: number, currentValue: number, nextValue: number, widths: number[]) => {
  const newWidths = [...widths]
  newWidths[startingIndex] = currentValue
  newWidths[startingIndex + 1] = nextValue
  return newWidths
}