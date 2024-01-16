import { CHANGE_RATE, HALF_PI } from '@/constants/constants'

/**
 * Converts a coordinate value to its display representation.
 * If the coordinate value is close to certain angles (π/2, π, 3π/2, 2π),
 * it returns the corresponding symbolic representation.
 * Otherwise, it returns the coordinate value as a string.
 * @param coordValue The coordinate value to convert.
 * @returns The display representation of the coordinate value.
 */
export const getCoordDisplayValue = (coordValue: number) => {
  if (coordValue > HALF_PI - CHANGE_RATE && coordValue < HALF_PI + CHANGE_RATE) return 'π/2'
  if (coordValue > Math.PI - CHANGE_RATE && coordValue < Math.PI + CHANGE_RATE) return 'π'
  if (coordValue > 3 * HALF_PI - CHANGE_RATE && coordValue < 3 * HALF_PI + CHANGE_RATE) return '3π/2'
  if (coordValue > 2 * Math.PI - CHANGE_RATE && coordValue < 2 * Math.PI + CHANGE_RATE) return '2π'
  return coordValue.toString()
}