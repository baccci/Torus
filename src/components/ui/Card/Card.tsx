import { cn } from '@/lib/tailwindClassMerge'
import React, { type DetailedHTMLProps } from 'react'

interface TextBlockProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<TextBlockProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('bg-black rounded-xl border border-borderblack p-4 lg:p-6', className)}
      {...props}
    >
      {children}
    </div>
  )
}
