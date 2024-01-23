import { cn } from '@/lib/tailwindClassMerge'
import React from 'react'
import { useMarked } from './useMarked'
import { calculateDecimalsAmount } from '@/lib/calculateDecimalsAmount'
import { numberToFixed } from '@/lib/numberToFixed'
import { useSound } from './useSound'

export interface MarkedProps {
  min: number
  max: number
  step: number
  value?: number
  containerRef: React.RefObject<HTMLDivElement>
  onChangeMark?: (value: number) => void

}

export const Marked: React.FC<MarkedProps> = ({ min, max, step, value, containerRef, onChangeMark }) => {
  const markedRef = React.useRef<HTMLDivElement>(null)
  const {
    marksArray,
    translateX,
    clicking,
    setClicking,
    setTranslateX
  } = useMarked({ min, max, step, value, containerRef, markedRef, onChangeMark })

  useSound(value)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setClicking(true)
  }
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!clicking) return
    setClicking(false)
  }
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!clicking) return
    setClicking(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!clicking) return
    const movementX = e.movementX
    const delta = (movementX) + translateX
    setTranslateX(delta)
  }

  return (
    <div
      className='flex gap-1.5 items-end will-change-transform cursor-ew-resize'
      role='slider'
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{ transform: `translateX(${translateX}px) translateZ(0px)` }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={markedRef}
    >
      {marksArray.map((index) => {
        const size = index % 5 === 0 ? 2 : 1

        const labelValue = min + (index * step)
        return (
          <Mark
            key={index}
            size={size}
            value={labelValue}
            color='#fff'
            currentValue={value}
          />
        )
      })}
    </div>
  )
}

interface MarkProps {
  size: 1 | 2
  value: number
  color?: string
  currentValue?: number
}

const Mark: React.FC<MarkProps> = ({ size, value, color = '#fff', currentValue = 0 }) => {

  const markHeight = size === 1 ? 'h-2' : 'h-4'
  const currentValuePositive = currentValue > 0
  const valuePositive = value && value > 0
  const equalSignValues = currentValuePositive === valuePositive
  const valueIsInRange = equalSignValues && Math.abs(currentValue) >= Math.abs(value || 0)

  const showValue = size === 2

  return (
    <div className={cn(
      `relative w-[1.5px] min-w-[1.5px] ${markHeight} bg-white/80 [transform:translateZ(0px)] touch-none`,
      { 'bg-white/40': size === 1 },
      { 'bg-[#9899D7]': valueIsInRange },


    )}>
      <MarkValueDisplay
        value={value}
        showValue={showValue}
        active={valueIsInRange}
        color='#fff'
      />
    </div>
  )
}

interface MarkValueDisplayProps {
  value: number
  showValue: boolean
  active: boolean
  color: string
}

const MarkValueDisplay = ({ value, showValue, active, color }: MarkValueDisplayProps) => {
  const fixedValue = numberToFixed(value, 3)

  if (!showValue) return null
  return (
    <span
      className={cn(
        `absolute top-[-24px] left-[50%] -translate-x-1/2 text-[12px] text-[${color}] select-none touch-none opacity-60`,
        { 'opacity-80': active },
      )}
    >
      {fixedValue}
    </span>
  )
}