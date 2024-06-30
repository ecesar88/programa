import { DATA_HEADER_ID } from '@renderer/constants'
import React, { useEffect, useState } from 'react'

export const ContentScrollContainer = (props: { children: React.ReactNode }) => {
  const [dataHeaderHeight, setDataHeaderHeight] = useState(0)

  useEffect(() => {
    const height = document.getElementById(DATA_HEADER_ID)?.offsetHeight
    setDataHeaderHeight(height ?? 0)
  }, [])

  return (
    <div
      id="content-scroll-container"
      style={{ height: '100%', maxHeight: `calc(100% - ${dataHeaderHeight}px` }}
    >
      {props.children}
    </div>
  )
}
