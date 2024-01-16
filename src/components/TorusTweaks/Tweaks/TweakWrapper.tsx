import React from 'react'

interface TweakWrapperProps {
  children: React.ReactNode
}

export const TweakWrapper: React.FC<TweakWrapperProps> = ({ children }) => {
  return (
    <div className='flex justify-between gap-8 flex-wrap w-full'>
      {children}
    </div>
  )
}
