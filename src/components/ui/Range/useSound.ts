import React from 'react'

export const useSound = (value?: number) => {
  React.useEffect(() => {
    if (!value) return

    const sound = new Audio('/tick.mp3')
    sound.play()
  }, [value])
}