import type { UseSliderArgs } from './useSlider'

interface useEventHandlersArgs extends UseSliderArgs {
  updateSizes: (movement: number, index: number) => void
  clicking: boolean
  setClicking: (clicking: boolean) => void
  sliderIndex: number | null
  setSliderIndex: (index: number) => void
  lastX: number | null
  setLastX: (x: number | null) => void
}

export const useEventHandlers = ({
  wrapperRef,
  disabled,
  max,
  updateSizes,
  clicking,
  setClicking,
  sliderIndex,
  setSliderIndex,
  lastX,
  setLastX
}: useEventHandlersArgs) => {
  const handleSliderKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return
    if (disabled) return
    const { key } = e
    if (key !== 'ArrowRight' && key !== 'ArrowLeft') return

    const wrapperWidth = wrapperRef.current.getBoundingClientRect().width
    const minMovement = wrapperWidth / parseInt(`${max}`)

    const index = Number(e.currentTarget.dataset.index)
    if (!index && index !== 0) return

    const movement = key === 'ArrowRight' ? minMovement : -minMovement
    updateSizes(movement, index)
  }

  const handleSliderTouchMove = (e: TouchEvent) => {
    if (!clicking) return
    if (!sliderIndex && sliderIndex !== 0) return

    if (lastX) {
      const xMovement = e.touches[0].clientX - lastX
      updateSizes(xMovement, sliderIndex)
    }

    setLastX(e.touches[0].clientX)
  }

  const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setClicking(true)
    const dataIndex = Number(e.currentTarget.dataset.index)

    if (!dataIndex && dataIndex !== 0) return

    setSliderIndex(dataIndex)
  }

  const handleSliderTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setClicking(true)
    const dataIndex = Number(e.currentTarget.dataset.index)

    if (!dataIndex && dataIndex !== 0) return

    setSliderIndex(dataIndex)
  }

  const handleSliderMouseMove = (e: MouseEvent) => {
    if (!clicking) return
    if (!sliderIndex && sliderIndex !== 0) return

    const xMovement = e.movementX
    updateSizes(xMovement, sliderIndex)
  }

  return {
    handleSliderKeyDown,
    handleSliderTouchMove,
    handleSliderMouseDown,
    handleSliderTouchStart,
    handleSliderMouseMove
  }
}