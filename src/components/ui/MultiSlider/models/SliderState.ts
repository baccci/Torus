import { getNewSliderWidthsArray, sizeToValue, valueToSize, valuesToSizes } from '../utils'
import { safeParseNumber } from '@/lib/safeParseNumber'
import { Widths } from './Widths'

type Callback<T> = (value: T) => void

interface SliderInitializeMethodArgs {
  boundsWidth: number,
  numberOfSliders: number,
  controlledValues?: number[],
  max: number | string,
  min: number | string,
  initialValues?: number[]
}

const mountState = {
  firstRender: true,
  valuesAreControlled: false,
  skipFirstRenderValuesNotification: function () {
    if (this.firstRender && this.valuesAreControlled) {
      this.firstRender = false
      return true
    }
    return false
  }
}

export class SliderState {
  private widthsSubscribers = new Set<Callback<Widths>>()
  private valuesSubscribers = new Set<Callback<number[]>>()
  private min: number | string = 0
  private max: number | string = 0
  private values: number[] = []
  private widths: Widths = new Widths()
  private boundsWidth = 0
  private mountState = { ...mountState }

  public getWidths() {
    return this.widths
  }

  public getValues() {
    return this.values
  }

  public getValue(index: number) {
    return this.values[index]
  }

  public getState() {
    return {
      widths: this.widths,
      values: this.values
    }
  }

  public getWidthsSubscribers() {
    return this.widthsSubscribers
  }

  public getValuesSubscribers() {
    return this.valuesSubscribers
  }

  public hasSuscriber<T extends Widths | number[]>(
    callback: Callback<T>,
    _listName: T extends Widths ? 'widths' : 'values'
  ) {
    const listName: 'widths' | 'values' = _listName ?? 'widths'

    const selectedList = {
      widths: this.widthsSubscribers,
      values: this.valuesSubscribers
    }[listName] as Set<Callback<T>>

    return selectedList.has(callback)
  }

  public subscribe<T extends Widths | number[]>(
    callback: Callback<T>,
    _listName: T extends Widths ? 'widths' : 'values'
  ) {
    const listName: 'widths' | 'values' = _listName ?? 'widths'

    const selectedList = {
      widths: this.widthsSubscribers,
      values: this.valuesSubscribers
    }[listName] as Set<Callback<T>>

    selectedList.add(callback)
  }

  public unsubscribe<T extends Widths | number[]>(
    callback: Callback<T>,
    _listName: T extends Widths ? 'widths' : 'values'
  ) {
    const listName: 'widths' | 'values' = _listName ?? 'widths'

    const selectedList = {
      widths: this.widthsSubscribers,
      values: this.valuesSubscribers
    }[listName] as Set<Callback<T>>

    selectedList.delete(callback)
  }

  private notifyChanges() {
    const { mountState } = this
    this.widthsSubscribers.forEach(subscriber => subscriber(this.widths))

    if (mountState.skipFirstRenderValuesNotification()) return
    this.valuesSubscribers.forEach(subscriber => subscriber(this.values))
  }

  public init({
    numberOfSliders,
    controlledValues,
    boundsWidth: _boundsWidth,
    min: _min,
    max: _max,
    initialValues: _initialValues
  }: SliderInitializeMethodArgs) {

    // If there are already widths, do not calculate them again
    if (this.widths.getLength()) return
    // If there are no sliders or boundsWidth is 0, do not calculate widths
    if (!numberOfSliders || _boundsWidth === 0) return

    this.min = _min
    this.max = _max
    this.boundsWidth = _boundsWidth
    const initialValues = controlledValues ?? _initialValues

    if (!initialValues || !initialValues.length) {
      return this.setInitialNotControlledWidths(numberOfSliders, this.boundsWidth)
    }

    if (controlledValues?.length) this.mountState.valuesAreControlled = true
    this.setInitialControlledWidths(initialValues, this.min, this.max, this.boundsWidth)

    return this
  }

  private setInitialNotControlledWidths(numberOfSliders: number, wrapperWidth: number) {
    const initialWidths = Array(numberOfSliders).fill({ width: 0 })
    const initialWidth = wrapperWidth / numberOfSliders
    const newWidths = initialWidths.map(() => (initialWidth))

    this.widths = new Widths(newWidths)
    this.updateValues()
  }

  private setInitialControlledWidths(controlledValues: number[], min: number | string, max: number | string, boundsWidth: number) {
    const newWidths = valuesToSizes(controlledValues, min, max, boundsWidth)
    this.widths = new Widths(newWidths)
    this.updateValues()
  }

