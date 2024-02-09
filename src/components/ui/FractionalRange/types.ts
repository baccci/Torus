import type { DetailedHTMLProps } from 'react'

export type DetailedProps = Omit<DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange'>

type LabelProps = {
  label: React.ReactNode
  'aria-label': string
} | {
  label: string
  'aria-label'?: string
}

export type FractionalRangeProps = DetailedProps & {
  min: number
  max: number
  step: number
  value?: number
  id: string
  className?: string
  onChange?: (value: number) => void
  color?: string
  activeColor?: string
  disabled?: boolean
  sound?: boolean
} & LabelProps