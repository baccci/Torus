import getChildrenOnDisplayName from '@/lib/getComponentChildrens'
import { useEffect, useMemo, useState } from 'react'

export const useSizes = (
  children: React.ReactNode,
  wrapperRef: React.RefObject<HTMLDivElement>
) => {
  const rawSliders = useMemo(() => getChildrenOnDisplayName(children, 'Slider'), [children])
  const [sizes, setSizes] = useState<number[]>([])

  useEffect(() => {
    if (!wrapperRef.current || sizes.length) return

    const wrapperSize = wrapperRef.current?.getBoundingClientRect().width || 1
    const rawSlidersLength = rawSliders.length || 1
    const sliderWidth = wrapperSize / rawSlidersLength
    const initialSizes = rawSliders.map((_) => sliderWidth)

    setSizes(initialSizes)
  }, [wrapperRef.current])


  return { sizes, setSizes }
}