import React from 'react'
import getChildrenOnDisplayName from '@/lib/getComponentChildrens'
import { THUMB_DISPLAY_NAME, Thumb } from '../Thumb'
import type { RectReadOnly } from 'react-use-measure'
import type { ThumbProps } from '../types'

interface UseThumbProps {
  children: React.ReactNode
  bounds: RectReadOnly
}

export const useThumb = ({ children }: UseThumbProps) => {
  const thumbs = React.useMemo(() => getChildrenOnDisplayName<ThumbProps>(children, THUMB_DISPLAY_NAME), [children])

  const newThumb = thumbs?.[0]
    ? React.cloneElement(thumbs[0])
    : <Thumb />

  return newThumb
}