  public updateWidthsWithDelta(deltaX: number, index: number | null) {
    if (!index && index !== 0) return

    const currentIndexWidth = this.widths.getWidth(index)
    const nextIndexWidth = this.widths.getWidth(index + 1)

    const newWidthCurrentIndex = currentIndexWidth + deltaX
    const newWidthNextIndex = nextIndexWidth - deltaX

    if (newWidthCurrentIndex < 0 || newWidthNextIndex < 0) {
      const lastInBoundsValue = newWidthCurrentIndex < 0
        ? currentIndexWidth
        : nextIndexWidth
      const newDeltaX = newWidthCurrentIndex < 0
        ? - lastInBoundsValue
        : lastInBoundsValue

      const fixedWidthCurrentIndex = currentIndexWidth + newDeltaX
      const fixedWidthNextIndex = nextIndexWidth - newDeltaX

      const newWidths = getNewSliderWidthsArray(index, fixedWidthCurrentIndex, fixedWidthNextIndex, this.widths.getWidths())
      this.widths = new Widths(newWidths)

      return this.updateValues()
    }

    const newWidths = getNewSliderWidthsArray(index, newWidthCurrentIndex, newWidthNextIndex, this.widths.getWidths())
    this.widths = new Widths(newWidths)
    this.updateValues()
  }

  public updateWidthsWithAbsoluteValue(x: number, sliderX: number | null, index: number | null) {
    if (!sliderX || !index && index !== 0) return
    const currentIndexWidth = this.widths.getWidth(index)
    const nextIndexWidth = this.widths.getWidth(index + 1)

    const newCurrentIndexWidth = x - sliderX
    const deltaWidth = newCurrentIndexWidth - currentIndexWidth
    const newNextIndexWidth = nextIndexWidth - deltaWidth

    if (newCurrentIndexWidth < 0 || newNextIndexWidth < 0) {
      const lastInBoundsValue = newCurrentIndexWidth < 0
        ? currentIndexWidth
        : nextIndexWidth
      const newDeltaX = newCurrentIndexWidth < 0
        ? - lastInBoundsValue
        : lastInBoundsValue

      const fixedWidthCurrentIndex = currentIndexWidth + newDeltaX
      const fixedWidthNextIndex = nextIndexWidth - newDeltaX

      const newWidths = getNewSliderWidthsArray(index, fixedWidthCurrentIndex, fixedWidthNextIndex, this.widths.getWidths())
      this.widths = new Widths(newWidths)

      return this.updateValues()
    }

    const newWidths = getNewSliderWidthsArray(index, newCurrentIndexWidth, newNextIndexWidth, this.widths.getWidths())
    this.widths = new Widths(newWidths)
    this.updateValues()
  }

  public updateValue(index: number, value: number) {
    const safeMin = safeParseNumber(this.min)
    const safeMax = safeParseNumber(this.max)
    if (value < safeMin || value > safeMax) return
    if (value < this.getValue(index - 1) || value > this.getValue(index + 1)) return

    const accumulatedWidths = this.widths
      .getWidths()
      .slice(0, index)
      .reduce((acc, width) => acc + width, 0)
    const newValueWidth = valueToSize(value, safeMin, safeMax, this.boundsWidth) - accumulatedWidths
    const deltaWidth = this.widths.getWidth(index) - newValueWidth
    const nextIndexWidth = this.widths.getWidth(index + 1) + deltaWidth

    const newWidths = getNewSliderWidthsArray(index, newValueWidth, nextIndexWidth, this.widths.getWidths())
    this.widths = new Widths(newWidths)
    this.updateValues()
  }

  public addToValue(index: number, value: number) {
    const currentValue = this.getValue(index)
    this.updateValue(index, currentValue + value)
  }

  public setValueToMin(index: number) {
    const safeMin = safeParseNumber(this.min)

    const minimunPossibleValue = index === 0
      ? safeMin
      : this.getValue(index - 1) + 1

    this.updateValue(index, minimunPossibleValue)
  }

  public setValueToMax(index: number) {
    const safeMax = safeParseNumber(this.max)

    const maximumPossibleValue = index === this.widths.getLength() - 1
      ? safeMax
      : this.getValue(index + 1) - 1

    this.updateValue(index, maximumPossibleValue)
  }

  private updateValues() {
    if (this.min === this.max || this.max === 0 || this.boundsWidth === 0) return
    const parsedMin = safeParseNumber(this.min)
    const parsedMax = safeParseNumber(this.max)

    const accumulatedWidths = this.widths
      .getWidths()
      .slice(0, -1)
      .reduce((acc, width, index) => {
        if (index === 0) return [width]
        acc.push(acc[index - 1] + width)

        return [...acc]
      }, <number[]>[])

    const newValues = accumulatedWidths.map((width) => {
      return sizeToValue(width, parsedMin, parsedMax, this.boundsWidth)
    })

    this.values = newValues
    this.notifyChanges()
  }
}

export default SliderState