import React from 'react'
import { Torus as TorusModel } from '@/models/Torus'
import { TweaksContext, useGestures } from './context'
import { NoiseLayer } from './NoiseLayer'
import { MobileDragMark } from './MobileDragMark'
import { Position } from './Tweaks/Position'
import { Shape } from './Tweaks/Shape'
import { View } from './Tweaks/View'
import { Tab } from '../ui/Tab/Tab'
import { Appearence } from './Tweaks/Appearence'
import { useTweaks } from '@/stores/tweaks'
import { useOnMount } from '@/hooks/useOnMount'
import { HALF_PI } from '@/constants/constants'

interface TorusTweaksProps {
  torus: TorusModel
}

export const TorusTweaks: React.FC<TorusTweaksProps> = ({ torus }) => {
  const tweaksEvents = useGestures(torus)
  useInitiateTweaks(torus)

  return (
    <TweaksContext.Provider value={tweaksEvents}>
      <section className='max-w-[100%] sm:w-[600px] lg:w-[800px] mt-6 px-4'>
        <div className={`w-full rounded-2xl p-8 sm:p-14 sm:pb-16 relative bg-slate-900/30 overflow-x-hidden
          before:absolute before:mix-blend-overlay before:left-0 before:right-0 before:top-0 before:border-[1px] before:border-white/80 before:[border-bottom:none] before:h-4 before:[border-radius:16px_16px_0_0]
          after:absolute after:mix-blend-overlay after:inset-[16px_0_0_0] after:[border-top:none] after:[border-image:linear-gradient(180deg,hsla(0,0%,100%,.8)_0,transparent_40%)_1] after:pointer-events-none after:border-white/10 after:border-[1px]
          bg-[radial-gradient(91.62%_38.88%_at_1.4%_4.24%,#26263e_0,transparent_100%),radial-gradient(21.88%_21.86%_at_80.72%_42.34%,rgba(7,7,9,0.45)_6.77%,transparent_100%),radial-gradient(24.02%_75.21%_at_82.85%_84.73%,#20202F_5%,transparent_100%)]`
        }>
          <NoiseLayer />
          <MobileDragMark />
          <h2 className='mb-8 mt-2 sm:mt-0 text-2xl sm:text-3xl font-bold text-transparent bg-clip-text
          bg-[linear-gradient(352deg,_#16162e_14%,_#b2b5f7_100%)]
          sm:bg-[linear-gradient(352deg,_#16162e_30%,_#c0c2ff_100%)]
          '>
            Tweak panel
          </h2>
          <Tab className='p-1 [--gap:4px] relative before:absolute before:mix-blend-overlay before:inset-0 before:border-[1px] before:rounded-xl before:border-white/60 before:pointer-events-none'>
            <Tab.Item id='Position'>
              <Position />
            </Tab.Item>
            <Tab.Item id='Shape'>
              <Shape />
            </Tab.Item>
            <Tab.Item id='View'>
              <View />
            </Tab.Item>
            <Tab.Item id='Appearence'>
              <Appearence />
            </Tab.Item>
          </Tab>
        </div>
      </section>
    </TweaksContext.Provider>
  )
}

function useInitiateTweaks(torus: TorusModel) {
  const {
    setXFixedValue,
    setYFixedValue,
    setPhi,
    setTheta,
    setOuterRadius,
    setInnerRadius,
    setFieldOfView,
    setDistanceTorus,
    setLuminance,
    setColored,
    setRedChannel,
    setGreenChannel,
    setBlueChannel,
    setPointShape,
    setPointSize
  } = useTweaks()

  useOnMount(() => {
    setXFixedValue(HALF_PI)
    setYFixedValue(HALF_PI)
    setTheta(torus.getThetaIncrement)
    setPhi(torus.getPhiIncrement)
    setOuterRadius(torus.getOuterRadius)
    setInnerRadius(torus.getInnerRadius)
    setFieldOfView(torus.getFieldOfView)
    setDistanceTorus(torus.getDistanceTorus)
    setLuminance(torus.getLuminanceEnhance)
    setColored(false)
    setRedChannel([torus.getRedChannel.min, torus.getRedChannel.max])
    setGreenChannel([torus.getGreenChannel.min, torus.getGreenChannel.max])
    setBlueChannel([torus.getBlueChannel.min, torus.getBlueChannel.max])
    setPointShape(torus.getPointShape)
    setPointSize(torus.getPointSize)
  }, { effect: 'layout' })
}