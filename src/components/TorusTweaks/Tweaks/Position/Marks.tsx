import React from 'react'
import { cn } from '@/lib/tailwindClassMerge'
import { QUARTER_PI, THREE_QUARTERS_PI } from '@/constants/constants'

type Orientation = 'horizontal' | 'vertical'

interface MarksProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  numberOfMarks: number
  orientation: Orientation
  min: number
  max: number
}

export const Marks: React.FC<MarksProps> = ({ min, max, numberOfMarks, orientation, className }) => {
  const marks = getMarks(numberOfMarks)
  return (
    <div
      className={cn(
        'absolute flex justify-between bottom-0 left-0 w-full items-end',
        { 'top-0 left-0 h-full w-auto flex-col items-start': orientation === 'vertical' },
        className)}
    >
      {renderMarks(marks, orientation, numberOfMarks, min, max)}
    </div>
  )
}

interface MarkProps {
  hideMark?: boolean
  orientation?: Orientation
  activeMark?: boolean
}

const Mark: React.FC<MarkProps> = ({ hideMark, orientation, activeMark }) => {
  return (
    <div
      data-active={activeMark}
      className={cn(
        'w-[1.5px] h-1.5 bg-[#333] z-[1]',
        { 'h-[1.5px] w-1.5': orientation === 'vertical' },
        { 'opacity-0': hideMark },
        { 'h-2.5 bg-[#555]': activeMark && orientation === 'horizontal' },
        { 'w-2.5 bg-[#555]': activeMark && orientation === 'vertical' }
      )}
    >
    </div>
  )
}

function getMarks(numberOfMarks: number) {
  return Array.from({ length: numberOfMarks }, (_, i) => i)
}

function renderMarks(marks: unknown[], orientation: Orientation, numberOfMarks: number, min: number, max: number) {
  return marks.map((_, index) => {
    const valueRange = max - min
    const steps = valueRange / (numberOfMarks - 1)
    // the mark is active if the step is the closest to π/4 and 3π/4
    const markIsActive = valueIsCloseToNumber(index * steps, QUARTER_PI, 0.055) || valueIsCloseToNumber(index * steps, THREE_QUARTERS_PI, 0.055)
    const hideMark = index === 0 || index === marks.length - 1

    return <Mark
      key={index}
      hideMark={hideMark}
      orientation={orientation}
      activeMark={markIsActive}
    />
  })
}

function valueIsCloseToNumber(value: number, number: number, range: number) {
  return value >= number - range && value <= number + range
}