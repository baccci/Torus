import React from 'react'

export const MobileDragMark = () => {
  return (
    <div className='absolute top-3.5 left-0 right-0 z-[0] flex justify-center sm:hidden'>
      <span className='w-12 h-1.5 bg-slate-50/40 mix-blend-overlay rounded-full'></span>
    </div>
  )
}
