import type { DetailedHTMLProps } from 'react'
import type { ValueProps } from './Value'
import type { IndicatorDotProps } from './IndicatorDot'
import type { LabelProps as LabelComponentProps } from './Label'

export type DetailedProps = Omit<DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange'>

type LabelProps = {
  label: React.ReactNode
  'aria-label': string
} | {
  label: string
  'aria-label'?: string
}

export type FractionalRangeType = React.FC<FractionalRangeProps> & {
  Titlebar: React.FC<DetailedProps>
  Label: React.FC<LabelComponentProps>
  Value: React.FC<ValueProps>
  IndicatorDot: React.FC<IndicatorDotProps>
}

export type Layout = 'none' | 'indicators' | 'shadows' | 'full'

export type FractionalRangeProps = DetailedProps & {
  min: number
  max: number
  step: number
  value?: number
  initialValue?: number
  id: string
  className?: string
  onChange?: (value: number) => void
  color?: string
  activeColor?: string
  disabled?: boolean
  sound?: boolean
  fragmentClassName?: string
  layout?: Layout
} & LabelProps