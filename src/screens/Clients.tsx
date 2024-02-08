import { Spinner } from "@blueprintjs/core";
import { Client } from "@prisma/client";
import { useContext } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Create } from "../components/Clients/Create";
import { Read } from "../components/Clients/Read";
import DataHeader from "../components/DataHeader";
import { ScreenMenuProps } from "../components/ScreenMenu";
import { SCREEN_MODE } from "../constants";
import { ScreenLocalContext } from "../context/ScreenLocalContext";
import { getClients } from "../queries/client";
import { createStyleMap } from "../utils";

export const Clients = () => {
  const {
    screenMode: { screenMode, setScreenMode },
  } = useContext(ScreenLocalContext);

  const { isLoading, data } = useQuery("clients", getClients, {
    onError: (err) => {},
  });

  const styles = createStyleMap({
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
  });

  const onSave: SubmitHandler<Client> = (data) => {
    console.log("data >> ", data);
  };

  const methods = useForm<Client>();

  const actions: ScreenMenuProps["actions"] = {
    onNewClick: () => {
      console.log(screenMode);
    },
    onEditClick: () => {
      console.log(screenMode);
    },
    onSaveClick: () => {
      methods.handleSubmit(onSave)();
      methods.reset();
    },
  };

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
        <FormProvider {...methods}>
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
