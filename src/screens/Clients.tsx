import axios from "axios";
import { CSSProperties, useState } from "react";
import { useQuery } from "react-query";
import { Read } from "../components/Clients/Read";
import { Header } from "../components/Header";
import { ScreenMenu } from "../components/ScreenMenu";

export const Clients = () => {
  const [clients, setClients] = useState([]);

  const getClients = async () => {
    try {
      const clients = await axios.get("http://localhost:3001/clients");

      return clients;
    } catch (error) {
      console.error(error);
    }
  };

  useQuery("clients", getClients, {
    onSuccess: (data) => {},
    onError: (err) => {},
  });

  const styles: Record<string, CSSProperties> = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
  };

  return (
    <div style={styles.container}>
      <Header title="CLIENTES" />
      <ScreenMenu />

      <Read clients={clients} />
    </div>
  );
};
