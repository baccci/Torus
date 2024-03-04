import { cn } from '@/lib/tailwindClassMerge'
import React from 'react'
import type { DetailedProps } from './Range'

interface InputProps extends DetailedProps {
  min: number
  max: number
  step: number
  value?: number
  id: string
  className?: string
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void)
  inputRef: React.RefObject<HTMLInputElement>
  ariaLabel?: string
}

export const Input: React.FC<InputProps> = ({
  id,
  min,
  max,
  value,
  step,
  className,
  onChange,
  inputRef,
  ariaLabel,
  ...rest
}: InputProps) => {
  return (
    <input
      id={id}
      type='range'
      min={min}
      max={max}
      value={value}
      onInput={onChange}
      step={step}
      ref={inputRef}
      aria-label={ariaLabel}
      className={cn(
        `w-full appearance-none bg-transparent cursor-pointer transition-all duration-300 group min-w-0
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
      `,
        className
      )}
      {...rest}
    />
  )
}