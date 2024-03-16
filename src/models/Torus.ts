import { PI } from '@/constants/constants'
import { Point } from './Point'
import type React from 'react'
import type { PointShape } from '@/types/types'

export interface TorusArgs {
  context?: CanvasRenderingContext2D | null
  xIncrement?: number,
  yIncrement?: number
  xRotation?: number
  yRotation?: number
  outerRadius?: number
  innerRadius?: number
  fieldOfView?: number
  distanceTorus?: number
  thetaIncrement?: number
  phiIncrement?: number
}

export class Torus {
  private context: CanvasRenderingContext2D | null = null
  private canvasRef: React.RefObject<HTMLCanvasElement> | null = null
  private xIncrement = 0
  private yIncrement = 0
  private xRotation = PI / 2
  private yRotation = PI
  private outerRadius = 1
  private innerRadius = 2
  private fieldOfView = 250
  private distanceTorus = 5
  private thetaIncrement = 0.3
  private phiIncrement = 0.1
  private cliking = false
  private thetaLimit = PI * 2
  private phiLimit = PI * 2
  private zBuffer: number[][] = []
  private pointSize = 2
  private zBufferSize = 0
  private previousTouch: React.Touch | null = null
  private colored?: boolean
  private minRed: number = 60
  private maxRed: number = 180
  private minGreen: number = 20
  private maxGreen: number = 120
  private minBlue: number = 120
  private maxBlue: number = 220
  private pointShape: PointShape = 'square'
  private luminanceEnhance: number = 1.2

  constructor({
    context,
    xIncrement,
    yIncrement,
    xRotation,
    yRotation,
    outerRadius,
    innerRadius,
    fieldOfView,
    distanceTorus,
    thetaIncrement,
    phiIncrement
  }: TorusArgs) {
    this.context = context || this.context
    this.xIncrement = xIncrement || this.xIncrement
    this.yIncrement = yIncrement || this.yIncrement
    this.xRotation = xRotation || this.xRotation
    this.yRotation = yRotation || this.yRotation
    this.outerRadius = outerRadius || this.outerRadius
    this.innerRadius = innerRadius || this.innerRadius
    this.fieldOfView = fieldOfView || this.fieldOfView
    this.distanceTorus = distanceTorus || this.distanceTorus
    this.thetaIncrement = thetaIncrement || this.thetaIncrement
    this.phiIncrement = phiIncrement || this.phiIncrement

    this.createZBuffer()
  }

