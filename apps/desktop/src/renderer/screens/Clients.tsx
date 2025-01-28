import { zodResolver } from '@hookform/resolvers/zod'
import { AlertModal, DataHeader, Dialog, Loading } from '@renderer/components'
import { CreateOrEditModal, Read } from '@renderer/components/templates/Clients'
import { OverlayMode } from '@renderer/constants/enums'
import { useCreateOrEditOverlay, useHandleModalState, useOnKeyDown } from '@renderer/hooks'
import {
  Client,
  CreateClientMutationVariables,
  ClientCreateOrUpdateInput
} from '@renderer/queries/graphql/codegen/graphql'
import { create, edit, get, purge } from '@renderer/queries/operations/client'
import {
  isLoadingAtom,
  rowDataFocusedAtom,
  rowMetaDataFocusedAtom,
  selectedRowAtom
} from '@renderer/store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import React, { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Id, toast } from 'react-toastify'
import { match } from 'ts-pattern'
import { ScreenMenuProps } from '../components/molecules/ScreenMenu'
import { CreateClientResolver } from '@repo/shared/resolvers'
import { queryKeys } from '@renderer/constants'

export const Clients = (): React.ReactNode => {
  const successToast = (message: string): Id => toast(message, { type: 'success' })

  const rowDataAtom = useAtomValue(rowDataFocusedAtom) as Client
  const setRowDataAtom = useSetAtom(rowDataFocusedAtom)

  const setRowMetaDataAtom = useSetAtom(rowMetaDataFocusedAtom)

  const setSelectedRowAtom = useSetAtom(selectedRowAtom)
  const setIsLoadingAtom = useSetAtom(isLoadingAtom)

  const clearSelectedRowAtom = () => setSelectedRowAtom({ data: {}, meta: { index: null } })

  const {
    openModal: openAlertModal,
    closeModal: closeAlertModal,
    isModalOpen: isDeleteModalOpen
  } = useHandleModalState()

  const { openOverlay, closeOverlay, isOverlayOpen, overlayMode } = useCreateOrEditOverlay()

  useOnKeyDown('Escape', () => {
    clearSelectedRowAtom()
  })

  const {
    isLoading: isLoadingClients,
    data,
    refetch
  } = useQuery({
    queryKey: queryKeys['clients']['getAll'],
    queryFn: get,
    meta: {
      errorMessage: 'Erro ao obter os clientes'
    }
  })

  const { mutate: createClientMutation, isPending: isLoadingCreateClient } = useMutation({
    mutationKey: queryKeys['clients']['create'],
    mutationFn: create,
    onSuccess: async () => {
      successToast('Cliente criado com sucesso!')
      closeOverlay()
      clearSelectedRowAtom()
      form.reset()

      await refetch()
    },
    meta: {
      errorMessage: 'Erro ao criar o cliente'
    }
  })

  const { mutate: editClientMutation, isPending: isLoadingUpdateClient } = useMutation({
    mutationKey: queryKeys['clients']['update'],
    mutationFn: edit,
    onSuccess: async () => {
      successToast('Cliente editado com sucesso!')
      clearSelectedRowAtom()
      closeOverlay()
      form.reset()

      await refetch()
    },
    meta: {
      errorMessage: 'Erro ao editar o cliente'
    }
  })

  const { mutate: deleteClientMutation } = useMutation({
    mutationKey: queryKeys['clients']['delete'],
    mutationFn: purge,
    onSuccess: async () => {
      successToast('Cliente deletado com sucesso!')
      clearSelectedRowAtom()

      await refetch()
    },
    meta: {
      errorMessage: 'Erro ao deletar o cliente'
    }
  })

  // Disable the buttons on ScreenMenu while loading the get request
  useEffect(() => {
    setIsLoadingAtom(isLoadingClients)
  }, [isLoadingClients])

  const form = useForm<Client>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolver: zodResolver(CreateClientResolver),
    defaultValues: {}
  })

  const handleDeleteActionButton = (): void => {
    deleteClientMutation(rowDataAtom?.id as number)

    clearSelectedRowAtom()
    closeAlertModal()
  }

  const actions: ScreenMenuProps['actions'] = {
    onNewClick: () => {
      openOverlay(OverlayMode.NEW)
    },
    onEditClick: () => {
      openOverlay(OverlayMode.EDIT)
    },
    onSaveClick: () => {
      const onCreate: SubmitHandler<Client> = (data): void => {
        createClientMutation(data as CreateClientMutationVariables)
      }

      const onEdit: SubmitHandler<Client> = (data): void => {
        const { id } = rowDataAtom

        editClientMutation({
          id: id!,
          data: data as ClientCreateOrUpdateInput
        })
      }

      const submit = (data: Client) => {
        if (overlayMode === OverlayMode.NEW) {
          onCreate(data)
        } else {
          onEdit(data)
        }
      }

      form.handleSubmit(submit)()
    },
    onDeleteClick: () => {
      openAlertModal()
    },
    onCancelClick: () => {
      form.reset()
      closeOverlay()
    }
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-col h-full gap-2">
        <DataHeader
          title="CLIENTES"
          menuProps={{
            actions
          }}
        />

        {match(isLoadingClients)
          .with(true, () => <Loading />)
          .otherwise(() => (
            <div className="flex flex-col gap-5 overflow-y-auto">
              <Read
                clients={(data?.getAllClients as Client[]) ?? []}
                onRowClick={(data, index) => {
                  setRowDataAtom(data)
                  setRowMetaDataAtom(index)
                }}
              />
            </div>
          ))}
      </div>

      <Dialog isOpen={isOverlayOpen} onClose={closeOverlay}>
        <CreateOrEditModal
          isLoading={isLoadingCreateClient || isLoadingUpdateClient}
          onSave={actions?.onSaveClick}
          onCancel={actions?.onCancelClick}
          overlayMode={overlayMode}
        />
      </Dialog>

      <AlertModal
        isOpen={isDeleteModalOpen}
        confirmButtonText="Deletar"
        cancelButtonText="Cancelar"
        icon="trash"
        intent="danger"
        actions={{
          onCancel: () => {
            closeAlertModal()
          },
          onConfirm: () => {
            handleDeleteActionButton()
          }
        }}
      >
        <p>
          Deletar o cliente <b>{rowDataAtom?.name}</b> ?
        </p>
      </AlertModal>
    </FormProvider>
  )
}
