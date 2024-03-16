import { Selector } from '@/components/ui/Selector/Selector'
import React from 'react'
import { ColorSlider } from './ColorSlider'
import { CircleFilledIcon } from '@/components/ui/Icons/CircleFilledIcon'
import { useTweaksContext } from '../../context'
import { COLOR_MANAGEMENT_ITEM_VALUES } from '../constants'
import { Card } from '@/components/ui/Card'
import { useTweaks } from '@/stores/tweaks'

export const ColorManagement: React.FC = () => {
  const {
    handleColoredChange,
    handleRedChannelChange,
    handleGreenChannelChange,
    handleBlueChannelChange
  } = useTweaksContext()
  const {
    redChannel,
    greenChannel,
    blueChannel,
    colored
  } = useTweaks()
  const selected = colored ? COLOR_MANAGEMENT_ITEM_VALUES[1] : COLOR_MANAGEMENT_ITEM_VALUES[0]

  // Filter the array to remove invalid values so the arrays are always a group of numbers
  const safeRedChannel = redChannel.filter(v => (v === 0 || v) && v >= 0 && v <= 255) as [number, number]
  const safeGreenChannel = greenChannel.filter(v => (v === 0 || v) && v >= 0 && v <= 255) as [number, number]
  const safeBlueChannel = blueChannel.filter(v => (v === 0 || v) && v >= 0 && v <= 255) as [number, number]

  const ColorComponentDisplay = {
    dynamic: <ColorChannels
      redChannel={safeRedChannel}
      greenChannel={safeGreenChannel}
      blueChannel={safeBlueChannel}
      handleRedChannelChange={handleRedChannelChange}
      handleGreenChannelChange={handleGreenChannelChange}
      handleBlueChannelChange={handleBlueChannelChange}
    />,
    white: null
  }[selected]

  return (
    <div className='flex justify-between gap-4 flex-wrap w-full'>
      <Selector
        label='Color'
        selected={selected}
        onSelectedChange={handleColoredChange}
      >
        <Selector.Item title='White color' value={COLOR_MANAGEMENT_ITEM_VALUES[0]}>
          <CircleFilledIcon size={16} />
        </Selector.Item>
        <Selector.Item title='Dynamic color' value={COLOR_MANAGEMENT_ITEM_VALUES[1]}>
          <CircleFilledIcon size={16} className='text-orange-500' />
        </Selector.Item>
      </Selector>
      {ColorComponentDisplay}
    </div>
  )
}

interface ColorChannelsProps {
  redChannel: [number, number]
  greenChannel: [number, number]
  blueChannel: [number, number]
  handleRedChannelChange: (values: [number, number]) => void
  handleGreenChannelChange: (values: [number, number]) => void
  handleBlueChannelChange: (values: [number, number]) => void
}

const ColorChannels: React.FC<ColorChannelsProps> = ({
  redChannel,
  greenChannel,
  blueChannel,
  handleRedChannelChange,
  handleGreenChannelChange,
  handleBlueChannelChange
}) => {
  // Filter the array to remove invalid values so the arrays are always a group of numbers
  const safeRedChannel = redChannel.filter(v => (v === 0 || v) && v >= 0 && v <= 255) as [number, number]
  const safeGreenChannel = greenChannel.filter(v => (v === 0 || v) && v >= 0 && v <= 255) as [number, number]
  const safeBlueChannel = blueChannel.filter(v => (v === 0 || v) && v >= 0 && v <= 255) as [number, number]

  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='w-full flex flex-col gap-2 lg:gap-0 lg:flex-row justify-between'>
        <ColorSlider
          label='Red channel'
          hue={0}
          className='w-full lg:w-[32.5%] p-4 lg:p-6'
          saturation={80}
          onValueChange={handleRedChannelChange}
          values={safeRedChannel}
        />
        <ColorSlider
          label='Green channel'
          hue={120}
          className='w-full lg:w-[32.5%] p-4 lg:p-6'
          saturation={80}
          onValueChange={handleGreenChannelChange}
          values={safeGreenChannel}
        />
        <ColorSlider
          label='Blue channel'
          hue={240}
          className='w-full lg:w-[32.5%] p-4 lg:p-6'
          saturation={80}
          onValueChange={handleBlueChannelChange}
          values={safeBlueChannel}
        />
      </div>
      <Card>
        <h3 className='text-xl mb-3'>Dynamic Colors</h3>
        <p className='text-white/50 text-pretty'>
          Dynamics colors are a combination of red, green and blue channels.
          Each channel is affected by the Y axis (or altitud) of the torus.
        </p>
      </Card>
    </div>
  )
}
