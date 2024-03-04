import React, { type DetailedHTMLProps } from 'react'

interface CircleFilledIconProps extends DetailedHTMLProps<React.SVGAttributes<SVGSVGElement>, SVGSVGElement> {
  size?: number
  className?: string
}

export const CircleFilledIcon: React.FC<CircleFilledIconProps> = ({ size = '24', className, ...rest }) => {
  return (
    <svg className={className} width={size} viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round' {...rest}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z' strokeWidth='0' fill='currentColor' />
    </svg>
  )
}
