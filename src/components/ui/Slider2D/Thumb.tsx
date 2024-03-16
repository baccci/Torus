import React from 'react'
import { cn } from '@/lib/tailwindClassMerge'
import { type SliderApi, useSliderContext } from './context'
import { useInjectCoordinates } from './hooks/useInjectCoordinates'
import type { ThumbProps } from './types'

export const THUMB_DISPLAY_NAME = 'Thumb'

export const Thumb: React.FC<ThumbProps> = (props) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const { coordinates, api } = useSliderContext()
  const bind = useKeyboardGestures(api)

  useInjectCoordinates({ coordinates, buttonRef })
  return (
    <button
      ref={buttonRef}
      tabIndex={0}
      aria-label={props['aria-label'] ?? 'Thumb'}
      className={cn(
        'size-4 p-0 m-0 rounded-full bg-[rgb(255,150,70)] transform-gpu translate-x-[var(--x)] translate-y-[var(--y)] z-[2]',
        'hover:cursor-grab hover:outline-0 hover:border-none',
        'focus-visible:outline focus-visible:outline-1 focus-visible:outline-white',
        { 'opacity-0': !coordinates },
        props.className
      )}
      {...bind}
      {...props}
    >
      {props.children}
    </button>
  )
}

Thumb.displayName = THUMB_DISPLAY_NAME

const MOVING_MAGNITUDE = 5

function useKeyboardGestures(api: SliderApi) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
      const direction = event.key === 'ArrowUp' ? -1 : 1
      api.moveY(direction * MOVING_MAGNITUDE)
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      const direction = event.key === 'ArrowLeft' ? -1 : 1
      api.moveX(direction * MOVING_MAGNITUDE)
    }
  }

  return {
    onKeyDown: handleKeyDown
  }
}