  draw() {
    if (!this.context) return
    const { canvas } = this.context
    this.context.clearRect(0, 0, canvas.width, canvas.height)
    this.createZBuffer()

    const radius1 = this.outerRadius
    const radius2 = this.innerRadius
    const fieldOfView = this.fieldOfView // field of view | z' as a constant
    const distanceTorus = this.distanceTorus // distance from viewer to canvas plane

    this.incrementX()
    this.incrementY()

    const { cosX, sinX, cosY, sinY } = this.precomputeTrig()

    for (let theta = 0; theta < this.thetaLimit; theta += this.thetaIncrement) {
      // j <=> theta
      const cosTheta = Math.cos(theta)
      const sinTheta = Math.sin(theta) // cosine theta, sine theta

      for (let phi = 0; phi < this.phiLimit; phi += this.phiIncrement) {
        // i <=> phi
        const sinPhi = Math.sin(phi)
        const cosPhi = Math.cos(phi) // cosine phi, sine phi

        // 2D circle
        // (x, y, z) = (R2, 0, 0) + (R1 * cos(θ), R1 * sin(θ), 0)
        const circunferenceX = radius2 + radius1 * cosTheta // x = R2 + R1 * cos(θ)
        const circunferenceY = radius1 * sinTheta // y = R1 * sin(θ)

        // final 3D (x,y,z) coordinate after rotations
        const x =
          circunferenceX * (cosY * cosPhi + sinX * sinY * sinPhi) -
          circunferenceY * cosX * sinY // final 3D x coordinate
        const y =
          circunferenceX * (sinY * cosPhi - sinX * cosY * sinPhi) +
          circunferenceY * cosX * cosY // final 3D y
        const z =
          distanceTorus + cosX * circunferenceX * sinPhi + sinX * circunferenceY // final 3D z
        const ooz = 1 / z

        // x and y projection. note that y is negated here, because y goes up in 3D space but down on 2D displays.
        const xp: number = this.context.canvas.width / 2 + fieldOfView * ooz * x // x' = screen space coordinate, translated and scaled to fit our 320x240 canvas element
        const yp: number = this.context.canvas.height / 2 - fieldOfView * ooz * y // y' (it's negative here because in our output, positive y goes down but in our 3D space, positive y goes up)

        // luminance, scaled back to 0 to 1
        const luminance =
          0.7 *
          (cosPhi * cosTheta * sinY -
            cosX * cosTheta * sinPhi -
            sinX * sinTheta +
            cosY * (cosX * sinTheta - cosTheta * sinX * sinPhi))

        if (xp < 0 || xp >= canvas.width || yp < 0 || yp >= canvas.height) continue

        const { x: xTranslated, y: yTranslated } = this.canvasToGrid(xp, yp)

        if (ooz > this.zBuffer[xTranslated][yTranslated]) {
          this.zBuffer[xTranslated][yTranslated] = ooz
          const point = new Point({
            context: this.context,
            xp,
            yp,
            z: ooz,
            luminance,
            luminanceEnhance: this.luminanceEnhance,
            pointSize: this.pointSize,
            colored: this.colored,
            minRed: this.minRed,
            maxRed: this.maxRed,
            minGreen: this.minGreen,
            maxGreen: this.maxGreen,
            minBlue: this.minBlue,
            maxBlue: this.maxBlue,
            pointShape: this.pointShape
          })

          point.draw()
        }
      }
    }
    if (!this.xIncrement && !this.yIncrement) return

    requestAnimationFrame(() => this.draw())
  }

  precomputeTrig() {
    // precompute cosines and sines of A, B, theta, phi, same as before
    const cosX = Math.cos(this.xRotation)
    const sinX = Math.sin(this.xRotation)
    const cosY = Math.cos(this.yRotation)
    const sinY = Math.sin(this.yRotation)

    return {
      cosX,
      sinX,
      cosY,
      sinY
    }
  }

  private createZBuffer() {
    if (!this.context) return
    this.zBufferSize = (this.context.canvas.width * this.context.canvas.height) / this.pointSize
    const gridHalfSize = Math.ceil(Math.sqrt(this.zBufferSize))

    // Create the zBuffer as a 2D array of size gridHalfSize x gridHalfSize
    this.zBuffer = new Array(gridHalfSize).fill(0).map(() => new Array(gridHalfSize).fill(0))
  }

  private canvasToGrid(xp: number, yp: number) {
    if (!this.context) return { x: 0, y: 0 }
    const canvasWidth = this.context.canvas.width
    const canvasHeight = this.context.canvas.height
    const gridWidth = this.zBuffer.length
    const gridHeight = this.zBuffer[0].length

    const scaleX = canvasWidth / gridWidth
    const scaleY = canvasHeight / gridHeight

    const gridX = Math.floor(xp / scaleX)
    const gridY = Math.floor(yp / scaleY)

    return { x: gridX, y: gridY }
  }

  private incrementX() {
    let sum = this.xRotation + this.xIncrement
    if (sum > PI * 2) sum = sum - PI * 2

    this.xRotation = sum
  }

  private incrementY() {
    this.yRotation += this.yIncrement
  }

  public mouseMove(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!this.cliking) return

