import React from 'react'
import type { SliderApi } from '../context'

interface UseGesturesArgs {
  api: SliderApi,
  sliderRef: React.RefObject<HTMLDivElement>
}

export const useGestures = ({ api }: UseGesturesArgs) => {
  const [sliderElement, setSliderElement] = React.useState<HTMLDivElement | null>(null)
  const bodyElement = document.querySelector('body')

  const sendCoordinates = React.useCallback((clientX: number, clientY: number, element: HTMLDivElement | null) => {
    if (!element) return
    const bounds = element.getBoundingClientRect()
    api.setCoordinate(clientX, clientY, bounds)
  }, [api])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!sliderElement) setSliderElement(event.currentTarget)

    api.setDragging(true)
    sendCoordinates(event.clientX, event.clientY, event.currentTarget)
  }

  const handlePointerUp = React.useCallback(() => {
    api.setDragging(false)
  }, [api])

  const handlePointerMove = React.useMemo(() => (event: PointerEvent) => {
    if (!api.getDragging()) return

    event.preventDefault()
    sendCoordinates(event.clientX, event.clientY, sliderElement)
  }, [api, sliderElement, sendCoordinates])

  const handleTouchMove = React.useMemo(() => (event: TouchEvent) => {
    if (!api.getDragging()) return

    event.preventDefault()
    sendCoordinates(event.touches[0].clientX, event.touches[0].clientY, sliderElement)
  }, [api, sliderElement, sendCoordinates])

  React.useEffect(() => {
    bodyElement?.addEventListener('pointermove', handlePointerMove, { passive: false })
    bodyElement?.addEventListener('touchmove', handleTouchMove, { passive: false })
    bodyElement?.addEventListener('pointerup', handlePointerUp)

    return () => {
      bodyElement?.removeEventListener('pointermove', handlePointerMove)
      bodyElement?.removeEventListener('touchmove', handleTouchMove)
      bodyElement?.removeEventListener('pointerup', handlePointerUp)
    }
  }, [bodyElement, handlePointerUp, handleTouchMove, handlePointerMove])

  return {
    onPointerDown: handlePointerDown
  }
}