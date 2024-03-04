import React from 'react'
import type { Layout as LayoutType } from './types'
import { Titlebar } from './Titlebar'
import { Label } from './Label'
import { Value } from './Value'
import { Shadows } from './Shadows'
import { IndicatorDot } from './IndicatorDot'

const LAYOUT_DISPLAYNAMES = {
  Label: 'Label',
  Value: 'Value',
  Titlebar: 'Titlebar',
  Shadows: 'Shadows',
  IndicatorDot: 'IndicatorDot'
}

interface LayoutProps {
  children: React.ReactNode
  layout: LayoutType
}

export const Layout: React.FC<LayoutProps> = ({ children, layout }) => {
  const thereIsChildren = React.useMemo(() => searchForLayoutChildren(children), [children])

  const Components = {
    none: null,
    indicators: <Indicators />,
    shadows: <Shadows />,
    full: <Full />
  }[layout]

  const Display = thereIsChildren ? children : Components

  return (
    <>
      {Display}
    </>
  )
}

const Indicators = () => {
  return (
    <>
      <Titlebar>
        <Label />
        <Value />
      </Titlebar>
      <IndicatorDot />
    </>
  )
}

const Full = () => {
  return (
    <>
      <Indicators />
      <Shadows />
    </>
  )
}

function searchForLayoutChildren(children: React.ReactNode) {
  let thereIsChildren = false

  React.Children.forEach(children, (child: unknown) => {
    if (!React.isValidElement(child)) return
    const reactChild = child as { type: { displayName: string } } & React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
    const reactChildType = reactChild?.type as { displayName: string }

    const componentDisplayNames = Object.values(LAYOUT_DISPLAYNAMES)
    if (componentDisplayNames.includes(reactChildType.displayName)) {
      thereIsChildren = true
    }
  })

  return thereIsChildren
}