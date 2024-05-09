import { Button, ButtonGroup } from '@blueprintjs/core'
import { cn } from '@renderer/utils'
import { useMemo, useState } from 'react'
import { LuArrowLeft, LuArrowLeftToLine, LuArrowRight, LuArrowRightToLine } from 'react-icons/lu'

export type PaginationProps = {
  selectedPage: number
  totalPages: number
}

export const Pagination = (props: PaginationProps) => {
  const [selectedPageIndex, setSelectedPage] = useState(0)

  const pages = useMemo(() => {
    return Array(10)
      .fill(0)
      .map((_i, idx) => idx)
  }, [])

  const TOTAL_PAGES = useMemo(() => pages.length, [])
  const FIRST_PAGE = pages[0]
  const LAST_PAGE = pages[pages.length - 1]

  const renderPages = (idx: number) => {
    return (
      <div
        key={idx}
        className={cn('opacity-50 font-bold', {
          'opacity-100 text-blue2': idx === selectedPageIndex
        })}
      >
        {idx + 1}
      </div>
    )
  }

  return (
    <div className="flex bg-lightGray5 border border-lightGray2 border-t-0 rounded-b py-2 px-2">
      <div className="flex gap-3 w-full justify-start">
        <ButtonGroup>
          <Button
            icon={<LuArrowLeftToLine />}
            intent="none"
            onClick={() => {
              setSelectedPage(0)
            }}
          />

          <Button
            icon={<LuArrowLeft />}
            intent="none"
            onClick={() => {
              setSelectedPage((prev) => prev - 1)
            }}
          />
        </ButtonGroup>

        <div className="flex flex-row gap-5 justify-center items-center">
          {pages.map((_i, idx) => renderPages(idx))}
        </div>

        <ButtonGroup>
          <Button
            icon={<LuArrowRight />}
            intent="none"
            onClick={() => {
              setSelectedPage((prev) => prev + 1)
            }}
          />

          <Button
            icon={<LuArrowRightToLine />}
            intent="none"
            onClick={() => {
              setSelectedPage(pages.length)
            }}
          />
        </ButtonGroup>

        <div className="font-bold flex items-center min-w-[80px] text-gray1 opacity-80">
          {selectedPageIndex + 1}/{TOTAL_PAGES}
        </div>
      </div>
    </div>
  )
}
