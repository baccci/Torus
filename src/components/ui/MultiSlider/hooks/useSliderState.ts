import React from 'react'
import SliderState from '../models/SliderState'
import type { RectReadOnly } from 'react-use-measure'
import type { Widths } from '../models/Widths'

interface UseSliderArgs {
  bounds: RectReadOnly
  numberOfSliders: number
  controlledValues?: number[]
  initialValues?: number[]
  max: number | string
  min: number | string
  onValueChange?: (values: number[]) => void
}

export const useSlidersValues = ({
  numberOfSliders,
  controlledValues,
  initialValues,
  onValueChange,
  bounds,
  max,
  min
}: UseSliderArgs) => {
  const api = React.useRef(new SliderState()).current

  api.init({
    boundsWidth: bounds.width,
    numberOfSliders,
    controlledValues,
    initialValues,
    max,
    min
  })

  const [widths, setWidths] = React.useState(api.getWidths())
  const [uncontrolledValues, setUncontrolledValues] = React.useState<number[]>([])
  const values = controlledValues ?? uncontrolledValues
  const setValues = React.useRef(onValueChange ?? setUncontrolledValues)

  React.useEffect(function subscribeToChanges() {
    const widthsSubscription = (newWidths: Widths) => setWidths(newWidths)
    const valuesSubscription = (newValues: number[]) => setValues.current(newValues)

    api.subscribe(widthsSubscription, 'widths')
    api.subscribe(valuesSubscription, 'values')

    return () => {
      api.unsubscribe(widthsSubscription, 'widths')
      api.unsubscribe(valuesSubscription, 'values')
    }
  }, [api])

  const state = {
    widths,
    values
  }

  return [state, api] as const
}
