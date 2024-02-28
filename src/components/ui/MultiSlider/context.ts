import React from 'react'
import type { MultiSliderProps } from './types'
import type { RectReadOnly } from 'react-use-measure'
import type { Widths } from './models/Widths'

interface UseMultiSliderArgs extends MultiSliderProps {
  bounds: RectReadOnly
  widths: Widths
  values: number[]
  dragging: boolean
  draggingIndex: number | null
}

export const useMultiSlider = (props: UseMultiSliderArgs) => props

export type MultiSliderType = ReturnType<typeof useMultiSlider> | null

export const MultiSliderContext = React.createContext<MultiSliderType>(null)

export const useMultiSliderContext = () => {
  const context = React.useContext(MultiSliderContext)

  if (!context) {
    throw new Error('useMultiSliderContext must be used within a MultiSliderProvider')
  }

  return context
}