import { POINT_SHAPES } from '@/constants/constants'

const pointShapes = Object.values(POINT_SHAPES)
export type PointShape = typeof pointShapes[number]