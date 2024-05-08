import { Button } from '@blueprintjs/core'
import { cn } from '@renderer/utils'
import { useId } from 'react'

export const Pagination = () => {
  const key = useId()

  return (
    <div className="flex bg-lightGray5 border border-lightGray2 border-t-0 rounded-b py-2 px-2">
      <div className="font-bold text-blue2 flex items-center min-w-[80px]">Pg.&nbsp; 5/10</div>

      <div className="flex gap-3 w-full justify-end">
        <Button icon="arrow-left" fill intent="none" className="max-w-[50px]" onClick={() => {}} />

        <div className="flex flex-row gap-5 justify-center items-center">
          {Array(10)
            .fill(0)
            .map((_i, idx) => (
              <div
                key={key}
                className={cn('opacity-50 font-bold', {
                  'opacity-100 text-blue2': idx === 5
                })}
              >
                {idx + 1}
              </div>
            ))}
        </div>

        <Button icon="arrow-right" fill intent="none" className="max-w-[50px]" onClick={() => {}} />
      </div>
    </div>
  )
}
