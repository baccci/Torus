import type { DetailedHTMLProps } from 'react'

type MultiSliderProps =
  DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  & {
    min: number | string
    max: number | string
    onValueChange?: (values: number[]) => void
    disabled?: boolean
    values?: number[]
  }

export type MultiSliderType = React.FC<MultiSliderProps> & { Slider: React.ForwardRefExoticComponent<Omit<SliderProps, "ref"> & React.RefAttributes<HTMLDivElement>> }


export interface SliderProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  width?: number | string
  index?: number
  draggingThis?: boolean
  dragging?: boolean
  value?: number
  childClassName?: string
  disabled?: boolean
  min?: number | string
  max?: number | string
  isLast?: boolean
}