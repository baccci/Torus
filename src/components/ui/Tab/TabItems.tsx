import React from 'react'
import { TabItem } from './TabItem'

interface TabItemsProps {
  items: React.ReactElement<any, string | React.JSXElementConstructor<any>>[]
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
