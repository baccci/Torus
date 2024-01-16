import React from 'react'
import { TweakWrapper } from './TweakWrapper'
import { Range } from '@/components/Range'
import { useTweaksContext } from '../context'
import { getCoordDisplayValue } from '../utils'
import { PI } from '@/constants/constants'

export const Position = () => {
  const {
    xFixedValue,
    yFixedValue,
    xMovement,
    yMovement,
    setXMovement,
    setYMovement,
    ...events } = useTweaksContext()

  const xFixedValueDisplay = getCoordDisplayValue(xFixedValue)
  const yFixedValueDisplay = getCoordDisplayValue(yFixedValue)

  return (
    <div className='flex flex-col gap-12 w-full'>
      <TweakWrapper>
        <Range.Root>
          <Range
            id='x-fixed'
            value={xFixedValue}
            customValueDisplay={xFixedValueDisplay}
            min={0}
            max={PI}
            step={0.001}
            label='X fixed value'
            onChange={events.handleChangeXFixedValue}
          />
        </Range.Root>
        <Range.Root>
          <Range
            id='y-fixed'
            value={yFixedValue}
            customValueDisplay={yFixedValueDisplay}
            min={0}
            max={PI}
            step={0.001}
            label='Y fixed value'
            onChange={events.handleChangeYFixedValue}
          />
        </Range.Root>
      </TweakWrapper>
      <TweakWrapper>

        <Range.Root>
          <Range
            id='x-increment'
            value={xMovement}
            customValueDisplay={xMovement * 1000}
            min={0}
            max={0.1}
            step={0.001}
            label='X movement'
            aria-label='X movement'
            onChange={events.handleChangeXMovement}
          />
        </Range.Root>
        <Range.Root>
          <Range
            id='y-increment'
            value={yMovement}
            customValueDisplay={yMovement * 1000}
            min={0}
            max={0.1}
            step={0.001}
            label='Y movement'
            onChange={events.handleChangeYMovement}
          />
        </Range.Root>
      </TweakWrapper>
    </div>
  )
}
