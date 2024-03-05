import getChildrenOnDisplayName from '@/lib/getComponentChildrens'
import React from 'react'
import { ITEM_NAME } from './Item'
import type { ItemProps } from './types'
import { useOnMount } from '@/hooks/useOnMount'

interface UseItemsArgs {
  children: React.ReactNode
  controlledSelected?: string
  onSelectedChange?: (index: string) => void
}

/*
  Controls the state of the items and the selected item,
  injecting the necessary props to the items
*/

export const useItems = ({
  children,
  controlledSelected,
  onSelectedChange
}: UseItemsArgs) => {
  const [uncontrolledSelected, setUncontrolledSelected] = React.useState<string>('')
  const selected = controlledSelected ?? uncontrolledSelected
  const selectedRef = React.useRef<HTMLDivElement>(null)

  function updateSelected(index: string) {
    if (controlledSelected) return onSelectedChange?.(index)
    setUncontrolledSelected(index)
  }

  const rawItems = React.useMemo(() => getChildrenOnDisplayName<ItemProps>(children, ITEM_NAME), [children])

  useOnMount(() => {
    if (selected || !rawItems.length) return
    const firstItem = rawItems[0].props.value
    updateSelected(firstItem)
  }, 'layout')

  const items: typeof rawItems = rawItems.map((item) => {
    const itemValue = item.props.value
    return React.cloneElement(item, {
      ...item.props,
      selected: selected === itemValue,
      onClick: () => updateSelected(itemValue),
      ref: selected === itemValue ? selectedRef : null
    })
  })

  return { items, selected, selectedRef }
}