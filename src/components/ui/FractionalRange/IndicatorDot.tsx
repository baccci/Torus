import React from 'react'
import { useFractionalRangeContext } from './context'

export const IndicatorDot: React.FC = () => {
  const { activeColor, disabled } = useFractionalRangeContext()
  return (
    <span
      className={'size-1 rounded-full absolute bottom-[10px] left-1/2 -translate-x-[25%]'}
      style={{ backgroundColor: !disabled ? activeColor || '#fff' : '#6d6d6d' }}
    />
  )
}
