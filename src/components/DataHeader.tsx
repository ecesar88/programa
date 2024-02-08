import { createStyleMap } from "../utils";
import { Header } from "./Header";
import { ScreenMenu, ScreenMenuProps } from "./ScreenMenu";

interface DataHeaderProps {
  title: string;
  actions: ScreenMenuProps["actions"];
  screenMode: ScreenMenuProps["screenMode"];
}

const DataHeader = (props: DataHeaderProps) => {
  const styles = createStyleMap({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: "0.5rem",
      paddingBottom: "1rem",
    },
  });

  return (
    <div style={styles.container}>
      <Header title={props.title} />
      <ScreenMenu actions={props.actions} screenMode={props.screenMode} />
    </div>
  );
};

export default DataHeader;
