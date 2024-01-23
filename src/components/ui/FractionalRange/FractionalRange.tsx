
import React, { forwardRef, useImperativeHandle } from 'react'
import { useFractionRange } from './useFractionRange'
import { Fraction } from './Fraction'
import { useSound } from './useSound'
import { cn } from '@/lib/tailwindClassMerge'
import Decimal from 'decimal.js'
import { useEvents } from './useEvents'
import type { FractionalRangeProps } from './types'

export const FractionalRange = forwardRef<HTMLDivElement, FractionalRangeProps>(({
  min,
  max,
  value,
  step,
  id,
  className,
  label,
  "aria-label": _ariaLabel,
  onChange,
  color = '#fff',
  activeColor = '#9899D7',
  disabled,
  ...rest
}, ref) => {
  const labelText = typeof label === 'string' ? label : undefined
  const ariaLabel = _ariaLabel || labelText

  const containerRef = React.useRef<HTMLDivElement>(null)
  const fractionRef = React.useRef<HTMLDivElement>(null)

  const valueSign = Math.sign(value || 1) ? '+' : '-'

  const {
    translateX,
    setTranslateX,
    handleInputArrowKeys
  } = useEvents({ fractionRef, step, disabled })

  const { fractionsArray } = useFractionRange({
    min,
    max,
    step,
    value,
    containerRef,
    onChange,
    fractionRef,
    setTranslateX,
    translateX
  })

  useSound(value)

  useImperativeHandle(ref, () => fractionRef.current as HTMLDivElement)

  return (
    <div
      className={cn(
        'w-full overflow-hidden flex flex-col items-start relative py-6 px-0 bg-[#111] rounded-xl border border-[#222] select-none',
        className
      )}
      ref={containerRef}
      id={id}
      {...rest}
    >
      <div className='w-full flex justify-between font-mono px-6 mt-[-8px] text-sm mb-6 z-[1]'>
        <span>{label}</span>
        <div className='flex gap-1'>
          <span>{valueSign}</span>
          <span>{Math.abs(value || 0)}</span>
        </div>
      </div>
      <div
        className='flex gap-1.5 items-end will-change-transform cursor-ew-resize pt-4 pb-2 focus-visible:outline-offset-[16px]'
        role='slider'
        tabIndex={0}
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{ transform: `translateX(${translateX}px) translateZ(0px)` }}
        onKeyDown={handleInputArrowKeys}
        id={`${id}-fractional-range`}
        ref={fractionRef}
      >
        <Fractions
          fractionsArray={fractionsArray}
          value={value || 0}
          min={min}
          step={step}
          color={color}
          activeColor={activeColor}
          disabled={disabled}
        />
      </div>
      <span className={cn(`size-1 rounded-full bg-[${activeColor}] absolute bottom-[10px] left-1/2 -translate-x-[25%]`)} />
      <span className='absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-[#111] to-[transparent] pointer-events-none' />
      <span className='absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-[#111] to-[transparent] pointer-events-none' />
    </div>
  )
})

interface FractionsProps {
  fractionsArray: number[]
  value: number
  min: number
  step: number
  color?: string
  activeColor?: string
  disabled?: boolean
}

const Fractions: React.FC<FractionsProps> = ({ fractionsArray, value, min, step, color, activeColor, disabled }) => {
  return (
    <>
      {fractionsArray.map((index) => {
        const size = index % 5 === 0 ? 2 : 1
        const currentValue = disabled ? 0 : value

        const safeValue = new Decimal(min).plus(new Decimal(index).times(step)).toNumber()
        return (
          <Fraction
            key={index}
            size={size}
            value={safeValue}
            color={color}
            activeColor={activeColor}
            currentValue={currentValue}
          />
        )
      })}
    </>
  )
}
