import React, { forwardRef, useImperativeHandle } from 'react'
import { useFractions } from './useFractions'
import { Fraction } from './Fraction'
import { useSound } from './useSound'
import { cn } from '@/lib/tailwindClassMerge'
import Decimal from 'decimal.js'
import { useEvents } from './useEvents'
import type { FractionalRangeProps } from './types'
import { IndicatorDot } from './IndicatorDot'
import { FractionalRangeContext, useFractionalRange, useFractionalRangeContext } from './context'

export const FractionalRange = forwardRef<HTMLDivElement, FractionalRangeProps>(function FractionalRange(props, ref) {
  const {
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
    activeColor,
    disabled,
    ...rest
  } = props
  const labelText = typeof label === 'string' ? label : undefined
  const ariaLabel = _ariaLabel || labelText

  const containerRef = React.useRef<HTMLDivElement>(null)
  const fractionRef = React.useRef<HTMLDivElement>(null)

  const valueSign = (value || 1) > 0 ? '+' : '-'

  const fractionalContext = useFractionalRange({ ...props, fractionRef, containerRef })
  const { handleInputArrowKeys } = useEvents(fractionalContext)
  const { fractionsArray } = useFractions(fractionalContext)
  useSound(value)
  useImperativeHandle(ref, () => fractionRef.current as HTMLDivElement)

  return (
    <FractionalRangeContext.Provider value={fractionalContext}>
      <div
        className={cn(
          'w-full overflow-hidden flex flex-col items-start relative py-6 px-0 bg-black rounded-xl border border-borderblack select-none',
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
          style={{ transform: `translateX(${fractionalContext.translateX}px) translateZ(0px)` }}
          onKeyDown={handleInputArrowKeys}
          id={`${id}-fractional-range`}
          ref={fractionRef}
        >
          <Fractions fractionsArray={fractionsArray} />
        </div>
        <IndicatorDot />
        <span className='absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-black to-[transparent] pointer-events-none' />
        <span className='absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-black to-[transparent] pointer-events-none' />
      </div>
    </FractionalRangeContext.Provider>
  )
})

interface FractionsProps {
  fractionsArray: number[]
}

const Fractions: React.FC<FractionsProps> = ({ fractionsArray }) => {
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
