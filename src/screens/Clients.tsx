import { Spinner } from "@blueprintjs/core";
import { Client } from "@prisma/client";
import axios from "axios";
import { CSSProperties, useState } from "react";
import { useQuery } from "react-query";
import { Read } from "../components/Clients/Read";
import { Header } from "../components/Header";
import { ScreenMenu, ScreenMenuProps } from "../components/ScreenMenu";
import { SCREEN_MODE } from "../constants";
import { Create } from "../components/Clients/Create";

export const Clients = () => {
  const [screenMode, setScreenMode] = useState<SCREEN_MODE>(SCREEN_MODE.VIEW);

  const getClients = async () => {
    try {
      const clients = await axios.get<Client[]>(
        "http://localhost:3001/clients"
      );

      return clients;
    } catch (error) {
      console.error(error);
    }
  };

  const { isLoading, data } = useQuery("clients", getClients, {
    onError: (err) => {},
  });

  const styles: Record<string, CSSProperties> = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
  };

  const actions: ScreenMenuProps["actions"] = {
    onNewClick: () => {
      setScreenMode(SCREEN_MODE.NEW);
    },
    onEditClick: () => {
      setScreenMode(SCREEN_MODE.EDIT);
    },
    onSaveClick: () => {
      setScreenMode(SCREEN_MODE.VIEW);
    },
  };

  return (
    <div style={styles.container}>
      <Header title="CLIENTES" />
      <ScreenMenu actions={actions} />

      {(() => {
        if (isLoading) {
          return <Spinner size={110} intent="primary" />;
        }

        if (screenMode === SCREEN_MODE.NEW) {
          return <Create />;
        }

        if (screenMode === SCREEN_MODE.VIEW) {
          return <Read clients={data?.data as Client[]} />;
        }
      })()}
    </div>
  );
};
