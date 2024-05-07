import { Dialog, DialogBody, Spinner } from '@blueprintjs/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client } from '@prisma/client'
import { OverlayMode } from '@renderer/constants/enums'
import { useOnKeyDown } from '@renderer/hooks'
import {
  rowDataFocusedAtom,
  rowMetaDataFocusedAtom,
  selectedRowAtom
} from '@renderer/store/clientStore'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithMutation, atomWithQuery } from 'jotai-tanstack-query'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Id, toast } from 'react-toastify'
import { match } from 'ts-pattern'
import DeleteAlertModal from '../components/AlertModal'
import { CreateOrEditModal } from '../components/Clients/CreateOrEdit'
import { Read } from '../components/Clients/Read'
import DataHeader from '../components/DataHeader'
import { ScreenMenuProps } from '../components/ScreenMenu'
import { createClient, deleteClient, editClient, getClients } from '../queries/client'
import { CreateClientResolver } from '../resolvers/user'

type ClientWithoutId = Omit<Client, 'id'>

export const Clients = (): React.ReactNode => {
  const successToast = (message: string): Id => toast(message, { type: 'success' })

  const rowData = useAtomValue(rowDataFocusedAtom)
  const setRowData = useSetAtom(rowDataFocusedAtom)

  const setRowMetaData = useSetAtom(rowMetaDataFocusedAtom)

  const setSelectedRow = useSetAtom(selectedRowAtom)
  const clearSelectedRow = () => setSelectedRow({ data: {}, meta: { index: null } })

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [overlayMode, setOverlayMode] = useState<OverlayMode | null>(null)

  useEffect(() => {
    if (!isOverlayOpen) setOverlayMode(null)
  }, [isOverlayOpen])

  const openAlertModal = (): void => setIsDeleteModalOpen(true)
  const closeAlertModal = (): void => setIsDeleteModalOpen(false)

  useOnKeyDown('Escape', () => {
    clearSelectedRow()
  })

  const openModalOverlay = useCallback(
    (mode: OverlayMode) => {
      console.log({ mode })

      setIsOverlayOpen(true)
      return setOverlayMode(mode)
    },
    [overlayMode]
  )

  const closeModalOverlay = useCallback(() => {
    // setOverlayData({ isOpen: false, mode: null })
    setIsOverlayOpen(false)
    setOverlayMode(null)

    return false
  }, [overlayMode])

  const queries = useMemo(() => {
    const clientsAtom = atomWithQuery(() => ({
      queryKey: ['clients'],
      queryFn: getClients,
      meta: {
        errorMessage: 'Erro ao obter os clientes'
      }
    }))

    clientsAtom.debugLabel = 'getClients'
    return { clientsAtom }
  }, [])

  const [{ isLoading, data, refetch }] = useAtom(queries.clientsAtom)

  const mutations = useMemo(() => {
    const createClientAtom = atomWithMutation(() => ({
      mutationKey: ['createClient'],
      mutationFn: createClient,
      onSuccess: (): void => {
        refetch()

        successToast('Cliente criado com sucesso!')
        closeModalOverlay()
        clearSelectedRow()
        form.reset()
      },
      meta: {
        errorMessage: 'Erro ao criar o cliente'
      }
    }))

    const deleteClientAtom = atomWithMutation(() => ({
      mutationKey: ['deleteClient'],
      mutationFn: deleteClient,
      onSuccess: (): void => {
        refetch()

        successToast('Cliente deletado com sucesso!')
        clearSelectedRow()
      },
      meta: {
        errorMessage: 'Erro ao deletar o cliente'
      }
    }))

    const editClientAtom = atomWithMutation(() => ({
      mutationKey: ['editClient'],
      mutationFn: editClient,
      onSuccess: (): void => {
        refetch()

        successToast('Cliente editado com sucesso!')
        clearSelectedRow()
        closeModalOverlay()
        form.reset()
      },
      meta: {
        errorMessage: 'Erro ao editar o cliente'
      }
    }))

    createClientAtom.debugLabel = 'createClientAtom'
    deleteClientAtom.debugLabel = 'deleteClientAtom'
    editClientAtom.debugLabel = 'editClientAtom'

    return { createClientAtom, deleteClientAtom, editClientAtom }
  }, [])

  const [{ mutate: createClientMutation }] = useAtom(mutations.createClientAtom)
  const [{ mutate: deleteClientMutation }] = useAtom(mutations.deleteClientAtom)
  const [{ mutate: editClientMutation }] = useAtom(mutations.editClientAtom)

  const form = useForm<ClientWithoutId>({
    resolver: zodResolver(CreateClientResolver),
    defaultValues: {}
  })

  const handleDeleteActionButton = (): void => {
    deleteClientMutation((rowData as Client)?.id as number)

    clearSelectedRow()
    closeAlertModal()
  }

  const actions: ScreenMenuProps['actions'] = {
    onNewClick: () => {
      openModalOverlay(OverlayMode.NEW)
    },
    onEditClick: () => {
      openModalOverlay(OverlayMode.EDIT)
    },
    onSaveClick: () => {
      const onCreate: SubmitHandler<ClientWithoutId> = (data) => {
        createClientMutation(data)
      }

      const onEdit: SubmitHandler<ClientWithoutId> = (data) => {
        const { id } = rowData as Client

        editClientMutation({
          clientId: id,
          clientData: data
        })
      }

      form.handleSubmit(overlayMode === OverlayMode.NEW ? onCreate : onEdit)()
    },
    onDeleteClick: () => {
      openAlertModal()
    },
    onCancelClick: () => {
      form.reset()
      closeModalOverlay()
    }
  }

  return (
    <>
      <FormProvider {...form}>
        <div className="flex flex-col gap-2">
          <DataHeader
            title="CLIENTES"
            menuProps={{
              actions
            }}
          />

          {match(isLoading)
            .with(true, () => <Spinner size={110} intent="primary" />)
            .otherwise(() => (
              <div className="flex flex-col gap-5">
                <Read
                  clients={data?.data as Client[]}
                  onRowClick={(data, index) => {
                    setRowData(data)
                    setRowMetaData(index)
                  }}
                />
              </div>
            ))}
        </div>

        <Dialog
          isOpen={isOverlayOpen}
          onClose={closeModalOverlay}
          usePortal={true}
          canEscapeKeyClose={true}
          canOutsideClickClose={false}
          className="w-fit h-fit"
        >
          <DialogBody className="p-0">
            <CreateOrEditModal
              onSave={actions?.onSaveClick}
              onCancel={actions?.onCancelClick}
              overlayMode={overlayMode}
            />
          </DialogBody>
        </Dialog>

        <DeleteAlertModal
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
            Deletar o cliente <b>{(rowData as Client)?.name}</b> ?
          </p>
        </DeleteAlertModal>
      </FormProvider>
    </>
  )
}
