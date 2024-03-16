import { create } from 'zustand'
import { HALF_PI, PI } from '@/constants/constants'
import type { PointShape } from '@/types/types'

type TweakStore = {
  xFixedValue: number
  yFixedValue: number
  xMovement: number
  yMovement: number
  theta: number
  phi: number
  outerRadius: number
  innerRadius: number
  fieldOfView: number
  distanceTorus: number
  luminance: number
  colored: boolean
  redChannel: [number, number]
  greenChannel: [number, number]
  blueChannel: [number, number]
  pointShape: PointShape
  setXFixedValue: (value: number) => void
  setYFixedValue: (value: number) => void
  setXMovement: (value: number) => void
  setYMovement: (value: number) => void
  setTheta: (value: number) => void
  setPhi: (value: number) => void
  setOuterRadius: (value: number) => void
  setInnerRadius: (value: number) => void
  setFieldOfView: (value: number) => void
  setDistanceTorus: (value: number) => void
  setLuminance: (value: number) => void
  setColored: (value: boolean) => void
  setRedChannel: (value: [number, number]) => void
  setGreenChannel: (value: [number, number]) => void
  setBlueChannel: (value: [number, number]) => void
  setPointShape: (value: PointShape) => void
}

export const useTweaks = create<TweakStore>((set) => ({
  xFixedValue: HALF_PI,
  yFixedValue: PI,
  xMovement: 0,
  yMovement: 0,
  theta: 0,
  phi: 0,
  outerRadius: 1,
  innerRadius: 0.5,
  fieldOfView: 1,
  distanceTorus: 2,
  luminance: 0.5,
  colored: true,
  redChannel: [0, 1],
  greenChannel: [0, 1],
  blueChannel: [0, 1],
  pointShape: 'circle',
  setXFixedValue: (value) => set({ xFixedValue: value }),
  setYFixedValue: (value) => set({ yFixedValue: value }),
  setXMovement: (value) => set({ xMovement: value }),
  setYMovement: (value) => set({ yMovement: value }),
  setTheta: (value) => set({ theta: value }),
  setPhi: (value) => set({ phi: value }),
  setOuterRadius: (value) => set({ outerRadius: value }),
  setInnerRadius: (value) => set({ innerRadius: value }),
  setFieldOfView: (value) => set({ fieldOfView: value }),
  setDistanceTorus: (value) => set({ distanceTorus: value }),
  setLuminance: (value) => set({ luminance: value }),
  setColored: (value) => set({ colored: value }),
  setRedChannel: (value) => set({ redChannel: value }),
  setGreenChannel: (value) => set({ greenChannel: value }),
  setBlueChannel: (value) => set({ blueChannel: value }),
  setPointShape: (value) => set({ pointShape: value })
}))
