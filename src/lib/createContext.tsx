import React from 'react'

export function createContext<ContextValue>(defaultValue?: ContextValue) {
  const Context = React.createContext<ContextValue | undefined>(defaultValue)

  const Provider = (props: { value: ContextValue; children: React.ReactNode }) => {
    const { children, ...context } = props

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const { value } = React.useMemo(() => context, Object.values(context))
    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  const useContext = () => {
    const context = React.useContext(Context)
    if (!context && !defaultValue) {
      throw new Error('useContext must be inside a Provider with a value')
    }
    if (context) return context
    return defaultValue as ContextValue
  }

  return [Provider, useContext] as const
}
