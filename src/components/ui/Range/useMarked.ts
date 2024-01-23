import React, { useEffect } from 'react'
import type { MarkedProps } from './Marked'
import { numberToFixed } from '@/lib/numberToFixed'
import { floatSafeRemainder } from '@/lib/floatSafeRemainder'
import Decimal from 'decimal.js'

type UseMarkedArgs = MarkedProps & {
  markedRef: React.RefObject<HTMLDivElement>
}

export const useMarked = ({ max, min, step, value: _value, containerRef, markedRef, onChangeMark }: UseMarkedArgs) => {
  const [translateX, setTranslateX] = React.useState(0)
  const [clicking, setClicking] = React.useState(false)

  const value = _value || 0
  const relativeValue = (value - min) / step
  const stepAmount = (max - min) / step

  useEffect(() => {
    const markedWidth = markedRef.current?.offsetWidth || 1
    const containerWidth = containerRef.current?.offsetWidth || 1
    const relInputValue = -((translateX * stepAmount) - ((containerWidth * stepAmount) / 2)) / markedWidth
    const inputValue = relInputValue * step + min

    const inputValueToFixed = numberToFixed(inputValue, 2)
    if (!onChangeMark) return

    const valueReminder = new Decimal(inputValueToFixed).mod(step)
    const safeValue = new Decimal(inputValueToFixed).minus(valueReminder).toNumber()

    if (safeValue > max) return onChangeMark(max)
    if (safeValue < min) return onChangeMark(min)

    onChangeMark(safeValue)
  }, [translateX])

  useEffect(() => {
    if (!containerRef.current || !markedRef.current) return
    const containerWidth = containerRef.current.offsetWidth
    const markedWidth = markedRef.current.offsetWidth

    const xTranlation = (containerWidth / 2) - (markedWidth * relativeValue / stepAmount)
    setTranslateX(xTranlation)
  }, [containerRef, markedRef])

  const totalMarks = (max - min) / step
  const marksArray = [...Array(totalMarks + 1)].map((_, i) => i)

  return {
    translateX,
    clicking,
    setClicking,
    totalMarks,
    marksArray,
    setTranslateX
  }
}