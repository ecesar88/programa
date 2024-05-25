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
    <div className="flex bg-lightGray5 border border-lightGray2 border-t-0 rounded-b py-2 px-2 relative">
      <div className="flex gap-3 w-full justify-start">
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
        </ButtonGroup>

        <div className="flex flex-row gap-5 justify-center items-center">
          <div className="flex items-center gap-5">
            <div className="font-bold flex items-center min-w-[60px] justify-center text-gray1 opacity-80">
              {selectedPageIndex + 1}/{TOTAL_PAGES_LENGTH}
            </div>
            {/* {pages.map((page) => {
              return <Page key={page} pageIndex={page} isSelected={page === selectedPageIndex} />
            })} */}
            {/* <Page pageIndex={FIRST_PAGE} />
            {}
            {selectedPageIndex === FIRST_PAGE ? null : <>...</>}
            {}
            <Page pageIndex={selectedPageIndex - 1} />
            {}
            <div className="bg-[green]">
              <Page pageIndex={selectedPageIndex} isSelected={selectedPageIndex !== LAST_PAGE} />
            </div>
            {}
            {selectedPageIndex === LAST_PAGE - 1 || selectedPageIndex === LAST_PAGE ? null : (
              <div className="bg-[yellow]">
                <Page
                  pageIndex={selectedPageIndex === LAST_PAGE ? LAST_PAGE : selectedPageIndex + 1}
                />
              </div>
            )}
            {}
            {selectedPageIndex === LAST_PAGE || selectedPageIndex === LAST_PAGE - 1 ? null : (
              <>...</>
            )}
            {}
            <div className="bg-[red]">
              <Page pageIndex={LAST_PAGE} isSelected={selectedPageIndex === LAST_PAGE} />
            </div> */}
          </div>
        </div>

        <ButtonGroup>
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
