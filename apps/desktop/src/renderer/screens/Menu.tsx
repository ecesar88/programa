import { Order } from '@prisma/client'
import { ContentScrollContainer, DataHeader, Loading, ScreenMenuProps } from '@renderer/components'
import { Read } from '@renderer/components/templates/Menu'
import { OverlayMode } from '@renderer/constants/enums'
import { MenuEntry } from '@renderer/queries/graphql/codegen/graphql'
import { get } from '@renderer/queries/operations/menu'
import { useAtom } from 'jotai'
import { atomWithQuery } from 'jotai-tanstack-query'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { match } from 'ts-pattern'

export const Menu = () => {
  const { t } = useTranslation()

  // TODO: Implementar hook useOverlay
  // const {open: {isOpen, setIsOpen}, mode: {mode, setMode}} = useOverlay()
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [overlayMode, setOverlayMode] = useState<OverlayMode | null>(null)

  const openModalOverlay = useCallback(
    (mode: OverlayMode) => {
      setIsOverlayOpen(true)
      return setOverlayMode(mode)
    },
    [overlayMode]
  )

  const closeModalOverlay = useCallback(() => {
    setIsOverlayOpen(false)
    setOverlayMode(null)

    return false
  }, [overlayMode])

  type OrderWithoutId = Omit<Order, 'id'>
  const form = useForm<OrderWithoutId>({
    // resolver: zodResolver(CreateOrderResolver),
    // resolver: zodResolver(CreateOrderResolver),
    defaultValues: {}
  })

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

  const actions: ScreenMenuProps['actions'] & { refetch: () => void } = {
    refetch,
    onSaveClick: () => {
      // const onCreate: SubmitHandler<ClientWithoutId> = (data) => {
      //   createClientMutation(data)
      // }
      // const onEdit: SubmitHandler<ClientWithoutId> = (data) => {
      //   const { id } = rowData
      //   editClientMutation({
      //     clientId: id,
      //     clientData: data
      //   })
      // }
      // form.handleSubmit(overlayMode === OverlayMode.NEW ? onCreate : onEdit)()
    },
    onCancelClick: () => {
      form.reset()
      closeModalOverlay()
    }
  }

  return (
    <div className="flex flex-col gap-2 h-full">
      <DataHeader title={t('screens.menu.title')} />

      <ContentScrollContainer>
        {match(isLoadingMenuEntries)
          .with(true, () => <Loading />)
          .otherwise(() => (
            <Read actions={actions} menuEntries={(data?.getAllMenuEntries as MenuEntry[]) ?? []} />
          ))}
      </ContentScrollContainer>
    </div>
  )
}
