import React, { useEffect, useState } from 'react'
import { FaClock, FaCalendarAlt } from 'react-icons/fa'

export const SystemTime = (): React.ReactNode => {
  const [value, setValue] = useState(new Date())
  const [locale] = useState(Intl.DateTimeFormat().resolvedOptions().locale)

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="flex gap-3 items-center bg-light-gray4 rounded px-2 py-1">
      <div className="flex flex-row gap-1 items-center">
        <div>
          <FaCalendarAlt />
        </div>
        <div>{`${value.toLocaleDateString(locale)}`}</div>
      </div>

      <div className="flex flex-row gap-1 items-center">
        <div>
          <FaClock />
        </div>

        <div>{`${value.toLocaleTimeString()}`}</div>
      </div>
    </div>
  )
}
