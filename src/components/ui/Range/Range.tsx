import React, { type DetailedHTMLProps, useImperativeHandle } from 'react'
import { Root } from './Root'
import { cn } from '@/lib/tailwindClassMerge'
import { Input } from './Input'

export type DetailedProps = DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement>

interface RangeProps extends DetailedProps {
  min: number
  max: number
  step: number
  value?: number
  customValueDisplay?: string | number
  id: string
  className?: string
  label: React.ReactNode | string
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void)
  onChangeMark?: (value: number) => void
}

interface Range extends React.ForwardRefExoticComponent<Omit<RangeProps, "ref"> & React.RefAttributes<HTMLInputElement>> {
  Root: typeof Root
}

const forwardRange = React.forwardRef<HTMLInputElement, RangeProps>((
  { min, max, value, step, id, className, label, onChange, 'aria-label': aria, customValueDisplay, ...rest },
  ref
) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const labelString = typeof label === 'string' ? label : undefined
  const ariaLabel = aria || labelString

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

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
      <Input
        min={min}
        max={max}
        value={value}
        step={step}
        id={id}
        className={className}
        onChange={onChange}
        inputRef={inputRef}
        ariaLabel={ariaLabel}
        {...rest}
      />
    </>
  )
})


export const Range = {
  ...forwardRange,
  Root
} as Range