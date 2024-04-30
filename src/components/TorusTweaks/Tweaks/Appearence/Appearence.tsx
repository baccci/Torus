import { TweakWrapper } from '../TweakWrapper'
import { useTweaksContext } from '../../context'
import { FractionalRange } from 'fractionalrange'
import { ColorManagement } from './ColorManagement'
import { useTweaks } from '@/stores/tweaks'

export const Appearence = () => {
  const { ...tweaks } = useTweaksContext()
  const { luminance } = useTweaks()

  return (
    <TweakWrapper>
      <FractionalRange
        id='luminance'
        value={luminance}
        min={0.2}
        max={3}
        step={0.02}
        label='Luminance'
        className='w-full'
        activeColor='#ff9646'
        onChange={tweaks.handleLuminanceChange}
        layout='full'
        sound='/tick.mp3'
      />
      <ColorManagement />
    </TweakWrapper>
  )
}
