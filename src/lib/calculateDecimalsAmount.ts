/**
 * Calculates the number of decimal places in a given number.
 * @param number - The number to calculate the decimal places for.
 * @returns The number of decimal places in the given number.
 */
export const calculateDecimalsAmount = (number: number) => {
  if (typeof number !== 'number') return 0

  const decimalString = number.toString()

  if (!decimalString.includes('.')) return 0

  return decimalString.split('.')[1].length
}