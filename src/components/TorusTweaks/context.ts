import { CHANGE_RATE, HALF_PI, PI } from '@/constants/constants'
import { COLOR_MANAGEMENT_ITEM_VALUES } from './Tweaks/constants'
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
  const [luminance, setLuminance] = React.useState(torus.getLuminanceEnhance)
  const [colored, setColored] = React.useState(false)
  const [redChannel, setRedChannel] = React.useState([torus.getRedChannel.min, torus.getRedChannel.max])
  const [greenChannel, setGreenChannel] = React.useState([torus.getGreenChannel.min, torus.getGreenChannel.max])
  const [blueChannel, setBlueChannel] = React.useState([torus.getBlueChannel.min, torus.getBlueChannel.max])

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

  const handleLuminanceChange = (value: number) => {
    setLuminance(value)
    torus.setLuminanceEnhance(value)
  }

  const handleColoredChange = (value: string) => {
    const isColored = value === COLOR_MANAGEMENT_ITEM_VALUES[1]
    setColored(isColored)
    torus.setColored(isColored)
  }

  const handleRedChannelChange = (value: number[]) => {
    setRedChannel(value)
    torus.setRedChannel(value[0], value[1])
  }
  const handleGreenChannelChange = (value: number[]) => {
    setGreenChannel(value)
    torus.setGreenChannel(value[0], value[1])
  }
  const handleBlueChannelChange = (value: number[]) => {
    setBlueChannel(value)
    torus.setBlueChannel(value[0], value[1])
  }

  return {
    torus,
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
    luminance,
    colored,
    redChannel,
    greenChannel,
    blueChannel,
    setColored,
    setXMovement,
    setYMovement,
    setTheta,
    setPhi,
    setOuterRadius,
    setInnerRadius,
    setFieldOfView,
    setDistanceTorus,
    setLuminance,
    setRedChannel,
    setGreenChannel,
    setBlueChannel,
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
    handleLuminanceChange,
    handleColoredChange,
    handleRedChannelChange,
    handleGreenChannelChange,
    handleBlueChannelChange
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