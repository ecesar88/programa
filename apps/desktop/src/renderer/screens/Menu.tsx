import {
  AlertModal,
  ContentScrollContainer,
  DataHeader,
  Dialog,
  Loading,
  ScreenMenuProps
} from '@renderer/components'
import { Read } from '@renderer/components/templates/Menu'
import { CreateOrEditModal } from '@renderer/components/templates/Menu/CreateOrEdit'
import { OverlayMode } from '@renderer/constants/enums'
import { useCreateOrEditOverlay, useHandleModalState } from '@renderer/hooks'
import {
  CreateMenuEntryMutationVariables,
  MenuEntry
} from '@renderer/queries/graphql/codegen/graphql'
import { create, get, purge } from '@renderer/queries/operations/menu'
import { selectedRowAtom } from '@renderer/store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Id, toast } from 'react-toastify'
import { match } from 'ts-pattern'

export const Menu = () => {
  const { t } = useTranslation()
  const successToast = (message: string): Id => toast(message, { type: 'success' })

  const {
    openOverlay: openMenuEntryModal,
    closeOverlay: closeMenuEntryModal,
    isOverlayOpen: isMenuEntryModalOpen,
    overlayMode: menuEntryModalMode
  } = useCreateOrEditOverlay()

  const {
    openModal: openDeleteAlertModal,
    closeModal: closeDeleteAlertModal,
    isModalOpen: isDeleteModalOpen
  } = useHandleModalState()

  const menuEntryData = useAtomValue(selectedRowAtom).data as MenuEntry
  const setMenuEntryData = useSetAtom(selectedRowAtom)
  // const setIsLoadingAtom = useSetAtom(isLoadingAtom)

  const clearSelectedMenuEntryData = () => setMenuEntryData({ data: {}, meta: { index: null } })

  const form = useForm<CreateMenuEntryMutationVariables>({
    // resolver: zodResolver(CreateMenuEntryResolver), // TODO - add resolver
    defaultValues: {}
  })

  const {
    isLoading: isLoadingMenuEntries,
    data,
    refetch
  } = useQuery({
    queryKey: ['getAllMenuEntries'],
    queryFn: get,
    meta: {
      errorMessage: 'Erro ao obter o cardápio'
    }
  })

  const { mutate: createMenuEntryMutation, isPending: isLoadingCreateMenuEntry } = useMutation({
    mutationKey: ['createMenuEntry'],
    mutationFn: create,
    onSuccess: async () => {
      successToast('Produto criado com sucesso!')
      closeMenuEntryModal()
      clearSelectedMenuEntryData()
      form.reset()

      await refetch()
    },
    meta: {
      errorMessage: 'Erro ao criar o produto'
    }
  })

  const { mutate: deleteMenuEntryMutation, isPending: isLoadingDeleteMenuEntry } = useMutation({
    mutationKey: ['deleteMenuEntry'],
    mutationFn: purge,
    onSuccess: async () => {
      successToast('Produto excluído com sucesso!')
      clearSelectedMenuEntryData()
      closeDeleteAlertModal()
      closeMenuEntryModal()
      form.reset()

      await refetch()
    },
    meta: {
      errorMessage: 'Erro ao excluir o produto'
    }
  })

  const actions: ScreenMenuProps['actions'] & { refetch: () => void } = {
    refetch,
    onSaveClick: () => {
      const onCreate: SubmitHandler<CreateMenuEntryMutationVariables> = (data) => {
        createMenuEntryMutation(data)
      }

      // const onEdit: SubmitHandler<any> = async (data) => {
      //   console.log('não vai criar')

      //   return await ''
      // }

      // const onEdit: SubmitHandler<ClientWithoutId> = (data) => {
      //   const { id } = rowData
      //   editClientMutation({
      //     clientId: id,
      //     clientData: data
      //   })
      // }

      const submit = async (data: CreateMenuEntryMutationVariables) => {
        if (menuEntryModalMode === OverlayMode.NEW) {
          await onCreate(data)
        } else {
          // TODO - implement edition
          // onEdit(data)
          console.log('NOT IMPLEMENTED')
        }
      }

      form.handleSubmit(submit)()
    },
    onDeleteClick: () => {
      openDeleteAlertModal()
    },
    onCancelClick: () => {
      form.reset()
      closeMenuEntryModal()
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
                openOverlay={openMenuEntryModal}
                menuEntries={(data?.getAllMenuEntries as MenuEntry[]) ?? []}
              />
            ))}
        </ContentScrollContainer>
      </div>

      <Dialog isOpen={isMenuEntryModalOpen} onClose={closeMenuEntryModal}>
        <CreateOrEditModal
          onSave={actions.onSaveClick}
          onDelete={actions.onDeleteClick}
          onCancel={actions.onCancelClick}
          overlayMode={menuEntryModalMode}
          menuEntryData={menuEntryData}
          isLoading={isLoadingCreateMenuEntry}
        />
      </Dialog>

      <AlertModal
        isOpen={isDeleteModalOpen}
        confirmButtonText="Deletar"
        isLoading={isLoadingDeleteMenuEntry}
        cancelButtonText="Cancelar"
        icon="trash"
        intent="danger"
        actions={{
          onCancel: () => {
            closeDeleteAlertModal()
          },
          onConfirm: () => {
            deleteMenuEntryMutation((menuEntryData?.id as number) ?? 0)
          }
        }}
      >
        <p>
          Deletar o item <b>{menuEntryData?.name}</b> ?
        </p>
      </AlertModal>
    </FormProvider>
  )
}
