import { cn } from '@/lib/tailwindClassMerge'
import React from 'react'

interface IndicatorDotProps {
  activeColor?: string
}

export const IndicatorDot: React.FC<IndicatorDotProps> = ({ activeColor }) => {
  return (
    <span
      className={'size-1 rounded-full absolute bottom-[10px] left-1/2 -translate-x-[25%]'}
      style={{ backgroundColor: activeColor || '#fff' }}
    />
  )
}
