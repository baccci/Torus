import type { Torus } from '@/models/Torus'
import React, { useEffect } from 'react'
import { HALF_PI, PI, CHANGE_RATE } from '@/constants/constants'

export const useTweaks = (torus: Torus) => {
  const [xFixedValue, setXFixedValue] = React.useState(HALF_PI)
  const [xFixedValueDisplay, setXFixedValueDisplay] = React.useState<string>(xFixedValue.toString())
  const [yFixedValue, setYFixedValue] = React.useState(HALF_PI)
  const [yFixedValueDisplay, setYFixedValueDisplay] = React.useState<string>(xFixedValue.toString())
  const [xMovement, setXMovement] = React.useState(0)
  const [yMovement, setYMovement] = React.useState(0)
  const [thethaIncrement, setThethaIncrement] = React.useState(0.3)
  const [phiIncrement, setPhiIncrement] = React.useState(0.1)
  const [outerRadius, setOuterRadius] = React.useState(1)
  const [innerRadius, setInnerRadius] = React.useState(2)
  const [fieldOfView, setFieldOfView] = React.useState(250)
  const [distanceTorus, setDistanceTorus] = React.useState(5)

  // Display π symbols instead of numbers
  useEffect(() => {
    if (xFixedValue === HALF_PI) return setXFixedValueDisplay('π/2')
    if (xFixedValue === PI) return setXFixedValueDisplay('π')

    setXFixedValueDisplay(xFixedValue.toString())
  }, [xFixedValue])

  // Display π symbols instead of numbers
  useEffect(() => {
    if (yFixedValue === HALF_PI) return setYFixedValueDisplay('π/2')
    if (yFixedValue === PI) return setYFixedValueDisplay('π')

    setYFixedValueDisplay(yFixedValue.toString())
  }, [yFixedValue])

  // Fix the values to π/2 when they are close to it
  useEffect(() => {
    if (xFixedValue > HALF_PI - CHANGE_RATE && xFixedValue < HALF_PI + CHANGE_RATE) {
      setXFixedValue(HALF_PI)
      setXFixedValueDisplay('π/2')
    }

    if (yFixedValue > HALF_PI - CHANGE_RATE && yFixedValue < HALF_PI + CHANGE_RATE) {
      setYFixedValue(HALF_PI)
      setYFixedValueDisplay('π/2')
    }
  }, [xFixedValue, yFixedValue])

  const handleChangeXFixedValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setXFixedValue(value)
    torus.setXRotation(value)
  }

  const handleChangeYFixedValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setYFixedValue(value)
    torus.setYRotation(value)
  }

  const handleChangeXMovement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setXMovement(value)
    torus.setXIncrement(value)
  }

  const handleChangeYMovement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setYMovement(value)
    torus.setYIncrement(value)
  }

  const handleChangeThethaIncrement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setThethaIncrement(value)
    torus.setThetaIncrement(value)
  }

  const handleChangePhiIncrement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setPhiIncrement(value)
    torus.setPhiIncrement(value)
  }

  const handleOuterRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setOuterRadius(value)
    torus.setOuterRadius(value)
  }

  const handleInnerRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setInnerRadius(value)
    torus.setInnerRadius(value)
  }

  const handleFieldOfViewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setFieldOfView(value)
    torus.setFieldOfView(value)
  }

  const handleDistanceTorusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setDistanceTorus(value)
    torus.setDistanceTorus(value)
  }

  return {
    xFixedValue,
    xFixedValueDisplay,
    yFixedValue,
    yFixedValueDisplay,
    xMovement,
    yMovement,
    thethaIncrement,
    phiIncrement,
    outerRadius,
    innerRadius,
    fieldOfView,
    distanceTorus,
    handleChangeXFixedValue,
    handleChangeYFixedValue,
    handleChangeXMovement,
    handleChangeYMovement,
    handleChangeThethaIncrement,
    handleChangePhiIncrement,
    handleOuterRadiusChange,
    handleInnerRadiusChange,
    handleFieldOfViewChange,
    handleDistanceTorusChange,
  }
}