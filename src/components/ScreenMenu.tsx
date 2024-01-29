import { Button } from "@blueprintjs/core";
import { createStyleMap } from "../utils";
import { SCREEN_MODE } from "../constants";
import { useState } from "react";

export const ScreenMenu = () => {
  const [screenMode, setScreenMode] = useState<SCREEN_MODE>(SCREEN_MODE.VIEW);

  const itemToDelete = null;
  const itemToEdit = null;

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
        disabled={
          screenMode === SCREEN_MODE.EDIT || screenMode === SCREEN_MODE.NEW
        }
        onClick={() => {
          setScreenMode(SCREEN_MODE.NEW);
        }}
      >
        Novo
      </Button>

      <Button
        icon="edit"
        fill
        intent="primary"
        disabled={
          screenMode === SCREEN_MODE.EDIT ||
          screenMode === SCREEN_MODE.NEW ||
          !itemToEdit
        }
        onClick={() => {
          setScreenMode(SCREEN_MODE.EDIT);
        }}
      >
        Editar
      </Button>

      <Button
        icon="floppy-disk"
        fill
        intent="warning"
        disabled={screenMode === SCREEN_MODE.VIEW}
        onClick={() => {
          setScreenMode(SCREEN_MODE.VIEW);
        }}
      >
        Salvar
      </Button>

      <Button
        fill
        icon="trash"
        intent="danger"
        disabled={screenMode !== SCREEN_MODE.VIEW || !itemToDelete}
        onClick={() => {
          alert("abc");
        }}
      >
        Excluir
      </Button>
    </div>
  );
};
