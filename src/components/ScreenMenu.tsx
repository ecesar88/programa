import { Button } from "@blueprintjs/core";
import { createStyleMap } from "../utils";

export const ScreenMenu = () => {
  const styles = createStyleMap({
    container: {
      backgroundColor: "#fff",
      border: "1px solid #D3D8DE",
      borderRadius: "4px",
      padding: "2px",
      display: "flex",
      justifyContent: "space-between",
      gap: "1rem",
    },
  });

  return (
    <div style={styles.container}>
      <Button
        icon="plus"
        fill
        intent="success"
        onClick={() => {
          console.log("abc");
        }}
      >
        Novo
      </Button>

      <Button
        icon="edit"
        fill
        intent="primary"
        onClick={() => {
          alert("abc");
        }}
      >
        Editar
      </Button>

      <Button
        icon="floppy-disk"
        fill
        intent="warning"
        onClick={() => {
          alert("abc");
        }}
      >
        Salvar
      </Button>

      <Button
        fill
        icon="trash"
        intent="danger"
        onClick={() => {
          alert("abc");
        }}
      >
        Excluir
      </Button>
    </div>
  );
};
