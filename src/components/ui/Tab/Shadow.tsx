
import { cn } from '@/lib/tailwindClassMerge'
import React, { type DetailedHTMLProps } from 'react'

interface ShadowProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  getVisibleSides: () => { left: boolean, right: boolean }
  side: 'left' | 'right',
  className?: string
}

export const Shadow: React.FC<ShadowProps> = ({ getVisibleSides, side, className, ...rest }) => {
  return (
    <div
      className={cn('absolute top-0 bg-gradient-to-r from-slate-600 to-transparent h-full w-6 pointer-events-none transition-opacity duration-300 opacity-0',
        { 'left-0': side === 'left' },
        { 'right-0': side === 'right' },
        { 'opacity-100': getVisibleSides()?.[side] },
        { 'rotate-180': side === 'right' },
        className
      )}
      {...rest}
    />
  )
}
