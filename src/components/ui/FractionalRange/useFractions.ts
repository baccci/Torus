import { numberToFixed } from '@/lib/numberToFixed'
import React, { useEffect } from 'react'
import Decimal from 'decimal.js'
import { valueToX, xToValue } from './utils'
import type { FractionalContextType } from './context'

export const useFractions = ({
  max,
  min,
  step,
  value:
  _value,
  containerRef,
  fractionRef,
  onChange,
  translateX,
  setTranslateX
}: FractionalContextType) => {
  const [mounted, setMounted] = React.useState(false)
  const value = _value || 0

  useEffect(() => {
    if (!mounted) return
    const inputValue = xToValue({
      xValue: translateX,
      containerRef,
      fractionRef,
      min,
      max,
      step
    })

    const inputValueToFixed = numberToFixed(inputValue, 2)
    if (!onChange) return

    const valueReminder = new Decimal(inputValueToFixed).mod(step)
    const safeValue = new Decimal(inputValueToFixed).minus(valueReminder).toNumber()

    if (safeValue > max) {
      setTranslateX(translateX + 2)
      return onChange(max)
    }
    if (safeValue < min) {
      setTranslateX(translateX - 2)
      return onChange(min)
    }

    onChange(safeValue)
  }, [translateX])

  useEffect(() => {
    if (!containerRef.current || !fractionRef.current) return

    const xTranlation = valueToX({
      inputValue: value,
      containerRef,
      fractionRef,
      min,
      max,
      step
    })

    setTranslateX(xTranlation)
    setMounted(true)
  }, [containerRef, fractionRef])

  const totalMarks = (max - min) / step
  const fractionsArray = [...Array(totalMarks + 1)].map((_, i) => i)

  return {
    fractionsArray
  }
}