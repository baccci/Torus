import { TweakWrapper } from '../TweakWrapper'
import { useTweaksContext } from '../../context'
import { FractionalRange } from '@/components/ui/FractionalRange/FractionalRange'
import { ColorManagement } from './ColorManagement'

export const Appearence = () => {
  const {
    luminance,
    ...tweaks
  } = useTweaksContext()

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
      />
      <ColorManagement />
    </TweakWrapper>
  )
}
