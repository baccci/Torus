import React from 'react'

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