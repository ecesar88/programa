import { ContentScrollContainer, DataHeader, Loading } from '@renderer/components'
import { Read } from '@renderer/components/templates/Menu'
import { MenuEntry } from '@renderer/queries/graphql/codegen/graphql'
import { get } from '@renderer/queries/operations/menu'
import { useAtom } from 'jotai'
import { atomWithQuery } from 'jotai-tanstack-query'
import { useMemo } from 'react'
import { match } from 'ts-pattern'

export const Menu = () => {
  const queries = useMemo(() => {
    const menuEntriesAtom = atomWithQuery(() => ({
      queryKey: ['getAllMenuEntries'],
      queryFn: get,
      meta: {
        errorMessage: 'Erro ao obter o cardápio'
      }
    }))

    menuEntriesAtom.debugLabel = 'getAllMenuEntriesAtom'
    return { menuEntriesAtom }
  }, [])

  const [{ isLoading: isLoadingMenuEntries, data, refetch }] = useAtom(queries.menuEntriesAtom)

  return (
    <div className="flex flex-col gap-2 h-full">
      <DataHeader title="CARDÁPIO" />

      <ContentScrollContainer>
        {match(isLoadingMenuEntries)
          .with(true, () => <Loading />)
          .otherwise(() => (
            <Read menuEntries={(data?.getAllMenuEntries as MenuEntry[]) ?? []} />
          ))}
      </ContentScrollContainer>
    </div>
  )
}
