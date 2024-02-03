import { cn } from '@/lib/tailwindClassMerge'
import React from 'react'

interface IndicatorDotProps {
  activeColor?: string
  disabled?: boolean
}

export const IndicatorDot: React.FC<IndicatorDotProps> = ({ activeColor, disabled }) => {
  return (
    <span
      className={'size-1 rounded-full absolute bottom-[10px] left-1/2 -translate-x-[25%]'}
      style={{ backgroundColor: !disabled ? activeColor || '#fff' : '#6d6d6d' }}
    />
  )
}
