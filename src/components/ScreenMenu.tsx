import { Button } from "@blueprintjs/core";
import { SCREEN_MODE } from "../constants";
import { createStyleMap } from "../utils";

export interface ScreenMenuProps {
  screenMode: {
    screenMode: SCREEN_MODE;
    setScreenMode: React.Dispatch<React.SetStateAction<SCREEN_MODE>>;
  };
  actions?: {
    onNewClick?: () => void;
    onEditClick?: () => void;
    onSaveClick?: () => void;
  };
}

export const ScreenMenu = (props: ScreenMenuProps) => {
  const {
    screenMode: { screenMode, setScreenMode },
  } = props;

  const itemToDelete = null;
  const itemToEdit = null;

  const styles = createStyleMap({
    container: {
      backgroundColor: "#fff",
      border: "1px solid #D3D8DE",
      borderRadius: "4px",
      padding: "4px",
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
          setScreenMode(() => {
            props?.actions?.onNewClick?.();
            return SCREEN_MODE.NEW;
          });
        }}
      >
        Novo
      </Button>

      <Button
        icon="edit"
        fill
        intent="primary"
        form="edit-form"
        type="submit"
        disabled={
          screenMode === SCREEN_MODE.EDIT ||
          screenMode === SCREEN_MODE.NEW ||
          !itemToEdit
        }
        onClick={() => {
          setScreenMode(() => {
            props?.actions?.onEditClick?.();
            return SCREEN_MODE.EDIT;
          });
        }}
      >
        Editar
      </Button>

      <Button
        icon="floppy-disk"
        fill
        intent="warning"
        form="create-form"
        type="submit"
        disabled={screenMode === SCREEN_MODE.VIEW}
        onClick={() => {
          setScreenMode(() => {
            props?.actions?.onSaveClick?.();
            return SCREEN_MODE.VIEW;
          });
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
