import { cn } from '@/lib/tailwindClassMerge'
import { Item } from './Item'
import type { SelectorComponent } from './types'
import { useItems } from './useItems'
import { useSelectedItemData } from './useSelectedItemData'

export const Selector: SelectorComponent = ({
  children,
  selected: controlledSelected,
  onSelectedChange,
  className,
  label,
  ...rest
}) => {
  const { items, selected, selectedRef } = useItems({ children, controlledSelected, onSelectedChange })
  const { xCoord, width } = useSelectedItemData({ selectedRef, selected })

  return (
    <label className='flex flex-col gap-2'>
      {label}
      <div
        role='tablist'
        className={cn(
          'h-10 bg-black flex gap-0.5 p-0.5 rounded-xl items-center border-borderblack border relative overflow-hidden',
          className
        )}
        {...rest}
      >
        <span
          className={cn(
            'absolute [height:calc(100%-4px)] top-0.5 bg-white/15 transition-all duration-200 rounded-[10px] ease-out'
          )}
          style={{ left: xCoord, width }}
        />
        {items}
      </div>
    </label>
  )
}

Selector.Item = Item