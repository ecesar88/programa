import {
  AlertModal,
  ContentScrollContainer,
  DataHeader,
  Dialog,
  Loading,
  ScreenMenuProps
} from '@renderer/components'
import { Read } from '@renderer/components/templates/Menu'
import {
  CreateOrEditModal,
  MenuEntryFormValues
} from '@renderer/components/templates/Menu/CreateOrEdit'
import { OverlayMode } from '@renderer/constants/enums'
import { useCreateOrEditOverlay, useHandleModalState } from '@renderer/hooks'
import {
  CreateMenuEntryMutationVariables,
  MenuEntry,
  UpdateMenuEntryMutationVariables
} from '@renderer/queries/graphql/codegen/graphql'
import { create, edit, get, purge } from '@renderer/queries/operations/menu'
import { selectedRowAtom } from '@renderer/store'
import { todo } from '@renderer/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import * as O from 'optics-ts'
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

  const clearSelectedMenuEntryData = () => setMenuEntryData({ data: {}, meta: { index: null } })

  const {
    isLoading: isLoadingGetAllMenuEntries,
    data,
    refetch
  } = useQuery({
    queryKey: ['getAllMenuEntries'],
    queryFn: get,
    meta: {
      errorMessage: 'Erro ao obter o cardápio'
    }
  })

  const form = useForm<CreateMenuEntryMutationVariables['data']>({
    // resolver: zodResolver(CreateMenuEntryResolver), // TODO - add resolver
    defaultValues: {}
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

  const { mutate: updateMenuEntryMutation, isPending: isLoadingUpdateMenuEntry } = useMutation({
    mutationKey: ['updateMenuEntry'],
    mutationFn: edit,
    onSuccess: async () => {
      successToast('Produto modificado com sucesso!')
      closeMenuEntryModal()
      clearSelectedMenuEntryData()
      form.reset()

      await refetch()
    },
    meta: {
      errorMessage: 'Erro ao modificar o produto'
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
    refetch: async () => {
      await refetch()
    },
    onSaveClick: () => {
      const onCreate: SubmitHandler<CreateMenuEntryMutationVariables['data']> = (data) => {
        createMenuEntryMutation({ data })
      }

      const onEdit: SubmitHandler<UpdateMenuEntryMutationVariables> = (variables) => {
        const { id, data } = variables

        updateMenuEntryMutation({
          id,
          data
        })
      }

      const submit = async (variables: CreateMenuEntryMutationVariables['data']) => {
        console.log('variables >>> ', variables)
        const pricesTraversal = O.optic<MenuEntryFormValues>()
          .prop('variants')
          .elems()
          .prop('price')

        const menuEntryWithParsedPrices = O.modify(pricesTraversal)(Number)(
          variables as MenuEntryFormValues
        ) as CreateMenuEntryMutationVariables['data']

        if (menuEntryModalMode === OverlayMode.NEW) {
          await onCreate(menuEntryWithParsedPrices)
        } else {
          // const {} = menuEntryWithParsedPrices
          // todo('// TODO - implement edition: onEdit(data)')
          console.log({ id: menuEntryData?.id as number, data: menuEntryWithParsedPrices })
          await onEdit({
            id: menuEntryData?.id as number,
            data: menuEntryWithParsedPrices
          })
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
      <div className="flex flex-col gap-2 h-full relative">
        <DataHeader title={t('screens.menu.title')} />

        {/* <SuspenseLoading isLoading={isLoadingAtomValue} /> */}

        <ContentScrollContainer>
          {match(isLoadingGetAllMenuEntries)
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
            deleteMenuEntryMutation({ id: menuEntryData?.id as number })
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
