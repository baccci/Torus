import type React from 'react'
import type { DetailedHTMLProps } from 'react'

export type MultiSliderProps =
  DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  & {
    min: number | string
    max: number | string
    onValueChange?: (values: number[]) => void
    disabled?: boolean
    values?: number[]
    initialValues?: number[]
    arrowKeyMinorStep?: number
    arrowKeyMajorStep?: number
  }

export interface SliderProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    index?: number
    draggingThis?: boolean
    childClassName?: string
    disabled?: boolean
    min?: number | string
    max?: number | string
    isLast?: boolean
    zIndex?: number
  }

export type MultiSliderType = React.FC<MultiSliderProps> & { Slider: React.ForwardRefExoticComponent<Omit<SliderProps, 'ref'> & React.RefAttributes<HTMLDivElement>> }

export type Width = { width: number }
export type Widths = Width[]