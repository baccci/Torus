import React from 'react'
import type { SwitchProps } from './Switch'

interface SwitchContextProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: SwitchProps['onCheckedChange']
}

export const useSwitch = ({ checked, defaultChecked, onCheckedChange }: SwitchContextProps) => {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked ?? false)
  const [pressed, setPressed] = React.useState(false)
  const isControlled = checked !== undefined
  const isChecked = isControlled ? checked : uncontrolledChecked

  const changeFn = onCheckedChange ?? setUncontrolledChecked

  return {
    checked: isChecked,
    isControlled,
    changeFn,
    pressed,
    setPressed,
  }
}

export type SwitchType = ReturnType<typeof useSwitch> | null

export const SwitchContext = React.createContext<SwitchType>(null)

export const useSwitchContext = () => {
  const context = React.useContext(SwitchContext)

  if (!context) {
    throw new Error('useSwitchContext must be used within a SwitchProvider')
  }

  return context
}