import React, { useEffect } from 'react'

interface UseSelectedItemDataArgs {
  selectedRef: React.MutableRefObject<HTMLDivElement | null>
  selected: string
}

export const useSelectedItemData = ({ selectedRef, selected }: UseSelectedItemDataArgs) => {
  const [xCoord, setXCoord] = React.useState<number>(0)
  const [width, setWidth] = React.useState<number>(0)

  useEffect(() => {
    if (!selectedRef.current) return

    const { x, width } = selectedRef.current.getBoundingClientRect()
    const parentElement = selectedRef.current.parentElement
    const parentX = parentElement?.getBoundingClientRect().x || 0
    const xRelativeToParent = x - parentX

    setXCoord(xRelativeToParent - 1 || 0)
    setWidth(width || 0)
  }, [selected])

  return { xCoord, width }
}