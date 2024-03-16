import { MultiSlider } from '@/components/ui/MultiSlider/MultiSlider'
import { cn } from '@/lib/tailwindClassMerge'
import React, { type DetailedHTMLProps } from 'react'

interface ColorSliderProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string
  hue: number
  saturation?: number
  disabled?: boolean
  onValueChange?: (values: [number, number]) => void
  values?: [number, number]
}

export const ColorSlider: React.FC<ColorSliderProps> = ({
  label,
  className,
  hue,
  saturation = 100,
  disabled,
  onValueChange,
  values,
  ...props
}) => {
  const sliderRef1 = React.useRef<HTMLDivElement>(null)
  const sliderRef2 = React.useRef<HTMLDivElement>(null)
  const sliderRef3 = React.useRef<HTMLDivElement>(null)

  const isThereLabel = label ? 'label' : 'none'
  const LabelElement = {
    none: null,
    label: <div className='text-[#fff] font-mono text-sm' aria-hidden>{label}</div>
  }[isThereLabel]

  usePrintColorsOnMount(values, handleColorChange)

  function handleColorChange(values: number[]) {
    onValueChange && onValueChange(values as [number, number])

    const { current: slider1 } = sliderRef1
    const { current: slider2 } = sliderRef2
    const { current: slider3 } = sliderRef3
    if (!slider1 || !slider2 || !slider3) return

    const value1 = values[0]
    const value2 = values[1]

    const value1ToPercent = ((value1 / 255) * 100) / 2 + 10
    const value2ToPercent = ((value2 / 255) * 100) / 2 + 10

    slider1.style.setProperty('--start', `hsl(${hue}deg,${saturation}%,10%)`)
    slider1.style.setProperty('--end', `hsl(${hue}deg,${saturation}%,${value1ToPercent}%)`)
    slider2.style.setProperty('--start', `hsl(${hue}deg,${saturation}%,${value1ToPercent}%)`)
    slider2.style.setProperty('--end', `hsl(${hue}deg,${saturation}%,${value2ToPercent}%)`)
    slider3.style.setProperty('--start', `hsl(${hue}deg,${saturation}%,${value2ToPercent}%)`)
    slider3.style.setProperty('--end', `hsl(${hue}deg,${saturation}%,70%)`)
  }

  return (
    <div
      className={cn(
        ' bg-black rounded-xl border border-borderblack select-none flex flex-col gap-10 ',
        className
      )}
      role='group'
      aria-label={`${label}. Max value: 255. Min value: 0.`}
      aria-disabled={disabled}
      tabIndex={0}
    >
      {LabelElement}
      <MultiSlider
        className={cn('w-full h-8 [--slider-thumb-ring-color:#222]')}
        onValueChange={handleColorChange}
        min={1}
        max={255}
        values={values}
        disabled={disabled}
        {...props}
      >
        <MultiSlider.Slider
          ref={sliderRef1}
          className='bg-gradient-to-r from-[--start] to-[--end]'
        />
        <MultiSlider.Slider
          ref={sliderRef2}
          className='bg-gradient-to-r from-[--start] to-[--end]'
        />
        <MultiSlider.Slider
          ref={sliderRef3}
          className='bg-gradient-to-r from-[--start] to-[--end]'
        />
      </MultiSlider>
    </div>
  )
}

const usePrintColorsOnMount = (values: [number, number] | undefined, handleColorChange: (values: number[]) => void) => {
  const initialValues = React.useRef(values)
  const initalFunction = React.useRef(handleColorChange)

  const printColorsOnMount = React.useCallback(() => {
    if (!initialValues.current) return
    initalFunction.current(initialValues.current)
  }, [])

  React.useLayoutEffect(() => {
    printColorsOnMount()
  }, [printColorsOnMount])
}