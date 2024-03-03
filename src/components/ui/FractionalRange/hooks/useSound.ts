import React from 'react'
import { Howl } from 'howler'

export const useSound = (value: number | undefined, allowSound: boolean) => {
  React.useLayoutEffect(() => {
    if (!value || !allowSound) return

    const sound = new Howl({
      src: '/tick.mp3'
    })

    sound.play()
  }, [value, allowSound])
}