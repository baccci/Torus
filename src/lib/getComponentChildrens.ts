import React from 'react'

/**
 * Returns an array of React elements that match the specified display name.
 * @param children - The children to search through.
 * @param displayName - The display name to match against.
 * @returns An array of React elements that match the specified display name.
 */
const getChildrenOnDisplayName = (children: React.ReactNode, displayName: string) => {
  return React.Children.map(children, (child: unknown) => {
    const reactChild = child as { type: { displayName: string } } & React.ReactElement<any, string | React.JSXElementConstructor<any>>
    const reactChildType = reactChild?.type as { displayName: string }
    return reactChildType?.displayName === displayName ? child as React.ReactElement : null
  }
  )
}

export default getChildrenOnDisplayName

export const getChildrenWithoutDisplayName = (children: React.ReactNode, displayName: string) => {
  return React.Children.map(children, (child: unknown) => {
    const reactChild = child as { type: { displayName: string } }
    const reactChildType = reactChild?.type as { displayName: string }
    return reactChildType?.displayName !== displayName ? child as React.ReactElement : null
  }
  )
}