import { Button, ButtonGroup } from '@blueprintjs/core'
import { cn } from '@renderer/utils'
import { useMemo, useState } from 'react'
import { LuArrowLeft, LuArrowLeftToLine, LuArrowRight, LuArrowRightToLine } from 'react-icons/lu'

const Page = ({
  pageIndex,
  isSelected,
  className
}: {
  pageIndex: number
  isSelected?: boolean
  className?: string
}) => {
  if (isSelected)
    return (
      <div
        style={
          {
            // position: 'absolute',
            // left: `${(pageIndex || 1) * 10}px !important`
          }
        }
        className={cn('flex items-center justify-center opacity-50 font-bold z-10', {
          'opacity-100 rounded-full text-blue2 border-2 border-blue2 min-w-[25px] min-h-[25px]':
            isSelected,
          className
        })}
      >
        {pageIndex + 1}
      </div>
    )

  return (
    <div
      className={cn('opacity-50 font-bold', {
        'opacity-100 text-blue2': isSelected,
        className
      })}
    >
      {pageIndex + 1}
    </div>
  )
}

export type PaginationProps = {
  selectedPage: number
  totalPages: number
}

export const Pagination = (props: PaginationProps) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState(0)

  const pages = useMemo(() => {
    return Array(10)
      .fill(0)
      .map((_i, idx) => idx)
  }, [])

  const pagesToRender = Array(6)
    .fill(0)
    .map((_i, idx) => idx)

  const TOTAL_PAGES_LENGTH = useMemo(() => pages.length, [])
  const FIRST_PAGE = pages[0]
  const LAST_PAGE = pages[pages.length - 1]

  const renderPages = (idx: number) => {
    if (idx === 0 || idx === pages.length) return null

    if (idx === selectedPageIndex - 2 || idx === selectedPageIndex + 2) {
      // return <>...</>
    }

    return <Page pageIndex={idx} isSelected={idx === selectedPageIndex} />
  }

  return (
    <div className="relative flex px-2 py-2 border border-t-0 rounded-b bg-lightGray5 border-lightGray2">
      <div className="flex justify-start gap-3 rounded w-fit">
        <ButtonGroup>
          <Button
            icon={<LuArrowLeftToLine />}
            intent="none"
            onClick={() => {
              setSelectedPageIndex(0)
            }}
          />

          <Button
            icon={<LuArrowLeft />}
            intent="none"
            onClick={() => {
              setSelectedPageIndex((prev) => {
                if (prev - 1 < FIRST_PAGE) return prev
                return prev - 1
              })
            }}
          />

          <Button>
            <div className="flex flex-row items-center justify-center gap-5">
              <div className="flex items-center gap-5">
                <div className="font-bold flex items-center min-w-[60px] justify-center">
                  <div className="font-bold text-cerulean2">{selectedPageIndex + 1}&nbsp;</div>
                  <div className="text-gray1 opacity-70">/&nbsp;{TOTAL_PAGES_LENGTH}</div>
                </div>
              </div>
            </div>
          </Button>

          <Button
            icon={<LuArrowRight />}
            intent="none"
            onClick={() => {
              setSelectedPageIndex((prev) => {
                if (prev + 1 > TOTAL_PAGES_LENGTH - 1) return prev
                return prev + 1
              })
            }}
          />

          <Button
            icon={<LuArrowRightToLine />}
            intent="none"
            onClick={() => {
              setSelectedPageIndex(pages.length - 1)
            }}
          />
        </ButtonGroup>
      </div>
    </div>
  )
}
