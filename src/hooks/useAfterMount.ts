import React from 'react'
type effect = 'normal' | 'layout'

interface Config {
  effect?: effect
}

const defaultConfig = {
  effect: 'normal' as effect
}

export function useAfterMount(callback: () => (void | (() => void)), deps: unknown[], config: Config = defaultConfig) {
  const hasMounted = React.useRef(false)
  const effectFn = config.effect === 'normal' ? React.useEffect : React.useLayoutEffect

  effectFn(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    const clean = callback()

    return () => {
      if (typeof clean === 'function') {
        clean()
      }
    }
  }, [callback, ...deps])
}