import React from 'react'
import { Howl } from 'howler'

export const useSound = (value?: number) => {
  React.useEffect(() => {
    if (!value) return

    const sound = new Howl({
      src: '/tick.mp3'
    })

    sound.play()
  }, [value])
}