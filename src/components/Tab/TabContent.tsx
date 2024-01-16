import { cn } from '@/lib/tailwindClassMerge'
import React, { type DetailedHTMLProps } from 'react'

interface TabContentProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: string
  className?: string
}

export const TabContent: React.FC<TabContentProps> = ({ children, value, className, ...other }) => {
  return (
    <div className={cn('w-full mt-8', className)} {...other}>
      {children}
    </div>
  )
}
TabContent.displayName = 'TabContent'