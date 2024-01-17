import React from 'react'
import { Torus as TorusModel } from '@/models/Torus'
import { TweaksContext, useTweaks } from './context'
import { NoiseLayer } from './NoiseLayer'
import { MobileDragMark } from './MobileDragMark'
import { Position } from './Tweaks/Position'
import { Shape } from './Tweaks/Shape'
import { View } from './Tweaks/View'
import { Tab } from '../Tab/Tab'

interface TorusTweaksProps {
  torus: TorusModel
}

export const TorusTweaks: React.FC<TorusTweaksProps> = ({ torus }) => {
  const tweaksContext = useTweaks(torus)

  return (
    <TweaksContext.Provider value={tweaksContext}>
      <section className='max-w-[100%] mt-4 px-4'>
        <div className={
          `w-full rounded-2xl p-8 sm:p-14 sm:pb-16 relative bg-slate-900/30 overflow-x-hidden
          before:absolute before:mix-blend-overlay before:left-0 before:right-0 before:top-0 before:border-[1px] before:border-white/80 before:[border-bottom:none] before:h-4 before:[border-radius:16px_16px_0_0]
          after:absolute after:mix-blend-overlay after:inset-[16px_0_0_0] after:[border-top:none] after:[border-image:linear-gradient(180deg,hsla(0,0%,100%,.8)_0,transparent_40%)_1] after:pointer-events-none after:border-white/10 after:border-[1px]
          bg-[radial-gradient(91.62%_38.88%_at_1.4%_4.24%,#26263e_0,transparent_100%),radial-gradient(21.88%_21.86%_at_80.72%_42.34%,rgba(7,7,9,0.45)_6.77%,transparent_100%),radial-gradient(24.02%_75.21%_at_82.85%_84.73%,#20202F_5%,transparent_100%)]`
        }>
          <NoiseLayer />
          <MobileDragMark />
          <h2 className='mb-4 mt-2 sm:mt-0 text-xl sm:text-3xl font-bold text-transparent bg-clip-text 
          bg-[linear-gradient(352deg,_#16162e_14%,_rgba(170,172,238,1)_100%)]
          sm:bg-[linear-gradient(352deg,_#16162e_30%,_rgba(170,172,238,1)_100%)]
          '>
            Tweak panel
          </h2>
          <Tab className='p-1 gap-1 relative after:absolute after:mix-blend-overlay after:inset-0 after:border-[1px] after:rounded-xl after:border-white/40 after:pointer-events-none'>
            <Tab.TabItem value='Position'>
              Position
            </Tab.TabItem>
            <Tab.TabItem value='Shape'>
              Shape
            </Tab.TabItem>
            <Tab.TabItem value='View'>
              View
            </Tab.TabItem>
            <Tab.TabContent value='Position'>
              <Position />
            </Tab.TabContent>
            <Tab.TabContent value='Shape'>
              <Shape />
            </Tab.TabContent>
            <Tab.TabContent value='View'>
              <View />
            </Tab.TabContent>
          </Tab>
        </div>
      </section>
    </TweaksContext.Provider>
  )
}
