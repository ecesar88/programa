import { Order } from '@prisma/client'
import {
  ContentScrollContainer,
  DataHeader,
  Dialog,
  Loading,
  ScreenMenuProps
} from '@renderer/components'
import { Read } from '@renderer/components/templates/Menu'
import { CreateOrEditModal } from '@renderer/components/templates/Menu/CreateOrEdit'
import { useCreateOrEditOverlay } from '@renderer/hooks'
import { MenuEntry } from '@renderer/queries/graphql/codegen/graphql'
import { get } from '@renderer/queries/operations/menu'
import { useAtom } from 'jotai'
import { atomWithQuery } from 'jotai-tanstack-query'
import { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { match } from 'ts-pattern'

export const Menu = () => {
  const { t } = useTranslation()

  const { openOverlay, closeOverlay, isOverlayOpen, overlayMode } = useCreateOrEditOverlay()

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
      closeOverlay()
    }
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-2 h-full">
        <DataHeader title={t('screens.menu.title')} />

        <ContentScrollContainer>
          {match(isLoadingMenuEntries)
            .with(true, () => <Loading />)
            .otherwise(() => (
              <Read
                actions={actions}
                openOverlay={openOverlay}
                menuEntries={(data?.getAllMenuEntries as MenuEntry[]) ?? []}
              />
            ))}
        </ContentScrollContainer>
      </div>

      <Dialog isOpen={isOverlayOpen} onClose={closeOverlay}>
        <CreateOrEditModal
          overlayMode={overlayMode}
          onSave={actions.onSaveClick}
          onCancel={closeOverlay}
        />
      </Dialog>
    </FormProvider>
  )
}
