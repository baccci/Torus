import { cn } from '@/lib/tailwindClassMerge'
import React, { type DetailedHTMLProps } from 'react'

interface ItemProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string
  className?: string
}

export const Item: React.FC<ItemProps> = ({ children, id, className, ...other }) => {
  return (
    <div className={cn('w-full mt-6', className)} id={id} role='tabpanel' {...other}>
      {children}
    </div>
  )
}
Item.displayName = 'Item'