import type React from 'react'

type AnchorValue = number | null
export type AnchorTuple = AnchorValue | [AnchorValue, AnchorValue]
export type Values = [number, number]
type Lines = 'horizontal' | 'vertical' | 'both' | boolean

interface Slider2DCoreProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange'> {
  size?: number
  values?: Values
  onChange?: (values: Values) => void
  min: number | Array<number>
  max: number | Array<number>
  initialValues?: Values
  label?: string
  valuesDebounce?: number | boolean
  lines?: Lines
}

export type Slider2DProps = Slider2DCoreProps & { anchorMargin?: number; anchorValues?: AnchorTuple[] }
export type ThumbProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export interface TitlebarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode
}

export interface TitleProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode
}

export interface LineProps {
  orientation: 'horizontal' | 'vertical'
  lines?: Lines
}

export type Slider2DType = React.FC<Slider2DProps> & {
  Thumb: React.FC<ThumbProps>
}
