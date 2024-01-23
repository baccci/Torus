import React from 'react'

export const useTab = (defaultTab: string) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab)

  return {
    activeTab,
    setActiveTab
  }
}

type TabContextType = ReturnType<typeof useTab>

export const TabContext = React.createContext<TabContextType | null>(null)

export const useTabContext = () => {
  const context = React.useContext(TabContext)
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider')
  }
  return context
}