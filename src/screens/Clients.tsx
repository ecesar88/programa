import { Spinner, ToastProps } from "@blueprintjs/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { Client } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Create } from "../components/Clients/Create";
import { Read } from "../components/Clients/Read";
import DataHeader from "../components/DataHeader";
import { ScreenMenuProps } from "../components/ScreenMenu";
import { SCREEN_MODE } from "../constants";
import { ScreenLocalContext } from "../context/ScreenLocalContext";
import { createClient, deleteClient, getClients } from "../queries/client";
import { CreateClientResolver } from "../resolvers/user.resolver";
import { createStyleMap } from "../utils";
import { AppToaster } from "../config/toast";
import DeleteAlertModal from "../components/AlertModal";

type ClientWithoutId = Omit<Client, "id">;

export const Clients = () => {
  const {
    screenMode: { screenMode, setScreenMode },
    selectedRow: { selectedRow, setSelectedRow },
  } = useContext(ScreenLocalContext);

  const showToast = async (props: ToastProps) => {
    (await AppToaster).show(props);
  };

  // TODO - refactor opening logic, encapsulate the logic on the component itself
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { isLoading, data, refetch } = useQuery("clients", getClients, {
    onError: () => {
      showToast({
        message: "Erro ao obter os clientes",
        intent: "danger",
      });
    },
  });

  const { mutateAsync: createClientMutation } = useMutation(
    "createClient",
    createClient,
    {
      onSuccess: () => {
        refetch();
        showToast({
          message: "Cliente criado com sucesso!",
          intent: "success",
        });
      },
      onError: () => {
        showToast({
          message: "Erro ao criar o cliente",
          intent: "danger",
        });
      },
    }
  );

  // FIXME - fix selectedRow still being kept after deleting
  const { mutateAsync: deleteClientMutation } = useMutation(
    "deleteClient",
    deleteClient,
    {
      onSuccess: () => {
        refetch();
        showToast({
          message: "Cliente deletado!",
          intent: "success",
        });
      },
      onError: () => {
        showToast({
          message: "Erro ao deletar o cliente",
          intent: "danger",
        });
      },
    }
  );

  const createForm = useForm<ClientWithoutId>({
    resolver: zodResolver(CreateClientResolver),
  });

  useEffect(() => {
    return () => {
      setScreenMode(SCREEN_MODE.VIEW);
      createForm.reset();
    };
  }, []);

  // const editForm = useForm<Client>({
  // resolver: zodResolver(CreateUserResolver),
  // });

  const handleDeleteActionButton = async () => {
    // setSelectedRow(undefined as any);
    // FIXME - fix typing
    await deleteClientMutation(selectedRow?.id);
    setIsDeleteModalOpen(false);
  };

  const actions: ScreenMenuProps["actions"] = {
    onNewClick: (changeScreen) => {
      console.log(screenMode);
      changeScreen();
    },
    onEditClick: (changeScreen) => {
      changeScreen();
      console.log(screenMode);
    },
    onSaveClick: (changeScreen) => {
      const onSave: SubmitHandler<ClientWithoutId> = async (data) => {
        await createClientMutation(data);
        createForm.reset();

        changeScreen();
      };

      createForm.handleSubmit(onSave)();
    },
    onDeleteClick: () => {
      setIsDeleteModalOpen(true);
    },
    onCancelClick: (changeScreen) => {
      createForm.reset();
      changeScreen();
    },
  };

  const styles = createStyleMap({
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
  });

  return (
    <>
      <div style={styles.container}>
        <DataHeader
          title="CLIENTES"
          actions={actions}
          screenMode={{ screenMode, setScreenMode }}
        />

        {isLoading ? (
          <Spinner size={110} intent="primary" />
        ) : screenMode === SCREEN_MODE.VIEW ? (
          <Read
            clients={data?.data as Client[]}
            onRowSelect={(data) => {
              setSelectedRow(data as any);
            }}
          />
        ) : (
          <FormProvider {...createForm}>
            {screenMode === SCREEN_MODE.NEW ? (
              <Create />
            ) : screenMode === SCREEN_MODE.EDIT ? (
              <>edit</>
            ) : null}
          </FormProvider>
        )}
      </div>

      <DeleteAlertModal
        isOpen={isDeleteModalOpen}
        confirmButtonText="Deletar"
        cancelButtonText="Cancelar"
        icon="trash"
        intent="danger"
        actions={{
          onCancel: () => {
            setIsDeleteModalOpen(false);
          },
          onConfirm: () => {
            handleDeleteActionButton();
          },
        }}
      >
        <p>
          Deletar o cliente <b>{selectedRow?.name as any}</b> ?
        </p>
      </DeleteAlertModal>
    </>
  );
};
