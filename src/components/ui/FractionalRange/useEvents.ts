import { useEffect, useState } from 'react'
import type { FractionalContextType } from './context'

export const useEvents = ({ fractionRef, step, disabled, setTranslateX, translateX }: FractionalContextType) => {
  const [clicking, setClicking] = useState(false)
  const [previousTouch, setPreviousTouch] = useState<React.Touch | null>(null)

  const handleInputArrowKeys = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return

    const delta = e.key === 'ArrowLeft' ? 10 : -10
    setTranslateX(prevTranslateX => prevTranslateX + delta)
  }

  const handleBodyMouseMove = (e: MouseEvent) => {
    if (!clicking || disabled) return
    const movementX = e.movementX

    setTranslateX(previuousX => {
      const delta = previuousX + movementX
      return delta
    })
  }

  const handleBodyPointerUp = () => {
    if (!clicking) return
    setClicking(false)
  }

  const handleFractionPointerDown = () => {
    if (disabled) return
    setClicking(true)
  }

  const handleInputTouchMove = (e: TouchEvent) => {
    if (disabled) return
    const touch = e.touches[0]

    if (previousTouch) {
      const movementX = touch.pageX - previousTouch.pageX
      const delta = (movementX) + translateX

      setTranslateX(delta)
    }

    setPreviousTouch(touch)
  }

  const handleInputTouchEnd = () => {
    setPreviousTouch(null)
  }


  const handleInputWheel = (e: WheelEvent) => {
    if (disabled) return
    e.preventDefault()
    const delta = e.deltaY * step * 2

    setTranslateX(prevTranslateX => prevTranslateX + delta)
  }

  useEffect(() => {
    const body = document.querySelector('body')
    if (!fractionRef.current || !body || disabled) return

    body.addEventListener('mousemove', handleBodyMouseMove)
    body.addEventListener('mouseup', handleBodyPointerUp)
    fractionRef.current.addEventListener('mousedown', handleFractionPointerDown)

    // To listen the wheel event as not passive, in order to preventDefault on it
    fractionRef.current.addEventListener('wheel', handleInputWheel, { passive: false })

    // The only way touch event listeners works in iOS 15 so far
    fractionRef.current.addEventListener('touchmove', handleInputTouchMove, { passive: true })
    fractionRef.current.addEventListener('touchend', handleInputTouchEnd)

    return () => {
      if (!fractionRef.current) return

      body.removeEventListener('mousemove', handleBodyMouseMove)
      body.removeEventListener('mouseup', handleBodyPointerUp)
      fractionRef.current.removeEventListener('wheel', handleInputWheel)
      fractionRef.current.removeEventListener('mousedown', handleFractionPointerDown)
      fractionRef.current.removeEventListener('touchmove', handleInputTouchMove)
      fractionRef.current.removeEventListener('touchend', handleInputTouchEnd)
    }
  }, [fractionRef, previousTouch, clicking])


  return {
    clicking,
    setClicking,
    setTranslateX,
    handleInputArrowKeys
  }
}