import type React from 'react'
import type { DetailedHTMLProps } from 'react'

interface SelectorProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode
  selected?: string
  onSelectedChange?: (value: string) => void
  label?: string
}

export interface ItemProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode
  className?: string
  selected?: boolean
  value: string
  title?: string
}

export type SelectorComponent = React.FC<SelectorProps> & {
  Item: React.ForwardRefExoticComponent<Omit<ItemProps, 'ref'> & React.RefAttributes<HTMLDivElement>>
}
