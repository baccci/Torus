import React from 'react'
import { type Target, useMove } from '@use-gesture/react'
import type SliderState from '../models/SliderState'

export type SliderGestureState = {
  dragging: boolean
  sliderIndex: number | null
  dx: number
  x: number | null
  sliderX: number | null
}

interface UseGesturesArgs {
  api: SliderState
  arrowKeyMajorStep?: number
  arrowKeyMinorStep?: number
}

export const useGestures = ({ api, arrowKeyMajorStep, arrowKeyMinorStep }: UseGesturesArgs) => {
  const bodyElement = document.querySelector('body')
  const [sliderGestureState, setSliderGestureState] = React.useState<SliderGestureState>({
    dragging: false,
    sliderIndex: null,
    sliderX: null,
    dx: 0,
    x: null
  })

  useMove(
    function handleBodyMouseMove({ delta: [dx], xy: [x] }) {
      if (!sliderGestureState.dragging) return

      api.updateWidthsWithDelta(dx, sliderGestureState.sliderIndex)
    },
    { target: bodyElement as Target }
  )

  const handleSliderPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const sliderIndex = Number(e.currentTarget.dataset.index) || 0
    setSliderGestureState(prevState => ({ ...prevState, sliderIndex: sliderIndex, dragging: true }))
  }

  const handleSliderPointerUp = () => {
    setSliderGestureState(prevState => ({ ...prevState, dragging: false }))
  }

  const handleSliderTouchMove = React.useCallback((e: TouchEvent) => {
    if (!sliderGestureState.dragging) return
    if (!sliderGestureState.sliderIndex && sliderGestureState.sliderIndex !== 0) return
    e.preventDefault()

    const x = e.touches[0].clientX
    api.updateWidthsWithAbsoluteValue(x, sliderGestureState.sliderX, sliderGestureState.sliderIndex)
    setSliderGestureState(prevState => ({ ...prevState, x }))
  }, [sliderGestureState.dragging, sliderGestureState.sliderIndex, sliderGestureState.sliderX, api])

  const handleSliderTouchEnd = React.useCallback(() => {
    setSliderGestureState(prevState => ({ ...prevState, dragging: false, sliderX: null, x: null }))
  }, [])

  const handleSliderTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const sliderIndex = Number(e.currentTarget.dataset.index)
    const sliderX = e.currentTarget.getBoundingClientRect().x
    if (!sliderIndex && sliderIndex !== 0) return

    setSliderGestureState(prevState => ({ ...prevState, sliderIndex: sliderIndex, dragging: true, sliderX }))
  }

  const handleSliderArrowKeys = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const sliderIndex = Number(e.currentTarget.dataset.index)
    const minorStep = arrowKeyMinorStep ?? 1
    const majorStep = arrowKeyMajorStep ?? 10

    const value = e.altKey || e.shiftKey
      ? majorStep
      : minorStep

    const key = e.key

    const action = {
      'ArrowLeft': () => api.addToValue(sliderIndex, - value),
      'ArrowRight': () => api.addToValue(sliderIndex, + value),
      'Home': () => api.setValueToMin(sliderIndex),
      'End': () => api.setValueToMax(sliderIndex)
    }[key]

    if (action) {
      e.preventDefault()
      action()
    }
  }

  React.useEffect(function mobileTouchListenersOnMount() {
    bodyElement?.addEventListener('touchmove', handleSliderTouchMove, { passive: false })
    bodyElement?.addEventListener('touchend', handleSliderTouchEnd)
    bodyElement?.addEventListener('pointerup', handleSliderPointerUp)

    return () => {
      bodyElement?.removeEventListener('touchmove', handleSliderTouchMove)
      bodyElement?.removeEventListener('touchend', handleSliderTouchEnd)
      bodyElement?.removeEventListener('pointerup', handleSliderPointerUp)
    }
  }, [bodyElement, handleSliderTouchMove, handleSliderTouchEnd])

  return [
    {
      onPointerDown: handleSliderPointerDown,
      onTouchStart: handleSliderTouchStart,
      onKeyDown: handleSliderArrowKeys
    },
    sliderGestureState
  ] as const
}