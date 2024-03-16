import type { RectReadOnly } from 'react-use-measure'
import type { Values } from './types'

export function calculateCoordinatesFromValues(
  values: Values | null,
  bounds: RectReadOnly,
  min: number | Array<number>,
  max: number | Array<number>
): { x: number; y: number } | null {
  if (!bounds.width || !bounds.height || !values) return null
  if ((!min && min !== 0) || (!max && max !== 0)) return { x: 0, y: 0 }

  const [minX, minY] = getLimitValues(min)
  const [maxX, maxY] = getLimitValues(max)
  const [valueX, valueY] = values

  const clampedX = Math.max(minX, Math.min(valueX, maxX))
  const clampedY = Math.max(minY, Math.min(valueY, maxY))

  const relativeX = (clampedX - minX) / (maxX - minX) * bounds.width
  const relativeY = (clampedY - minY) / (maxY - minY) * bounds.height

  return { x: relativeX, y: relativeY }
}

export function calculateValuesFromCoordinates(
  coordinates: { x: number; y: number },
  bounds: DOMRect | RectReadOnly,
  min: number | Array<number>,
  max: number | Array<number>
): Values {
  if (!bounds.width || !bounds.height) return [0, 0]
  if ((!min && min !== 0) || (!max && max !== 0)) return [0, 0]

  const [minX, minY] = getLimitValues(min)
  const [maxX, maxY] = getLimitValues(max)

  const relativeX = coordinates.x - bounds.left
  const relativeY = coordinates.y - bounds.top
  const clampedX = Math.max(0, Math.min(relativeX, bounds.width))
  const clampedY = Math.max(0, Math.min(relativeY, bounds.height))

  const valueX = (clampedX / bounds.width) * (maxX - minX) + minX
  const valueY = (clampedY / bounds.height) * (maxY - minY) + minY

  return [valueX, valueY]
}

const getLimitValues = (value: number | Array<number>) => {
  const valueX = Array.isArray(value) ? value[0] : value
  const valueY = Array.isArray(value) ? value[1] : value

  return [valueX, valueY] as const
}

/* type ReactChildWithDisplayName = React.ReactElement & { type: { displayName: string } }

export function getNotLayoutChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) => {
    if (!React.isValidElement(child)) return false
    const reactChild = child as ReactChildWithDisplayName
    const reactChildType = reactChild?.type as { displayName: string }

    return !Object.values(LAYOUT_DISPLAYNAMES).includes(reactChildType.displayName)
  })
} */