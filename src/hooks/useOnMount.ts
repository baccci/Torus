import React from 'react'
type effect = 'normal' | 'layout'

export function useOnMount(callback: () => void, effect: effect = 'normal') {
  const hasMounted = React.useRef(false)
  const effectFn = effect === 'normal' ? React.useEffect : React.useLayoutEffect

  effectFn(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      callback()
    }
  }, [])
}