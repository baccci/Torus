import React, { useEffect } from 'react'

interface CanvasContext {
  canvasRef: React.RefObject<HTMLCanvasElement>
}

export const useCanvasContext = ({ canvasRef }: CanvasContext) => {
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null)

  React.useEffect(() => {
    if (canvasRef.current) {
      setContext(canvasRef.current.getContext('2d'))
    }
  }, [canvasRef])

  return context
}

export const useIsSticky = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const [isSticky, setIsSticky] = React.useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const observer = new IntersectionObserver((entries) => {
      const element = entries[0]
      setIsSticky(!element.isIntersecting)
    }, { threshold: [1] })

    observer.observe(canvasRef.current)
  }, [canvasRef])

  return isSticky
}