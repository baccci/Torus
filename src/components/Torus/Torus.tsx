import TorusModel from '../../models/Torus'
import React from 'react'
import { useCanvasContext } from './hooks'

interface TorusProps {
  torus: TorusModel
}

export const Torus: React.FC<TorusProps> = ({ torus }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const ctx = useCanvasContext({ canvasRef })
  torus.setContext(ctx)

  torus.draw()

  const handleStopMovement = (e: React.MouseEvent<HTMLCanvasElement>) => torus.setCliking(false)
  const handleStartMovement = (e: React.MouseEvent<HTMLCanvasElement>) => torus.setCliking(true)
  const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    torus.mouseMove(e)
  }

  return (
    <section className='w-full flex flex-col items-center'>
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
