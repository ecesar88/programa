import { Dialog, DialogBody, Spinner, ToastProps } from '@blueprintjs/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client } from '@prisma/client'
import { OverlayMode } from '@renderer/constants/enums'
import { OverlayData } from '@renderer/types'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import DeleteAlertModal from '../components/AlertModal'
import { CreateOrEditModal } from '../components/Clients/CreateOrEdit'
import { Read } from '../components/Clients/Read'
import DataHeader from '../components/DataHeader'
import { ScreenMenuProps } from '../components/ScreenMenu'
import { AppToaster } from '../config/toast'
import { useSelectedRowContext } from '../context/SelectedRowContext'
import { createClient, deleteClient, editClient, getClients } from '../queries/client'
import { CreateClientResolver } from '../resolvers/user.resolver'

type ClientWithoutId = Omit<Client, 'id'>

export const Clients = (): JSX.Element => {
  const { selectedRow, setSelectedRow } = useSelectedRowContext<Client>()

  const showToast = async (props: ToastProps): Promise<void> => {
    ;(await AppToaster).show(props)
  }

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [overlayData, setOverlayData] = useState<OverlayData>({ isOpen: false, mode: null })

  const openAlertModal = (): void => setIsDeleteModalOpen(true)
  const closeAlertModal = (): void => setIsDeleteModalOpen(false)

  const resetSelectedRow = (): void => setSelectedRow({})

  const openModalOverlay = useCallback(
    (mode: OverlayMode) => setOverlayData({ isOpen: true, mode }),
    [setOverlayData]
  )

  const closeModalOverlay = useCallback(() => {
    setOverlayData({ isOpen: false, mode: null })
    return false
  }, [setOverlayData])

  const { isLoading, data, refetch } = useQuery('clients', getClients, {
    onError: () => {
      showToast({
        message: 'Erro ao obter os clientes',
        intent: 'danger'
      })
    }
  })

  const { mutateAsync: createClientMutation } = useMutation('createClient', createClient, {
    onSuccess: () => {
      refetch()
      showToast({
        message: 'Cliente criado com sucesso!',
        intent: 'success'
      })

      form.reset()
      closeModalOverlay()
    },
    onError: () => {
      showToast({
        message: 'Erro ao criar o cliente',
        intent: 'danger'
      })
    }
  })

  const { mutateAsync: deleteClientMutation } = useMutation('deleteClient', deleteClient, {
    onSuccess: () => {
      refetch()
      showToast({
        message: 'Cliente deletado!',
        intent: 'success'
      })
    },
    onError: () => {
      showToast({
        message: 'Erro ao deletar o cliente',
        intent: 'danger'
      })
    }
  })

  const { mutateAsync: editClientMutation } = useMutation('editClient', editClient, {
    onSuccess: () => {
      refetch()
      showToast({
        message: 'Cliente editado com sucesso!',
        intent: 'success'
      })

      form.reset()
      closeModalOverlay()
    },
    onError: () => {
      showToast({
        message: 'Erro ao editar o cliente',
        intent: 'danger'
      })
    }
  })

  const form = useForm<ClientWithoutId>({
    resolver: zodResolver(CreateClientResolver)
  })

  // Reset form when changing screens
  useEffect(() => {
    return () => {
      form.reset()
    }
  }, [])

  const handleDeleteActionButton = async (): Promise<void> => {
    await deleteClientMutation(selectedRow.data?.id as number)

    resetSelectedRow()
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
      const onCreate: SubmitHandler<ClientWithoutId> = async (data) => {
        await createClientMutation(data)
      }

      const onEdit: SubmitHandler<ClientWithoutId> = async (data) => {
        const { id } = selectedRow as Client

        await editClientMutation({
          clientId: id,
          clientData: data
        })
      }

      form.handleSubmit(overlayData.mode === OverlayMode.NEW ? onCreate : onEdit)()
    },
    onDeleteClick: () => {
      openAlertModal()
    },
    onCancelClick: () => {
      form.reset()
      resetSelectedRow()
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

          {isLoading ? (
            <Spinner size={110} intent="primary" />
          ) : (
            <Read
              clients={data?.data as Client[]}
              onRowClick={(data, index) => {
                setSelectedRow({
                  meta: { index },
                  data
                })
              }}
            />
          )}
        </div>

        <Dialog
          isOpen={overlayData.isOpen}
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
              overlayMode={overlayData.mode}
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
              resetSelectedRow()
              closeAlertModal()
            },
            onConfirm: () => {
              handleDeleteActionButton()
            }
          }}
        >
          <p>
            Deletar o cliente <b>{(selectedRow as Client)?.name}</b> ?
          </p>
        </DeleteAlertModal>
      </FormProvider>
    </>
  )
}
