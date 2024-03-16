import React from 'react'
import { cn } from '@/lib/tailwindClassMerge'
import type { LineProps } from './types'

export const Line: React.FC<LineProps> = ({ orientation, lines }) => {
  if (!lines) return null
  const renderLine = orientation === lines ||
    lines === 'both' ||
    lines === true

  if (!renderLine) return null
  return (
    <span
      className={cn(
        'bg-[var(--line-color)] h-[1px] w-full absolute top-1/2 left-0',
        { 'w-[1px] h-full left-1/2 top-0': orientation === 'vertical' }
      )}
    />
  )
}

Line.displayName = 'Line'
