import React from 'react'
import { useAfterMount } from '@/hooks/useAfterMount'

export type ValuesType = [number, number]

export const useDebounceValues = (values: ValuesType, delay?: number | boolean, initialValue?: ValuesType, contextMounted?: boolean) => {
  const [debouncedValue, setDebouncedValue] = React.useState(initialValue ?? values)
  const debounceStarted = React.useRef(false)

  useAfterMount(function debounce() {
    if (!delay) {
      setDebouncedValue(values)
      return
    }
    if (
      !values ||
      !contextMounted ||
      debounceStarted.current
    ) return

    const safeDelay = typeof delay === 'number' ? delay : 100

    debounceStarted.current = true
    const handler = setTimeout(() => {
      setDebouncedValue(values)
      debounceStarted.current = false
    }, safeDelay)

    return () => {
      if (!debounceStarted.current) {
        return clearTimeout(handler)
      }
    }
  }, [values, delay])

  return debouncedValue || [0, 0]
}
