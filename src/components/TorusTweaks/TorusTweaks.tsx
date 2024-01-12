import React from 'react'
import { Torus as TorusModel } from '@/models/Torus'
import { Range } from '../Range'
import { useTweaks } from './useTweaks'

interface TorusTweaksProps {
  torus: TorusModel
}

const PI = Number(Math.PI.toFixed(3))

export const TorusTweaks: React.FC<TorusTweaksProps> = ({ torus }) => {
  const {
    xFixedValue,
    xFixedValueDisplay,
    yFixedValue,
    yFixedValueDisplay,
    xMovement,
    yMovement,
    thethaIncrement,
    phiIncrement,
    outerRadius,
    innerRadius,
    fieldOfView,
    distanceTorus,
    ...events
  } = useTweaks(torus)

  return (
    <section className='max-w-[100%] mt-4 px-4'>
      <div className={
        `w-full rounded-2xl p-8 sm:p-14 sm:pb-16 relative bg-slate-900/30 overflow-x-hidden
        before:absolute before:mix-blend-overlay before:left-[0] before:right-[0] before:top-[0] before:[border-width:1px] before:border-white/80 before:[border-bottom:none] before:h-4 before:[border-radius:16px_16px_0_0]
        after:absolute after:mix-blend-overlay after:inset-[16px_0_0_0] after:[border-top:none] after:[border-image:linear-gradient(180deg,hsla(0,0%,100%,.8)_0,transparent_40%)_1] after:pointer-events-none after:border-white/10 after:border-[1px]
        bg-[radial-gradient(91.62%_38.88%_at_1.4%_4.24%,#26263e_0,transparent_100%),radial-gradient(21.88%_21.86%_at_80.72%_42.34%,rgba(7,7,9,0.45)_6.77%,transparent_100%),radial-gradient(24.02%_75.21%_at_82.85%_84.73%,#20202F_5%,transparent_100%)]`
      }>
        <span className={`absolute inset-0 z-[1] pointer-events-none opacity-[0.14] bg-center bg-repeat bg-[url("/images/noise.png")] bg-[length:140px_100px]`}></span>
        <h2 className='mb-8 text-xl sm:text-3xl font-bold text-transparent bg-clip-text 
        bg-[linear-gradient(352deg,_#16162e_14%,_rgba(170,172,238,1)_100%)]
        sm:bg-[linear-gradient(352deg,_#16162e_30%,_rgba(170,172,238,1)_100%)]
        '>
          Tweak panel
        </h2>
        <div className='flex flex-col gap-12 w-full'>
          <div className='flex justify-between gap-8 flex-wrap w-full'>
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
          </div>
          <div className='flex justify-between gap-8 flex-wrap'>
            <Range.Root>
              <Range
                id='x-increment'
                value={xMovement}
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
                min={0}
                max={0.1}
                step={0.001}
                label='Y movement'
                onChange={events.handleChangeYMovement}
              />
            </Range.Root>
          </div>
          <div className='flex justify-between gap-8 flex-wrap'>
            <Range.Root>
              <Range
                id='theta-increment'
                value={thethaIncrement}
                min={0.05}
                max={2}
                step={0.01}
                label='Dots per ring'
                onChange={events.handleChangeThethaIncrement}
              />
            </Range.Root>
            <Range.Root>
              <Range
                id='phi-increment'
                value={phiIncrement}
                min={0.1}
                max={2}
                step={0.01}
                label='Amount of rings'
                onChange={events.handleChangePhiIncrement}
              />
            </Range.Root>
          </div>
          <div className='flex justify-between gap-8 flex-wrap'>
            <Range.Root>
              <Range
                id='outer-radius'
                value={outerRadius}
                min={0}
                max={10}
                step={0.1}
                label='Outer radius'
                onChange={events.handleOuterRadiusChange}
              />
            </Range.Root>
            <Range.Root>
              <Range
                id='inner-radius'
                value={innerRadius}
                min={0}
                max={10}
                step={0.1}
                label='Inner radius'
                onChange={events.handleInnerRadiusChange}
              />
            </Range.Root>
          </div>
          <div className='flex justify-between gap-8 flex-wrap'>
            <Range.Root>
              <Range
                id='field-of-view'
                value={fieldOfView}
                min={0}
                max={1000}
                step={1}
                label='Field of view'
                onChange={events.handleFieldOfViewChange}
              />
            </Range.Root>
            <Range.Root>
              <Range
                id='distance-torus'
                value={distanceTorus}
                min={0}
                max={100}
                step={1}
                label='Distance of torus'
                onChange={events.handleDistanceTorusChange}
              />
            </Range.Root>
          </div>
        </div>
      </div>
    </section>
  )
}
