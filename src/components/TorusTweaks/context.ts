import React from 'react'
import { POINT_SHAPES } from '@/constants/constants'
import { COLOR_MANAGEMENT_ITEM_VALUES } from './Tweaks/constants'
import { useTweaks } from '@/stores/tweaks'
import type Torus from '@/models/Torus'
import type { PointShape } from '@/types/types'

export const useGestures = (torus: Torus) => {
  const {
    setXFixedValue,
    setYFixedValue,
    setXMovement,
    setYMovement,
    setPhi,
    setTheta,
    setOuterRadius,
    setInnerRadius,
    setFieldOfView,
    setDistanceTorus,
    setLuminance,
    setColored,
    setRedChannel,
    setGreenChannel,
    setBlueChannel,
    setPointShape
  } = useTweaks()

  const handleChangeFixedPosition = React.useCallback((values: [number, number]) => {
    setXFixedValue(values[0])
    setYFixedValue(values[1])
    torus.setXRotation(values[1])
    torus.setYRotation(values[0])
  }, [setXFixedValue, setYFixedValue, torus])

  /* const handleChangeXFixedValue = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (value > HALF_PI - CHANGE_RATE && value < HALF_PI + CHANGE_RATE) {
      setYFixedValue(HALF_PI)
      torus.setYRotation(HALF_PI)
      return
    }
    setYFixedValue(value)
    torus.setYRotation(value)
  } */

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

  const handleLuminanceChange = React.useCallback((value: number) => {
    setLuminance(value)
    torus.setLuminanceEnhance(value)
  }, [setLuminance, torus])

  const handleColoredChange = React.useCallback((value: string) => {
    const isColored = value === COLOR_MANAGEMENT_ITEM_VALUES[1]
    setColored(isColored)
    torus.setColored(isColored)
  }, [setColored, torus])

  const handleRedChannelChange = (value: [number, number]) => {
    setRedChannel(value)
    torus.setRedChannel(value[0], value[1])
  }

  const handleGreenChannelChange = React.useCallback((value: [number, number]) => {
    setGreenChannel(value)
    torus.setGreenChannel(value[0], value[1])
  }, [setGreenChannel, torus])

  const handleBlueChannelChange = React.useCallback((value: [number, number]) => {
    setBlueChannel(value)
    torus.setBlueChannel(value[0], value[1])
  }, [setBlueChannel, torus])

  const handlePointShapeChange = (value: string) => {
    const valueExistsInEnum = Object.values(POINT_SHAPES).includes(value as PointShape)
    if (!valueExistsInEnum) return

    setPointShape(value as PointShape)
    torus.setPointShape(value as PointShape)
  }

  return {
    torus,
    handleChangeFixedPosition,
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
    handleBlueChannelChange,
    handlePointShapeChange
  }
}

export type UseTweaksContext = ReturnType<typeof useGestures> | null

export const TweaksContext = React.createContext<UseTweaksContext>(null)

export const useTweaksContext = () => {
  const context = React.useContext(TweaksContext)
  if (!context) {
    throw new Error('useTweaksContext must be used within a TweaksProvider')
  }
  return context
}