export class Widths {
  private widths: number[]
  constructor(widths?: number[]) {
    this.widths = widths ?? []
  }

  public getWidths() {
    return this.widths
  }

  public getWidth(index: number) {
    return this.widths[index]
  }

  public getFormattedWidth(index: number) {
    return `${this.widths[index]}px`
  }

  public getLength() {
    return this.widths.length
  }
}