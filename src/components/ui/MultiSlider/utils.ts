
export const sizeToValue = (size: number, min: number, max: number, wrapperSize: number) => {
  const value = (size / wrapperSize) * (max - min) + min
  return Math.round(value)
}

export const valueToSize = (value: number, min: number, max: number, wrapperSize: number) => {
  const size = (wrapperSize * (value - min)) / (max - min)
  return Math.round(size)
}