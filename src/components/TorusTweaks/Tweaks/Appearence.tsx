import { TweakWrapper } from './TweakWrapper'
import { useTweaksContext } from '../context'
import { Switch } from '@/components/ui/Switch/Switch'
import { FractionalRange } from '@/components/ui/FractionalRange/FractionalRange'

export const Appearence = () => {
  const { luminance, colored, handleColoredChange, ...tweaks } = useTweaksContext()
  return (
    <TweakWrapper>
      <FractionalRange
        id='luminance'
        value={luminance}
        min={0}
        max={3}
        step={0.02}
        label='Luminance'
        className='w-full'
        onChange={tweaks.handleLuminanceChange}
      />

      <Switch
        className='[--bg-color:rgba(60,35,133,var(--alpha))]'
        checked={colored}
        onCheckedChange={handleColoredChange}
      >
        Colored
      </Switch>
    </TweakWrapper>
  )
}
