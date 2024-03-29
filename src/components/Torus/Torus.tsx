import TorusModel from '../../models/Torus'
import React from 'react'
import { useCanvasContext, useIsSticky } from './hooks'
import { cn } from '@/lib/tailwindClassMerge'

interface TorusProps {
  torus: TorusModel
}

export const Torus: React.FC<TorusProps> = ({ torus }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const ctx = useCanvasContext({ canvasRef })
  const isSticky = useIsSticky(canvasRef)
  torus.setContext(ctx)
  torus.setCanvasRef(canvasRef)

  torus.draw()

  const handleStopMovement = () => torus.setCliking(false)
  const handleStartMovement = () => torus.setCliking(true)
  const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    torus.mouseMove(e)
  }

  return (
    <section className={cn(
      'w-[85%] sm:w-[clamp(400px,85%,800px)] flex flex-col items-center rounded-2xl z-[2] m-2 mt-0 sticky top-[-1px] transition-colors duration-500',
      { 'bg-[#15151D]': isSticky },
      { 'before:absolute before:inset-0 before:rounded-2xl before:border-[1px] before:border-[#211a3c] sm:before:[content:none]': isSticky }
    )}>
      <canvas
        id='torus-canvas'
        className='w-full max-w-[500px]'
        width='500px'
        height='500px'
        onMouseUp={handleStopMovement}
        onMouseLeave={handleStopMovement}
        onMouseDown={handleStartMovement}
        onMouseMove={handleMove}
        ref={canvasRef}
        key={'torus-canvas'}
      >
      </canvas>
    </section>
  )
}
