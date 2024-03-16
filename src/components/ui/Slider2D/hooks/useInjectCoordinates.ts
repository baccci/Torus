import React from 'react'

interface UseInjectCoordinatesArgs {
  coordinates: {
    x: number
    y: number
  } | null,
  buttonRef: React.RefObject<HTMLButtonElement>
}

export const useInjectCoordinates = ({ coordinates, buttonRef }: UseInjectCoordinatesArgs) => {
  const injectCoordinates = React.useCallback(() => {
    if (!buttonRef.current || !coordinates) return

    const { x, y } = coordinates
    const buttonHalfWidth = buttonRef.current?.offsetWidth / 2 || 0
    const buttonHalfHeight = buttonRef.current?.offsetHeight / 2 || 0
    buttonRef.current.style.setProperty('--x', `${x - buttonHalfWidth}px`)
    buttonRef.current.style.setProperty('--y', `${y - buttonHalfHeight}px`)
  }, [buttonRef, coordinates])

  injectCoordinates()
}