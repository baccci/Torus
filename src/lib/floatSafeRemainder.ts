export function floatSafeRemainder(val: number, step: number) {
  const valDecCount = (val.toString().split('.')[1] || '').length
  const stepDecCount = (step.toString().split('.')[1] || '').length
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount
  const valInt = parseInt(val.toFixed(decCount).replace('.', ''))
  const stepInt = parseInt(step.toFixed(decCount).replace('.', ''))

  return (valInt % stepInt) / Math.pow(10, decCount)
}