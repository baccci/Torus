import { Selector } from '@/components/ui/Selector/Selector'
import { useTweaksContext } from '../../context'
import { POINT_SHAPES } from '@/constants/constants'
import { SquareFilledIcon } from '@/components/ui/Icons/SquareFilledIcon'
import { CircleFilledIcon } from '@/components/ui/Icons/CircleFilledIcon'

export const PointShapeSelector = () => {
  const { pointShape, handlePointShapeChange } = useTweaksContext()
  return (
    <Selector
      label='Point shape'
      selected={pointShape}
      onSelectedChange={handlePointShapeChange}
    >
      <Selector.Item
        value={POINT_SHAPES.SQUARE}
        title='Square'
      >
        <SquareFilledIcon size={16} />
      </Selector.Item>
      <Selector.Item
        value={POINT_SHAPES.CIRCLE}
        title='Circle'
      >
        <CircleFilledIcon size={16} />
      </Selector.Item>
    </Selector>
  )
}
