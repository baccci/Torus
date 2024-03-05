import type { PointShape } from '@/types/types'

interface PointArgs {
  context?: CanvasRenderingContext2D | null
  x?: number
  y?: number
  z?: number
  xp?: number
  yp?: number
  luminance?: number
  pointSize?: number
  minRed?: number
  maxRed?: number
  minGreen?: number
  maxGreen?: number
  minBlue?: number
  maxBlue?: number
  colored?: boolean
  pointShape?: PointShape
  luminanceEnhance?: number
}

export class Point {
  public context: CanvasRenderingContext2D | null = null
  public x: number = 0
  public y: number = 0
  public z: number = 0
  public xp: number = 0
  public yp: number = 0
  public luminance: number = 0
  public pointSize: number = 0
  public minRed = 60
  public maxRed = 180
  public minGreen = 20
  public maxGreen = 120
  public minBlue = 120
  public maxBlue = 220
  public colored = false
  public pointShape: PointShape = 'square'
  public luminanceEnhance = 1

  constructor({
    context,
    x,
    y,
    z,
    xp,
    yp,
    luminance,
    pointSize,
    minRed,
    maxRed,
    minGreen,
    maxGreen,
    minBlue,
    maxBlue,
    colored,
    pointShape,
    luminanceEnhance
  }: PointArgs) {
    this.context = context || this.context
    this.x = x || this.x
    this.y = y || this.y
    this.z = z || this.z
    this.xp = xp || this.xp
    this.yp = yp || this.yp
    this.luminance = luminance || this.luminance
    this.pointSize = pointSize || this.pointSize
    this.minRed = minRed || this.minRed
    this.maxRed = maxRed || this.maxRed
    this.minGreen = minGreen || this.minGreen
    this.maxGreen = maxGreen || this.maxGreen
    this.minBlue = minBlue || this.minBlue
    this.maxBlue = maxBlue || this.maxBlue
    this.colored = colored || this.colored
    this.pointShape = pointShape || this.pointShape

    this.luminanceEnhance = luminanceEnhance || this.luminanceEnhance
  }

  public draw() {
    if (!this.context || this.luminance < 0) return
    const zScalued = (this.z * 1 / this.yp) * 4000
    const z = zScalued ** 3

    const red = this.getRed(z)
    const green = this.getGreen(z)
    const blue = this.getBlue(z)
    const luminance = this.getLuminance(this.luminance)
    this.context.fillStyle = `rgba(255, 255, 255, ${luminance})`

    this.context.beginPath()
    if (this.colored) this.context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${luminance})`

    if (this.pointShape === 'square') this.context.rect(this.xp, this.yp, this.pointSize, this.pointSize)
    if (this.pointShape === 'circle') this.context.arc(this.xp, this.yp, this.pointSize / 2, 0, 2 * Math.PI)

    this.context.fill()
  }

  private getLuminance(initialLuminance: number) {
    const luminanceEnhance = this.luminanceEnhance >= 0.01 && this.luminanceEnhance <= 3 ? this.luminanceEnhance : 1
    const luminance = initialLuminance * luminanceEnhance
    if (luminance > 1) return 1
    return luminance
  }

  private getRed(number: number) {
    if (number < this.minRed) return this.minRed // 60
    if (number > this.maxRed) return this.maxRed // 180
    return number
  }

  private getGreen(number: number) {
    if (number < this.minGreen) return this.minGreen // 20
    if (number > this.maxGreen) return this.maxGreen // 120
    return number
  }

  private getBlue(number: number) {
    if (number < this.minBlue) return this.minBlue // 120
    if (number > this.maxBlue) return this.maxBlue // 220
    return number
  }

  public setContext(context: CanvasRenderingContext2D) {
    this.context = context
  }

  public setX(x: number) {
    this.x = x
  }

  public setY(y: number) {
    this.y = y
  }

  public setZ(z: number) {
    this.z = z
  }

  public setXp(xp: number) {
    this.xp = xp
  }

  public setYp(yp: number) {
    this.yp = yp
  }

  public setLuminance(luminance: number) {
    this.luminance = luminance
  }

  public setProps({
    x,
    y,
    z,
    xp,
    yp,
    luminance,
    pointSize,
    minRed,
    maxRed,
    minGreen,
    maxGreen,
    minBlue,
    maxBlue,
    colored,
    pointShape,
    luminanceEnhance
  }: PointArgs) {
    this.x = x || this.x
    this.y = y || this.y
    this.z = z || this.z
    this.xp = xp || this.xp
    this.yp = yp || this.yp
    this.luminance = luminance || this.luminance
    this.pointSize = pointSize || this.pointSize
    this.minRed = minRed || this.minRed
    this.maxRed = maxRed || this.maxRed
    this.minGreen = minGreen || this.minGreen
    this.maxGreen = maxGreen || this.maxGreen
    this.minBlue = minBlue || this.minBlue
    this.maxBlue = maxBlue || this.maxBlue
    this.colored = colored || this.colored
    this.pointShape = pointShape || this.pointShape
    this.luminanceEnhance = luminanceEnhance || this.luminanceEnhance
  }
}