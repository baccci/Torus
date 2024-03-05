import React from 'react'

interface SquareFilledIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

export const SquareFilledIcon: React.FC<SquareFilledIconProps> = ({ size = 24, ...rest }) => {
  return (
    <svg
      width={size}
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...rest}
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'/>
      <path d='M19 2h-14a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3 -3v-14a3 3 0 0 0 -3 -3z' strokeWidth='0' fill='currentColor' />
     </svg>
  )
}
