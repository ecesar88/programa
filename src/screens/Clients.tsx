import { Spinner } from "@blueprintjs/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { Client } from "@prisma/client";
import { useContext, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Create } from "../components/Clients/Create";
import { Read } from "../components/Clients/Read";
import DataHeader from "../components/DataHeader";
import { ScreenMenuProps } from "../components/ScreenMenu";
import { SCREEN_MODE } from "../constants";
import { ScreenLocalContext } from "../context/ScreenLocalContext";
import { createClient, getClients } from "../queries/client";
import { CreateUserResolver } from "../resolvers/user.resolver";
import { createStyleMap } from "../utils";

type ClientWithoutId = Omit<Client, "id">;

export const Clients = () => {
  const {
    screenMode: { screenMode, setScreenMode },
  } = useContext(ScreenLocalContext);

  const { isLoading, data } = useQuery("clients", getClients, {
    onError: (err) => {},
  });

  // FIXME - tabela não recarrega ao criar novo cliente
  const { mutateAsync } = useMutation("createClient", createClient, {
    // onMutate: (data) => {},
    onError: (err) => {
      alert(JSON.stringify(err));
    },
  });

  const createMethods = useForm<ClientWithoutId>({
    resolver: zodResolver(CreateUserResolver),
  });

  useEffect(() => {
    return () => {
      setScreenMode(SCREEN_MODE.VIEW);
      createMethods.reset();
    };
  }, []);

  // const editMethods = useForm<Client>({
  // resolver: zodResolver(CreateUserResolver),
  // });

  const onSave: SubmitHandler<ClientWithoutId> = async (data) => {
    console.log(data);
    await mutateAsync(data);
    createMethods.reset();
  };

  const actions: ScreenMenuProps["actions"] = {
    onNewClick: () => {
      console.log(screenMode);
    },
    onEditClick: () => {
      console.log(screenMode);
    },
    onSaveClick: () => createMethods.handleSubmit(onSave)(),
  };

  const styles = createStyleMap({
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
  });

  return (
    <div style={styles.container}>
      <DataHeader
        title="CLIENTES"
        actions={actions}
        screenMode={{ screenMode, setScreenMode }}
      />

      {isLoading ? (
        <Spinner size={110} intent="primary" />
      ) : screenMode === SCREEN_MODE.VIEW ? (
        <Read clients={data?.data as Client[]} />
      ) : (
        <FormProvider {...createMethods}>
          {screenMode === SCREEN_MODE.NEW ? (
            <Create />
          ) : screenMode === SCREEN_MODE.EDIT ? (
            <>edit</>
          ) : null}
        </FormProvider>
      )}
    </div>
  );
};
