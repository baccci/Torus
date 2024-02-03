/**
 * Parses the given value into a number, handling various data types and edge cases.
 * 
 * @param value - The value to parse into a number.
 * @param onlyInteger - Optional. If true, only parses the value as an integer. Defaults to false.
 * @returns The parsed number value.
 */
export function safeParseNumber(value: unknown, onlyInteger = false) {
  if (value === null) return 0

  if (typeof value === "undefined") return 0

  if (typeof value === 'object') {
    const numberOfEntries = Object.values(value).length
    if (!numberOfEntries) return 0
    return 1
  }

  if (typeof value === "boolean") {
    return value ? 1 : 0
  }

  if (typeof value === "function") return 1

  if (typeof value === "symbol") return 1

  if (typeof value === "number") return value

  if (typeof value === "bigint") return Number(value)

  if (typeof value === "string") {
    const valueArray = value.split('')
    const filteredValueArray = valueArray.filter((val, index) => {
      if (val === '.') {
        if (valueArray.slice(0, index).some(val => val === '.')) return false
        return true
      }

      const numberValue = parseInt(val)
      if (isNaN(numberValue)) return false

      return numberValue
    })

    const valueString = filteredValueArray.join('')

    if (valueString === '') return 0

    const parsedNumber = onlyInteger
      ? parseInt(valueString)
      : parseFloat(valueString)

    if (isNaN(parsedNumber)) return 0
    return parsedNumber
  }

  return 0
}