    // move the center of the torus based on mouse changes of movement
    this.xRotation += event.movementY / 100
    this.yRotation += event.movementX / 100
    this.draw()
  }

  public setCanvasRef(canvasRef: React.RefObject<HTMLCanvasElement>) {
    if (!canvasRef.current) return
    this.canvasRef = canvasRef

    // Add non passive event listeners for touch events
    canvasRef.current?.addEventListener(
      'touchmove',
      (e) => this.touchMove(e),
      { passive: false }
    )
  }

  public touchMove(event: TouchEvent) {
    if (!this.previousTouch) {
      this.previousTouch = event.touches[0]
      return
    }

    event.preventDefault()
    const touch = event.touches[0]
    const movementX = touch.pageX - this.previousTouch.pageX
    const movementY = touch.pageY - this.previousTouch.pageY

    this.xRotation += movementY / 500
    this.yRotation += movementX / 500

    this.draw()
  }

  public setContext(context: CanvasRenderingContext2D | null) {
    if (!context) return
    this.context = context
    this.createZBuffer()
    this.draw()
  }

  public setCliking(cliking: boolean) {
    this.cliking = cliking
  }

  public setXIncrement(xIncrement: number) {
    this.xIncrement = xIncrement
    this.draw()
  }

  public setYIncrement(yIncrement: number) {
    this.yIncrement = yIncrement
    this.draw()
  }

  public setThetaIncrement(thetaIncrement: number) {
    if (thetaIncrement <= 0) return
    this.thetaIncrement = thetaIncrement
    this.draw()
  }

  public setPhiIncrement(phiIncrement: number) {
    if (phiIncrement <= 0) return
    this.phiIncrement = phiIncrement
    this.draw()
  }

  public setXRotation(xRotation: number) {
    this.xRotation = xRotation
    this.draw()
  }

  public setYRotation(yRotation: number) {
    this.yRotation = yRotation
    this.draw()
  }

  public setOuterRadius(outerRadius: number) {
    this.outerRadius = outerRadius
    this.draw()
  }

  public setInnerRadius(innerRadius: number) {
    this.innerRadius = innerRadius
    this.draw()
  }

  public setFieldOfView(fieldOfView: number) {
    this.fieldOfView = fieldOfView
    this.draw()
  }

  public setDistanceTorus(distanceTorus: number) {
    this.distanceTorus = distanceTorus
    this.draw()
  }

  public setThetaLimit(thetaLimit: number) {
    if (thetaLimit <= 0) return
    this.thetaLimit = thetaLimit
    this.draw()
  }

  public setPhiLimit(phiLimit: number) {
    if (phiLimit <= 0) return
    this.phiLimit = phiLimit
    this.draw()
  }

  public setLuminanceEnhance(luminanceEnhance: number) {
    this.luminanceEnhance = luminanceEnhance
    this.draw()
  }

  public setColored(colored: boolean) {
    this.colored = colored
    this.draw()
  }

  public setRedChannel(min: number, max: number) {
    this.minRed = min
    this.maxRed = max
    this.draw()
  }

  public setGreenChannel(min: number, max: number) {
    this.minGreen = min
    this.maxGreen = max
    this.draw()
  }

  public setBlueChannel(min: number, max: number) {
    this.minBlue = min
    this.maxBlue = max
    this.draw()
  }

  public setPointShape(pointShape: PointShape) {
    this.pointShape = pointShape
    this.draw()
  }

  public get getPointShape() {
    return this.pointShape
  }

  public get getXIncrement() {
    return this.xIncrement
  }

  public get getYIncrement() {
    return this.yIncrement
  }

  public get getXRotation() {
    return this.xRotation
  }

  public get getYRotation() {
    return this.yRotation
  }

  public get getOuterRadius() {
    return this.outerRadius
  }

  public get getInnerRadius() {
    return this.innerRadius
  }

  public get getFieldOfView() {
    return this.fieldOfView
  }

  public get getDistanceTorus() {
    return this.distanceTorus
  }

  public get getThetaIncrement() {
    return this.thetaIncrement
  }

  public get getPhiIncrement() {
    return this.phiIncrement
  }

  public get getThetaLimit() {
    return this.thetaLimit
  }

  public get getPhiLimit() {
    return this.phiLimit
  }

  public get getLuminanceEnhance() {
    return this.luminanceEnhance
  }

  public get getColored() {
    return this.colored
  }

  public get getRedChannel() {
    return { min: this.minRed, max: this.maxRed }
  }

  public get getGreenChannel() {
    return { min: this.minGreen, max: this.maxGreen }
  }

  public get getBlueChannel() {
    return { min: this.minBlue, max: this.maxBlue }
  }
}

export default Torus