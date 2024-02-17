import { Button, Icon } from "@blueprintjs/core";
import { SCREEN_MODE } from "../constants";
import { createStyleMap } from "../utils";
import { useContext, useEffect } from "react";
import { ScreenLocalContext } from "../context/ScreenLocalContext";

export interface ScreenMenuProps {
  screenMode: {
    screenMode: SCREEN_MODE;
    setScreenMode: React.Dispatch<React.SetStateAction<SCREEN_MODE>>;
  };
  actions?: {
    onNewClick?: (changeScreen: () => void) => void;
    onEditClick?: (changeScreen: () => void) => void;
    onSaveClick?: (changeScreen: () => void) => void;
    onDeleteClick?: () => void;
    onCancelClick?: (changeScreen: () => void) => void;
  };
}

export const ScreenMenu = (props: ScreenMenuProps) => {
  const {
    screenMode: { screenMode, setScreenMode },
  } = props;

  const {
    selectedRow: { selectedRow, setSelectedRow },
  } = useContext(ScreenLocalContext);

  const selectedItem =
    selectedRow !== undefined && Object.values(selectedRow)?.length;

  // Reset selected row item when changing screen
  useEffect(() => {
    setSelectedRow(undefined as any);
  }, [screenMode]);

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
          const changeScreen = () => {
            setScreenMode(SCREEN_MODE.NEW);
          };

          props?.actions?.onNewClick?.(changeScreen);
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
          !selectedItem
        }
        onClick={(e) => {
          e.preventDefault();

          const changeScreen = () => {
            setScreenMode(SCREEN_MODE.EDIT);
          };

          props?.actions?.onEditClick?.(changeScreen);
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
        onClick={(e) => {
          e.preventDefault();

          const changeScreen = () => {
            setScreenMode(SCREEN_MODE.VIEW);
          };

          props?.actions?.onSaveClick?.(changeScreen);
        }}
      >
        Salvar
      </Button>

      <Button
        fill
        icon="trash"
        intent="danger"
        disabled={screenMode !== SCREEN_MODE.VIEW || !selectedItem}
        onClick={() => {
          props?.actions?.onDeleteClick?.();
        }}
      >
        Excluir
      </Button>

      <Button
        fill
        intent="none"
        icon="disable"
        disabled={screenMode === SCREEN_MODE.VIEW}
        onClick={() => {
          // TODO: Change icon and text color to intent="DANGER"
          const changeScreen = () => {
            setScreenMode(SCREEN_MODE.VIEW);
          };

          props?.actions?.onCancelClick?.(changeScreen);
        }}
      >
        Cancelar
      </Button>
    </div>
  );
};
