import React from 'react'

export const useScrollShadow = (disableShadow?: boolean) => {
  const [scrollLeft, setScrollLeft] = React.useState(0)
  const [scrollWidth, setScrollWidth] = React.useState(0)
  const [clientWidth, setClientWidth] = React.useState(0)

  const wrapperRef = React.useRef<HTMLDivElement>(null)

  const onScrollHandler = (event: React.WheelEvent<HTMLDivElement>) => {
    if (disableShadow) return

    setScrollLeft(event.currentTarget.scrollLeft)
    setScrollWidth(event.currentTarget.scrollWidth)
    setClientWidth(event.currentTarget.clientWidth)
  }

  React.useEffect(() => {
    const resetRefSizes = (ref: React.RefObject<HTMLDivElement>) => {
      if (!ref.current || disableShadow) return

      setScrollLeft(ref.current.scrollLeft)
      setScrollWidth(ref.current.scrollWidth)
      setClientWidth(ref.current.clientWidth)
    }

    resetRefSizes(wrapperRef)
  }, [wrapperRef?.current?.clientWidth, disableShadow])

  const getVisibleSides = () => {
    if (disableShadow) return { left: false, right: false }

    const isLeft = clientWidth === scrollWidth - scrollLeft
    const isRight = scrollLeft === 0
    const isBetween = scrollLeft > 0 && clientWidth < scrollWidth - scrollLeft

    const left = (isLeft || isBetween) && !(isRight && isLeft)
    const right = (isRight || isBetween) && !(isRight && isLeft)

    return {
      left,
      right
    }
  }

  return {
    wrapperRef,
    onScrollHandler,
    getVisibleSides
  }
}