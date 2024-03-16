import type { AnchorTuple, Values } from '../types'

const MARGIN = 0.2

interface UseAnchoredValuesArgs {
  values: Values
  anchorValues?: AnchorTuple[]
  anchorMargin?: number
}

export const getAnchoredValues = ({ values, anchorValues, anchorMargin = MARGIN }: UseAnchoredValuesArgs) => {
  if (!anchorValues || anchorValues.length === 0) return values

  const [xValue, yValue] = values
  const newValues: Values = [...values]

  anchorValues.forEach((anchorValue) => {
    if (Array.isArray(anchorValue)) {
      const anchorX = anchorValue[0]
      const anchorY = anchorValue[1]

      const resultX = getAnchoredValue(xValue, anchorX, anchorMargin)
      const resultY = getAnchoredValue(yValue, anchorY, anchorMargin)

      if (resultX !== xValue) newValues[0] = resultX
      if (resultY !== yValue) newValues[1] = resultY

      return
    }

    const anchorX = anchorValue
    if (anchorX === null) return

    const resultX = getAnchoredValue(xValue, anchorX, anchorMargin)
    if (resultX !== xValue) {
      newValues[0] = getAnchoredValue(xValue, anchorX, anchorMargin)
    }
  })

  return newValues
}

function getAnchoredValue(value: number, anchorValue: number | null, margin: number) {
  if (anchorValue === null) return value
  const lowerBound = anchorValue - margin
  const upperBound = anchorValue + margin

  if (value > lowerBound && value < upperBound) return anchorValue
  return value
}