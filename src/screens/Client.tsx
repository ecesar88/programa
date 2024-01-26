import { Button, Spinner } from "@blueprintjs/core";
import axios from "axios";
import { CSSProperties, useState } from "react";

export const Client = () => {
  const [nome, setNome] = useState("");
  const [phone, setPhone] = useState("");

  const createClient = async (name: string, phone: string) => {
    try {
      const client = await axios.post("http://localhost:3001/clients", {
        name: name,
        phone: phone,
      });

      return client;
    } catch (error) {
      console.error(error);
    }
  };

  const styles: Record<string, CSSProperties> = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Tauri!</h1>

      <Spinner intent="primary" />

      <input
        type="text"
        className="bp5-input"
        placeholder="Nome"
        onChange={(evt) => {
          setNome(evt.target.value);
        }}
      />

      <input
        type="text"
        className="bp5-input"
        placeholder="Phone"
        onChange={(evt) => {
          setPhone(evt.target.value);
        }}
      />

      <Button
        intent="success"
        onClick={async () => {
          const response = await createClient(nome, phone);
          console.log(response?.data);
        }}
      >
        Criar cliente
      </Button>
    </div>
  );
};
