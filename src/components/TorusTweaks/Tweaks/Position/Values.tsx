import React from 'react'
import { numberToFixed } from '@/lib/numberToFixed'
import { useDebounceValues } from './hooks/useDebounceValues'
import { getCoordDisplayValue } from '../../utils'
import { useOnMount } from '@/hooks/useOnMount'

const FIXED_DECIMALS = 2

export type ValuesType = [number, number]
export interface ValuesProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode
  values: ValuesType
  fixedDecimals?: number
  debounce?: number | boolean
  initialValues?: ValuesType
}

export const Values: React.FC<ValuesProps> = ({
  values: _values,
  initialValues,
  className,
  children,
  debounce,
  ...rest
}) => {
  const [mounted, setMounted] = React.useState(false)

  useOnMount(() => {
    setMounted(true)
  }, { effect: 'layout' })

  const values = useDebounceValues(_values, debounce, initialValues, mounted)
  const fixedValues = values.map((v) => numberToFixed(v, FIXED_DECIMALS))
  const xFixedValueDisplay = getCoordDisplayValue(fixedValues[0])
  const yFixedValueDisplay = getCoordDisplayValue(fixedValues[1])
  const valuesDisplay = `(${xFixedValueDisplay}, ${yFixedValueDisplay})`

  return (
    <span className={className} {...rest}>
      {valuesDisplay}
      {children}
    </span>
  )
}

Values.displayName = 'Values'