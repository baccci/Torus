import React, { type DetailedHTMLProps, type MouseEventHandler } from 'react'
import { useTabContext } from './hooks'
import { cn } from '@/lib/tailwindClassMerge'

interface TabItemProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  id: string
  children?: React.ReactNode
  className?: string
}

export const TabItem: React.FC<TabItemProps> = ({ id, children, className, onClick, ...other }) => {
  const { activeTab, setActiveTab } = useTabContext()
  const dataState = activeTab === id ? 'active' : 'inactive'

  const handleSetActiveTab = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => {
    setActiveTab(id)
    onClick?.(e as React.MouseEvent<HTMLButtonElement>)
  }

  return (
    <button
      data-state={dataState}
      role='tab'
      type='button'
      aria-selected={dataState === 'active'}
      aria-controls={id}
      className={cn(`py-1.5 px-2.5 rounded-lg data-[state=active]:bg-[#dad5f2] text-[16px] text-[#9698D5] font-medium
        data-[state=active]:shadow-sm data-[state=active]:text-slate-800
        transition-all duration-200 hover:bg-[#292940] 
      `, className)}
      onClick={handleSetActiveTab}
      id={`tabItem-${id}`}
      {...other}
    >
      {children || id}
    </button>
  )
}
TabItem.displayName = 'TabItem'