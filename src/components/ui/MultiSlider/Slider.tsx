import { cn } from '@/lib/tailwindClassMerge'
import { forwardRef } from 'react'
import { useMultiSliderContext } from './context'
import type { SliderProps } from './types'

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const {
    className,
    index,
    disabled,
    isLast,
    childClassName,
    zIndex,
    ...rest
  } = props

  const {
    widths,
    disabled: contextDisabled,
    values,
    min,
    max,
    dragging,
    draggingIndex
  } = useMultiSliderContext()

  const draggingThis = draggingIndex === index && dragging
  const disabledThis = disabled || contextDisabled
  const width = index !== undefined ? widths.getFormattedWidth(index) : undefined
  const value = index !== undefined ? values[index] : undefined
  const tabIndex = isLast
    ? -1
    : 0

  return (
    <div
      ref={ref}
      aria-hidden
      data-dragging={dragging}
      style={{ width, zIndex }}
      className={cn(
        'will-change-[width] h-full transform-gpu rounded-md bg-[--slider-bg-color] transition-colors duration-200 ease-in-out',
        { 'pointer-events-none': disabledThis },
        className
      )}
    >
      <div
        role='slider'
        tabIndex={tabIndex}
        aria-valuenow={value}
        aria-valuetext={String(value)}
        aria-valuemax={Number(max)}
        aria-valuemin={Number(min)}
        data-index={index}
        data-value={value}
        data-disabled={disabled}
        data-dragging={draggingThis}
        data-last={isLast}
        className={cn(
          // general styles
          'h-full w-full pointer-events-none will-change-[width] transform-gpu transition-[width] duration-[5ms] font-mono text-sm hover:cursor-grabbing',
          // animation easing styles
          'ease-[linear(0,0.5007_7.21%,0.7803_12.29%,0.8883_14.93%,0.9724_17.63%,1.0343_20.44%,1.0754_23.44%,1.0898_25.22%,1.0984_27.11%,1.1014_29.15%,1.0989_31.4%,1.0854_35.23%,1.0196_48.86%,1.0043_54.06%,0.9956_59.6%,0.9925_68.11%,1_)]',
          // thumb - general and mobile styles 
          'data-[last="true"]:after:content-[none] after:size-5 after:rounded-full after:-right-[18px] after:ring-2 after:ring-[var(--slider-thumb-ring-color)] after:bg-[var(--slider-thumb-color)] after:absolute after:top-[50%] after:-translate-y-1/2 after:[pointer-events:initial] data-[disabled="true"]:after:[pointer-events:none] data-[dragging="false"]:after:hover:bg-white after:transition-[background-color] after:duration-200 after:ease-in-out',
          // thumb - desktop styles
          'lg:after:w-2 lg:after:h-[85%] lg:after:rounded-sm after:z-[2] lg:after:-right-[10px] lg:after:ring-0',
          // accessibility focus style
          'focus-visible:outline focus-visible:outline-white/80 focus-visible:outline-offset-2',
          // value text 
          { 'before:absolute before:top-[-25px] before:-right-2 before:translate-x-1/2 before:[content:attr(data-value)] before:text-slate-300': value || value === 0 },
          { 'after:[var(--slider-thumb-dragging-color)]': draggingThis },
          childClassName
        )}
        {...rest}
      >
      </div>
    </div>
  )
})

Slider.displayName = 'Slider'
