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
  public context: CanvasRenderingContext2D | null = null
  public xIncrement = 0
  public yIncrement = 0
  public xRotation = Math.PI / 2
  public yRotation = Math.PI
  public outerRadius = 1
  public innerRadius = 2
  public fieldOfView = 250
  public distanceTorus = 5
  public thetaIncrement = 0.3
  public phiIncrement = 0.1
  public cliking = false

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
  }

  draw() {
    if (!this.context) return
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)

    const radius1 = this.outerRadius
    const radius2 = this.innerRadius
    const fieldOfView = this.fieldOfView // field of view | z' as a constant
    const distanceTorus = this.distanceTorus // distance from viewer to canvas plane

    this.incrementX()
    this.incrementY()

    const { cosX, sinX, cosY, sinY } = this.precomputeTrig()

    for (let theta = 0; theta < Math.PI * 2; theta += this.thetaIncrement) {
      // j <=> theta
      const cosTheta = Math.cos(theta)
      const sinTheta = Math.sin(theta) // cosine theta, sine theta

      for (let phi = 0; phi < Math.PI * 2; phi += this.phiIncrement) {
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
        const xp = this.context.canvas.width / 2 + fieldOfView * ooz * x // x' = screen space coordinate, translated and scaled to fit our 320x240 canvas element
        const yp = this.context.canvas.height / 2 - fieldOfView * ooz * y // y' (it's negative here because in our output, positive y goes down but in our 3D space, positive y goes up)

        // luminance, scaled back to 0 to 1
        const luminance =
          0.7 *
          (cosPhi * cosTheta * sinY -
            cosX * cosTheta * sinPhi -
            sinX * sinTheta +
            cosY * (cosX * sinTheta - cosTheta * sinX * sinPhi))

        if (luminance > 0) {
          this.context.fillStyle = `rgba(255, 255, 255, ${luminance})`
          this.context.fillRect(xp, yp, 1.5, 1.5)
        }
      }
    }

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

  private incrementX() {
    this.xRotation += this.xIncrement
  }

  private incrementY() {
    this.yRotation += this.yIncrement
  }

  mouseMove(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!this.cliking) return

    // move the center of the torus based on mouse changes of movement
    this.xRotation += event.movementY / 100
    this.yRotation += event.movementX / 100
  }

  setCliking(cliking: boolean) {
    this.cliking = cliking
  }

  public setContext(context: CanvasRenderingContext2D | null) {
    if (!context) return
    this.context = context
  }

  public setXIncrement(xIncrement: number) {
    this.xIncrement = xIncrement
  }

  public setYIncrement(yIncrement: number) {
    this.yIncrement = yIncrement
  }

  public setThetaIncrement(thetaIncrement: number) {
    this.thetaIncrement = thetaIncrement
  }

  public setPhiIncrement(phiIncrement: number) {
    this.phiIncrement = phiIncrement
  }

  public setXRotation(xRotation: number) {
    this.xRotation = xRotation
  }

  public setYRotation(yRotation: number) {
    this.yRotation = yRotation
  }

  public setOuterRadius(outerRadius: number) {
    this.outerRadius = outerRadius
  }

  public setInnerRadius(innerRadius: number) {
    this.innerRadius = innerRadius
  }

  public setFieldOfView(fieldOfView: number) {
    this.fieldOfView = fieldOfView
  }

  public setDistanceTorus(distanceTorus: number) {
    this.distanceTorus = distanceTorus
  }
}


export default Torus