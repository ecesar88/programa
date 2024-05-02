import { Spinner, ToastProps } from '@blueprintjs/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client, Order } from '@prisma/client'
import { OverlayMode } from '@renderer/constants/enums'
import { OverlayData } from '@renderer/types'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import DeleteAlertModal from '../components/AlertModal'
import DataHeader from '../components/DataHeader'
import { Read } from '../components/Orders/Read'
import { ScreenMenuProps } from '../components/ScreenMenu'
import { AppToaster } from '../config/toast'
import { useSelectedRowContext } from '../context/SelectedRowContext'
import { createClient, deleteClient, editClient, getClients } from '../queries/client'
import { CreateClientResolver } from '../resolvers/user.resolver'

type ClientWithoutId = Omit<Client, 'id'>

export const Orders = (): React.ReactNode => {
  const { selectedRow, setSelectedRow } = useSelectedRowContext<Order>()

  const showToast = async (props: ToastProps): Promise<void> => {
    ;(await AppToaster).show(props)
  }

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [overlayData, setOverlayData] = useState<OverlayData>({ isOpen: false, mode: null })

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

  const { mutateAsync: createClientMutation, isSuccess: createdSuccessfully } = useMutation(
    'createClient',
    createClient,
    {
      onSuccess: () => {
        refetch()
        showToast({
          message: 'Cliente criado com sucesso!',
          intent: 'success'
        })
      },
      onError: () => {
        showToast({
          message: 'Erro ao criar o cliente',
          intent: 'danger'
        })
      }
    }
  )

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

  const { mutateAsync: editClientMutation, isSuccess: editedSuccessfully } = useMutation(
    'editClient',
    editClient,
    {
      onSuccess: () => {
        refetch()
        showToast({
          message: 'Cliente editado com sucesso!',
          intent: 'success'
        })
      },
      onError: () => {
        showToast({
          message: 'Erro ao editar o cliente',
          intent: 'danger'
        })
      }
    }
  )

  const form = useForm<ClientWithoutId>({
    resolver: zodResolver(CreateClientResolver)
  })

  // Reset SCREEN_MODE and form when changing screens
  useEffect(() => {
    return () => {
      form.reset()
    }
  }, [])

  const handleDeleteActionButton = async (): Promise<void> => {
    await deleteClientMutation((selectedRow as Client)?.id)
    setSelectedRow({})
    setIsDeleteModalOpen(false)
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

        if (createdSuccessfully) {
          form.reset()
          closeModalOverlay()
        }
      }

      const onEdit: SubmitHandler<ClientWithoutId> = async (data) => {
        const { id } = selectedRow as Client

        await editClientMutation({
          clientId: id,
          clientData: data
        })

        if (editedSuccessfully) {
          form.reset()
          closeModalOverlay()
        }
      }

      form.handleSubmit(overlayData.mode === OverlayMode.NEW ? onCreate : onEdit)()
    },
    onDeleteClick: () => {
      setIsDeleteModalOpen(true)
    },
    onCancelClick: () => {
      form.reset()
      setSelectedRow({})
      closeModalOverlay()
    }
  }
  return (
    <>
      <div>
        <DataHeader title="PEDIDOS" />

        <FormProvider {...form}>
          {isLoading ? <Spinner size={110} intent="primary" /> : <Read />}
        </FormProvider>
      </div>

      <DeleteAlertModal
        isOpen={isDeleteModalOpen}
        confirmButtonText="Deletar"
        cancelButtonText="Cancelar"
        icon="trash"
        intent="danger"
        actions={{
          onCancel: () => {
            setSelectedRow({})
            setIsDeleteModalOpen(false)
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
    </>
  )
}
