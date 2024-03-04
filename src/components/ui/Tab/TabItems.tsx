import React from 'react'
import { TabItem, type TabItemProps } from './TabItem'

interface TabItemsProps {
  items: React.ReactElement<TabItemProps, string | React.JSXElementConstructor<TabItemProps>>[]
}

export const TabItems: React.FC<TabItemsProps> = ({ items }) => {
  return (
    <>
      {items?.map((item) => {
        const { id } = item.props
        return (
          <TabItem key={id} id={id}>
            {id}
          </TabItem>
        )
      })}
    </>
  )
}
