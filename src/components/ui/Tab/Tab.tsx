'use client'
import getChildrenOnDisplayName from '@lib/getComponentChildrens'
import { cn } from '@/lib/tailwindClassMerge'
import React, { type DetailedHTMLProps } from 'react'
import { TabContext, useTab } from './hooks'
import { Item } from './Item'
import { TabItems } from './TabItems'
import { useScrollShadow } from './useScrollShadow'
import { Shadow } from './Shadow'

interface TabProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
  initialTab?: string
  disableShadow?: boolean
}

export const Tab = ({ className, children, fullWidth, initialTab, disableShadow, ...other }: TabProps) => {
  const items = React.useMemo(() => getChildrenOnDisplayName(children, 'Item'), [children])

  const {
    getVisibleSides,
    onScrollHandler,
    wrapperRef
  } = useScrollShadow(disableShadow)

  const defaultTabValue = initialTab || items?.[0].props.id
  const tabContext = useTab(defaultTabValue)

  const { activeTab } = tabContext
  const activeContent = items?.find(content => content.props.id === activeTab)

  return (
    <TabContext.Provider value={tabContext}>
      <div
        className={cn(
          'bg-[#1d1d2b] rounded-xl p-1.5 w-fit max-w-full [--gap:8px] relative overflow-hidden',
          { 'w-full': fullWidth },
          className
        )}
        role='tablist'

        {...other}
      >
        <Shadow getVisibleSides={getVisibleSides} side='left' />
        <div
          className={cn('w-full overflow-x-auto flex gap-[--gap] rounded-[8px]')}
          ref={wrapperRef}
          onScroll={onScrollHandler}
        >
          <TabItems items={items} />
        </div>
        <Shadow getVisibleSides={getVisibleSides} side='right' />
      </div>
      {activeContent}
    </TabContext.Provider>
  )
}

Tab.Item = Item
