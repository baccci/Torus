import { numberToFixed } from '@/lib/numberToFixed'
import { cn } from '@/lib/tailwindClassMerge'
import { useFractionalRangeContext } from './context'
import React from 'react'
import Decimal from 'decimal.js'

interface FractionsProps {
  fractionsArray: number[]
}

export const Fractions: React.FC<FractionsProps> = ({ fractionsArray }) => {
  const { min, step } = useFractionalRangeContext()

  const FractionChildren = React.useMemo(() => (
    fractionsArray.map((index) => {
      const size = index % 5 === 0 ? 2 : 1
      const safeValue = new Decimal(min).plus(new Decimal(index).times(step)).toNumber()
      return (
        <Fraction
          key={index}
          size={size}
          value={safeValue}
        />
      )
    })
  ), [fractionsArray, min, step])

  return (
    <>
      {FractionChildren}
    </>
  )
}

export default Fractions

interface FractionProps {
  size: 1 | 2
  value: number
}

const Fraction: React.FC<FractionProps> = ({ size, value }) => {
  const { color, activeColor, currentValue, fragmentClassName } = useFractionalRangeContext()

  const currentValuePositive = currentValue > 0
  const valuePositive = value && value > 0
  const equalSignValues = currentValuePositive === valuePositive
  const valueIsPotentiallyInRange = equalSignValues && Math.abs(currentValue) >= Math.abs(value || 0)
  const valueIsInRange = valueIsPotentiallyInRange || value === 0
  const showValue = size === 2
  const colorDisplay = valueIsInRange ? activeColor : color

  return (
    <div
      // @ts-expect-error - --color-display is a valid css variable
      style={{ '--color-display': colorDisplay }}
      data-valueinrange={valueIsInRange}
      data-valueheight={size}
      className={cn(
        'relative w-[1.5px] min-w-[1.5px] data-[valueheight="1"]:h-[var(--fraction-small-height)] data-[valueheight="2"]:h-[var(--fraction-large-height)] [transform:translateZ(0px)] touch-none bg-[var(--color-display)]',
        'data-[valueinrange="false"]:opacity-50 data-[valueinrange="true"]:opacity-100',
        fragmentClassName
      )}
    >
      <FractionValueDisplay
        value={value}
        showValue={showValue}
        color={color}
      />
    </div>
  )
}

interface FractionValueDisplayProps {
  value: number
  showValue: boolean
  color: string
}

const FractionValueDisplay = ({ value, showValue, color }: FractionValueDisplayProps) => {
  const fixedValue = numberToFixed(value, 3)

  if (!showValue) return null
  return (
    <span
      className={cn(
        `absolute top-[-24px] left-[50%] -translate-x-1/2 text-[12px] text-[${color}] select-none touch-none font-mono`
      )}
    >
      {fixedValue}
    </span>
  )
}