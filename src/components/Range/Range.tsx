import React, { type DetailedHTMLProps } from 'react'
import { Root } from './Root'
import { cn } from '@/lib/tailwindClassMerge'

interface RangeProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  min: number
  max: number
  step: number
  value: number
  customValueDisplay?: string
  id: string
  className?: string
  label: React.ReactNode | string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface Range extends React.ForwardRefExoticComponent<Omit<RangeProps, "ref"> & React.RefAttributes<HTMLInputElement>> {
  Root: typeof Root
}

const forwardRange = React.forwardRef<HTMLInputElement, RangeProps>((
  { min, max, value, step, id, className, label, onChange, 'aria-label': aria, customValueDisplay, ...rest },
  ref
) => {
  const labelString = typeof label === 'string' ? label : undefined
  const ariaLabel = aria || labelString

  return (
    <>
      <div className='flex justify-between mb-4'>
        <label htmlFor={id} className='text-slate-200'>
          {label}
        </label>
        <span>
          {customValueDisplay || value}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onInput={onChange}
        step={step}
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          `w-[300px] appearance-none bg-transparent cursor-pointer transition-all duration-300 group
          [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[#676792] [&::-moz-range-track]:h-1
          [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:bg-gradient-to-b [&::-moz-range-thumb]:from-[#ebebfb]
          [&::-moz-range-thumb]:to-[#c9c9ea] [&::-moz-range-thumb]:mt-[-5px] [&::-moz-range-thumb]:hover:bg-gradient-to-b
          [&::-moz-range-thumb]:group-focus:ring-2 [&::-moz-range-thumb]:group-focus:ring-offset-0 [&::-moz-range-thumb]:group-focus:ring-white
          [&::-moz-range-thumb]:hover:from-[#f5f5fe] [&::-moz-range-thumb]:hover:to-[#d1d1f1] [&::-webkit-slider-runnable-track]:appearance-none
          [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[#676792]
          [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:bg-gradient-to-b
          [&::-webkit-slider-thumb]:from-[#ebebfb] [&::-webkit-slider-thumb]:to-[#c9c9ea] [&::-webkit-slider-thumb]:mt-[-5px]
          [&::-webkit-slider-thumb]:hover:bg-gradient-to-b [&::-webkit-slider-thumb]:hover:from-[#f5f5fe] [&::-webkit-slider-thumb]:hover:to-[#d1d1f1]
          [&::-webkit-slider-thumb]:group-focus:ring-2 [&::-webkit-slider-thumb]:group-focus:ring-offset-0 [&::-webkit-slider-thumb]:group-focus:ring-white
          `, className
        )}
        {...rest}
      />
    </>
  )
})


export const Range = {
  ...forwardRange,
  Root
} as Range