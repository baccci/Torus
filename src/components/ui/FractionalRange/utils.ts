import Decimal from 'decimal.js'

interface xToValue {
  xValue: number
  containerRef: React.RefObject<HTMLDivElement>
  fractionRef: React.RefObject<HTMLDivElement>
  min: number
  max: number
  step: number
}

export const xToValue = ({
  xValue,
  containerRef,
  fractionRef,
  min,
  max,
  step
}: xToValue) => {
  if (!containerRef.current || !fractionRef.current) return 0

  const containerWidth = containerRef.current.offsetWidth
  const markedWidth = fractionRef.current.offsetWidth
  const stepAmount = (new Decimal(max).minus(min)).div(step).toNumber()
  const relInputValue = - (new Decimal(stepAmount).mul(new Decimal(xValue).minus(new Decimal(containerWidth).div(2)))).div(markedWidth).toNumber()

  return new Decimal(relInputValue).mul(step).plus(min).toNumber()
}

interface valueToXArgs {
  inputValue: number
  containerRef: React.RefObject<HTMLDivElement>
  fractionRef: React.RefObject<HTMLDivElement>
  min: number
  max: number
  step: number
}

export const valueToX = ({
  inputValue,
  containerRef,
  fractionRef,
  min,
  max,
  step
}: valueToXArgs) => {
  if (!containerRef.current || !fractionRef.current) return 0

  const containerWidth = containerRef.current.offsetWidth
  const markedWidth = fractionRef.current.offsetWidth
  const stepAmount = (new Decimal(max).minus(min)).div(step).toNumber()
  const relativeValue = new Decimal(inputValue).minus(min).div(step).toNumber()

  return (new Decimal(containerWidth).div(2).minus(new Decimal(markedWidth).mul(relativeValue).div(stepAmount))).toNumber()
}