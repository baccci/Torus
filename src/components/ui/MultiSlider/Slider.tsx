import { cn } from '@/lib/tailwindClassMerge'
import { forwardRef } from 'react'
import type { SliderProps } from './types'
import { safeParseNumber } from '@/lib/safeParseNumber'

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const {
    className,
    width = '100%',
    index,
    draggingThis,
    dragging,
    value,
    childClassName,
    disabled,
    min,
    max,
    isLast,
    ...rest
  } = props

  const safeWidth = safeParseNumber(width) < 1 ? '0px' : width
  return (
    <div
      ref={ref}
      data-dragging={dragging}
      className={cn('will-change-[width] transform-gpu rounded-md bg-white/80 data-[dragging="false"]:hover:bg-white transition-colors duration-200 ease-in-out', className)}
      style={{ width: safeWidth }}
    >
      <div
        tabIndex={isLast ? -1 : 0}
        role='slider'
        aria-valuenow={value}
        aria-valuetext={String(value)}
        aria-valuemax={Number(max)}
        aria-valuemin={Number(min)}
        data-index={index}
        data-value={value}
        data-disabled={disabled}
        className={cn(
          'h-full w-full relative pointer-events-none will-change-[width] transform-gpu transition-[width] duration-[5ms] cursor-grabbing font-mono text-sm',
          'ease-[linear(0,0.5007_7.21%,0.7803_12.29%,0.8883_14.93%,0.9724_17.63%,1.0343_20.44%,1.0754_23.44%,1.0898_25.22%,1.0984_27.11%,1.1014_29.15%,1.0989_31.4%,1.0854_35.23%,1.0196_48.86%,1.0043_54.06%,0.9956_59.6%,0.9925_68.11%,1_)]',
          'after:w-1.5 md:after:w-1 after:h-[85%] after:rounded-sm after:bg-white/80 after:absolute after:top-[50%] after:-translate-y-1/2 after:-right-2.5 md:after:-right-2 after:[pointer-events:initial] data-[disabled="true"]:after:[pointer-events:none] after:hover:bg-white after:transition-[background-color] after:duration-200 after:ease-in-out',
          'focus-visible:outline focus-visible:outline-white/80 focus-visible:outline-offset-2',
          { 'before:absolute before:top-[-25px] before:-right-2 before:translate-x-1/2 before:[content:attr(data-value)] before:text-slate-300': value || value === 0 },
          { 'after:bg-white': draggingThis },
          childClassName
        )}
        {...rest}
      >
      </div>
    </div>
  )
})

Slider.displayName = 'Slider'
