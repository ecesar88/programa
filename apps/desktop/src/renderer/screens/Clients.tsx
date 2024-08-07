import { zodResolver } from '@hookform/resolvers/zod'
import { AlertModal, DataHeader, Dialog, Loading } from '@renderer/components'
import { CreateOrEditModal, Read } from '@renderer/components/templates/Clients'
import { OverlayMode } from '@renderer/constants/enums'
import { useCreateOrEditOverlay, useHandleModalState, useOnKeyDown } from '@renderer/hooks'
import {
  Client,
  CreateClientMutationVariables,
  UserUpdateInput
} from '@renderer/queries/graphql/codegen/graphql'
import { create, edit, get, purge } from '@renderer/queries/operations/client'
import {
  isLoadingAtom,
  rowDataFocusedAtom,
  rowMetaDataFocusedAtom,
  selectedRowAtom
} from '@renderer/store'
import { CreateClientResolver } from '@repo/shared/resolvers'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithMutation, atomWithQuery } from 'jotai-tanstack-query'
import React, { useEffect, useMemo } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Id, toast } from 'react-toastify'
import { match } from 'ts-pattern'
import { ScreenMenuProps } from '../components/molecules/ScreenMenu'

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

  const queries = useMemo(() => {
    const clientsAtom = atomWithQuery(() => ({
      queryKey: ['getAllClients'],
      queryFn: get,
      meta: {
        errorMessage: 'Erro ao obter os clientes'
      }
    }))

    clientsAtom.debugLabel = 'getAllClientsAtom'
    return { clientsAtom }
  }, [])

  const mutations = useMemo(() => {
    const createClientAtom = atomWithMutation(() => ({
      mutationKey: ['createClient'],
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
    }))

    const editClientAtom = atomWithMutation(() => ({
      mutationKey: ['editClient'],
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
    }))

    const deleteClientAtom = atomWithMutation(() => ({
      mutationKey: ['deleteClient'],
      mutationFn: purge,
      onSuccess: async () => {
        successToast('Cliente deletado com sucesso!')
        clearSelectedRowAtom()

        await refetch()
      },
      meta: {
        errorMessage: 'Erro ao deletar o cliente'
      }
    }))

    createClientAtom.debugLabel = 'createClientAtom'
    deleteClientAtom.debugLabel = 'deleteClientAtom'
    editClientAtom.debugLabel = 'editClientAtom'

    return { createClientAtom, deleteClientAtom, editClientAtom }
  }, [])

  const [{ isLoading: isLoadingClients, data, refetch }] = useAtom(queries.clientsAtom)
  const [{ mutate: deleteClientMutation }] = useAtom(mutations.deleteClientAtom)

  const [{ mutate: createClientMutation, isPending: isLoadingCreateClient }] = useAtom(
    mutations.createClientAtom
  )
  const [{ mutate: editClientMutation, isPending: isLoadingUpdateClient }] = useAtom(
    mutations.editClientAtom
  )

  // Disable the buttons on ScreenMenu while loading the get request
  useEffect(() => {
    setIsLoadingAtom(isLoadingClients)
  }, [isLoadingClients])

  const form = useForm<Client>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver<any>(CreateClientResolver),
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
          data: data as UserUpdateInput
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
