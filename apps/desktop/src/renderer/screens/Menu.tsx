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
import { queryKeys } from '@renderer/constants'
import { OverlayMode } from '@renderer/constants/enums'
import { useCreateOrEditOverlay, useHandleModalState } from '@renderer/hooks'
import {
  CreateMenuEntryMutationVariables,
  MenuEntry,
  UpdateMenuEntryMutationVariables
} from '@renderer/queries/graphql/codegen/graphql'
import { create, edit, get, purge } from '@renderer/queries/operations/menu'
import { selectedRowAtom } from '@renderer/store'
import { errorToast, handleResponseStatus, successToast } from '@renderer/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import * as O from 'optics-ts'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { match } from 'ts-pattern'

export const Menu = () => {
  const [isEditModeActive, setIsEditModeActive] = useState(false)

  const { t } = useTranslation()

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
    queryKey: queryKeys['menu']['getAll'],
    queryFn: get,
    meta: {
      errorMessage: 'Erro ao obter o cardápio'
    }
  })

  const form = useForm<CreateMenuEntryMutationVariables['data']>({
    // resolver: zodResolver(MenuEntryCreateOrUpdateInputSchema),
    defaultValues: {}
  })

  const { mutate: createMenuEntryMutation, isPending: isLoadingCreateMenuEntry } = useMutation({
    mutationKey: queryKeys['menu']['create'],
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
    mutationKey: queryKeys['menu']['update'],
    mutationFn: edit,
    onSuccess: async (data) => {
      // TODO - test this
      handleResponseStatus<MenuEntry>({
        response: data?.updateMenuEntry as MenuEntry,
        Ok: () => {
          setIsEditModeActive(false)
          successToast('Produto modificado com sucesso!')
          closeMenuEntryModal()
          clearSelectedMenuEntryData()
          form.reset()

          refetch()
        },
        Err: (error) => {
          if (error.__typename === 'ZodError') {
            errorToast('Validation error')
            return
          }

          errorToast('API Error')
        }
      })
    },
    meta: {
      errorMessage: 'Erro ao modificar o produto'
    }
  })

  const { mutate: deleteMenuEntryMutation, isPending: isLoadingDeleteMenuEntry } = useMutation({
    mutationKey: queryKeys['menu']['delete'],
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
      console.log({ errors: form.formState.errors })

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

      const onSubmit = (variables: CreateMenuEntryMutationVariables['data']) => {
        // Price input values come in string format, we need to convert them to number (float 64)
        const variantPricesTraversal = O.optic<MenuEntryFormValues>()
          .prop('variants')
          .elems()
          .prop('price')

        const menuEntryWithParsedPrices = O.modify(variantPricesTraversal)(Number)(
          variables as MenuEntryFormValues
        ) as CreateMenuEntryMutationVariables['data']

        if (menuEntryModalMode === OverlayMode.NEW) {
          onCreate(menuEntryWithParsedPrices)
        } else {
          onEdit({
            id: menuEntryData?.id as number,
            data: menuEntryWithParsedPrices
          })
        }
      }

      form.handleSubmit(onSubmit)()
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
          isLoading={isLoadingCreateMenuEntry || isLoadingUpdateMenuEntry}
          editMode={{
            isEditModeActive,
            setIsEditModeActive
          }}
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
