import React, { type DetailedHTMLProps } from 'react'
import { useSwitch } from './useSwitch'
import { cn } from '@/lib/tailwindClassMerge'

export interface SwitchProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onCheckedChange?: (checked: boolean) => void
  label?: string
  name?: string
  value?: boolean
  checked?: boolean
  defaultChecked?: boolean
  className?: string
  children?: React.ReactNode
  classNames?: {
    label?: string,
    thumb?: string,
    base?: string
  }
}

export const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(({
  value,
  checked: _checked,
  defaultChecked,
  className,
  classNames,
  children,
  onCheckedChange,
  ...rest
}, ref) => {
  const isChecked = _checked ?? value
  const { checked, changeFn, pressed, setPressed } = useSwitch({ checked: isChecked, defaultChecked, onCheckedChange })

  const handleSwitchClick = () => {
    changeFn(!checked)
  }

  const handlePressedSwitch = () => setPressed(true)
  const handleUnpressedSwitch = () => setPressed(false)
  const handleKeyUp = () => setPressed(false)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return

    setPressed(true)
    changeFn(!checked)
  }

  return (
    <label
      className={cn('group flex gap-2 select-none outline-1 outline-offset-4 outline-white focus-visible:outline h-fit', classNames?.label)}
      data-checked={checked || undefined}
      data-pressed={pressed || undefined}
      onClick={handleSwitchClick}
      onMouseDown={handlePressedSwitch}
      onMouseUp={handleUnpressedSwitch}
      onMouseLeave={handleUnpressedSwitch}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      role='switch'
      aria-checked={checked}
      tabIndex={0}
    >
      <div
        className={cn(
          'cursor-pointer transition-all duration-200 [--thumb-color:#fff] flex p-0.5 px-0.5 rounded-full h-6 w-10 [--alpha:1] [--bg-color:rgba(59,130,246,var(--alpha))] bg-[var(--bg-color)] hover:[--alpha:0.9]',
          className,
          { '[--bg-color:rgba(107,114,128,var(--alpha))]': !checked },
          classNames?.base
        )}
        ref={ref}
        {...rest}
      >
        <span className={
          cn(`rounded-full size-5 bg-[var(--thumb-color)] shadow-md origin-right transition-all 
          group-data-[checked]:ml-4 group-data-[pressed]:w-6 group-data-[checked]:group-data-[pressed]:ml-3 
          group-data-[checked]:group-data-[pressed]:w-6`, classNames?.thumb)
        }
        />
      </div>
      {children}
    </label>
  )
})

Switch.displayName = 'Switch'
