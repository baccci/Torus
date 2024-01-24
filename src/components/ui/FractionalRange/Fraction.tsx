import { numberToFixed } from '@/lib/numberToFixed'
import { cn } from '@/lib/tailwindClassMerge'

interface FractionProps {
  size: 1 | 2
  value: number
  color?: string
  activeColor?: string
  currentValue?: number
}

export const Fraction: React.FC<FractionProps> = ({ size, value, color, activeColor, currentValue = 0 }) => {

  const fractionHeight = size === 1 ? 'h-2' : 'h-4'
  const currentValuePositive = currentValue > 0
  const valuePositive = value && value > 0
  const equalSignValues = currentValuePositive === valuePositive
  const valueIsPotentiallyInRange = equalSignValues && Math.abs(currentValue) >= Math.abs(value || 0)
  const valueIsInRange = valueIsPotentiallyInRange || value === 0

  const showValue = size === 2
  const colorDisplay = valueIsInRange ? activeColor : color

  return (
    <div
      style={{ backgroundColor: colorDisplay }}
      className={cn(
        `relative w-[1.5px] min-w-[1.5px] ${fractionHeight} [transform:translateZ(0px)] touch-none`,
        { 'opacity-50': !valueIsInRange },
        { 'opacity-100': valueIsInRange }
      )}
    >
      <FractionValueDisplay
        value={value}
        showValue={showValue}
        color='#fff'
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
        `absolute top-[-24px] left-[50%] -translate-x-1/2 text-[12px] text-[${color}] select-none touch-none font-mono`,
      )}
    >
      {fixedValue}
    </span>
  )
}