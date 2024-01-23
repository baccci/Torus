import { cn } from '@/lib/tailwindClassMerge'
import React, { type DetailedHTMLProps } from 'react'

export interface RootProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

export const Root: React.FC<RootProps> = ({ className, children }) => {
  return (
    <div className={cn('flex flex-col w-full sm:w-[300px] md:w-full lg:w-[45%]', className)}>
      {children}
    </div>
  )
}
