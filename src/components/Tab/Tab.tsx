'use client'
import getChildrenOnDisplayName from '@lib/getComponentChildrens'
import { cn } from '@/lib/tailwindClassMerge'
import React, { type DetailedHTMLProps } from 'react'
import { TabContext, useTab } from './hooks'
import { TabItem } from './TabItem'
import { TabContent } from './TabContent'

interface TabProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
  initialTab?: string
  [key: string]: any
}

export const Tab = ({ className, children, fullWidth, initialTab, ...other }: TabProps) => {
  const tabItems = React.useMemo(() => getChildrenOnDisplayName(children, 'TabItem'), [children])
  const tabContents = React.useMemo(() => getChildrenOnDisplayName(children, 'TabContent'), [children])

  const defaultTabValue = initialTab || tabItems?.[0].props.value
  const tabContext = useTab(defaultTabValue)

  const { activeTab } = tabContext
  const activeContent = tabContents?.find(content => content.props.value === activeTab)

  return (
    <TabContext.Provider value={tabContext}>
      <div className={cn(
        'bg-[#24253C] rounded-xl p-1.5 flex gap-2 w-fit mix-blend-luminosity',
        { 'w-full': fullWidth },
        className
      )}
        {...other}
      >
        {tabItems}
      </div>
      {activeContent}
    </TabContext.Provider>
  )
}

Tab.TabItem = TabItem
Tab.TabContent = TabContent