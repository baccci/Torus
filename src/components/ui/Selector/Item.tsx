import { cn } from '@/lib/tailwindClassMerge'
import { forwardRef } from 'react'
import type { ItemProps } from './types'

export const ITEM_NAME = 'Item'

export const Item = forwardRef<HTMLDivElement, ItemProps>(function Item(props, ref) {
  const { children, className, selected, value, title, ...rest } = props
  return (
    <div
      className={cn(
        'h-full flex items-center justify-center min-w-10 select-none cursor-pointer opacity-70 z-[1] px-1.5 transition-opacity duration-200 ease-out',
        { 'opacity-100': selected },
        className
      )}
      ref={ref}
      title={title ?? value}
      role='tab'
      aria-selected={selected}
      aria-label={value}
      {...rest}
    >
      {children}
    </div>
  )
})

Item.displayName = ITEM_NAME
