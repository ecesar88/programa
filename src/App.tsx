import { Button, Spinner } from "@blueprintjs/core";
import { CSSProperties, useState } from "react";
import axios from "axios";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
};

function App() {
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

  return (
    <div style={styles.container as CSSProperties}>
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
          console.log(response?.data)
        }}
      >
        Criar cliente
      </Button>
    </div>
  );
}

export default App;
