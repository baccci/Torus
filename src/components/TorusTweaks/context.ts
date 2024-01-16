import { CHANGE_RATE, HALF_PI, PI } from '@/constants/constants'
import type Torus from '@/models/Torus'
import React from 'react'

export const useTweaks = (torus: Torus) => {
  const [xFixedValue, setXFixedValue] = React.useState(HALF_PI)
  const [yFixedValue, setYFixedValue] = React.useState(PI)
  const [xMovement, setXMovement] = React.useState(0)
  const [yMovement, setYMovement] = React.useState(0)
  const [theta, setTheta] = React.useState(torus.getThetaIncrement)
  const [phi, setPhi] = React.useState(torus.getPhiIncrement)
  const [outerRadius, setOuterRadius] = React.useState(torus.getOuterRadius)
  const [innerRadius, setInnerRadius] = React.useState(torus.getInnerRadius)
  const [fieldOfView, setFieldOfView] = React.useState(torus.getFieldOfView)
  const [distanceTorus, setDistanceTorus] = React.useState(torus.getDistanceTorus)

  const handleChangeXFixedValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    if (value > HALF_PI - CHANGE_RATE && value < HALF_PI + CHANGE_RATE) {
      setXFixedValue(HALF_PI)
      torus.setXRotation(HALF_PI)
      return
    }
    setXFixedValue(value)
    torus.setXRotation(value)
  }

  const handleChangeYFixedValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    if (value > HALF_PI) {
    }
    if (value > HALF_PI - CHANGE_RATE && value < HALF_PI + CHANGE_RATE) {
      setYFixedValue(HALF_PI)
      torus.setYRotation(HALF_PI)
      return
    }
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
    setTheta(value)
    torus.setThetaIncrement(value)
  }

  const handleChangePhiIncrement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setPhi(value)
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
    yFixedValue,
    xMovement,
    yMovement,
    theta,
    phi,
    outerRadius,
    innerRadius,
    fieldOfView,
    distanceTorus,
    setXMovement,
    setYMovement,
    setTheta,
    setPhi,
    setOuterRadius,
    setInnerRadius,
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

export type UseTweaksContext = ReturnType<typeof useTweaks> | null

export const TweaksContext = React.createContext<UseTweaksContext>(null)

export const useTweaksContext = () => {
  const context = React.useContext(TweaksContext)
  if (!context) {
    throw new Error('useTweaksContext must be used within a TweaksProvider')
  }
  return context
}