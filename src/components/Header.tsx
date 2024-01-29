import { createStyleMap } from "../utils";
import { Colors } from "@blueprintjs/core";

interface HeaderProps {
  title: string;
}

export const Header = (props: HeaderProps) => {
  const styles = createStyleMap({
    container: {
      display: "flex",
      paddingBottom: "6px",
      borderBottom: `2px solid ${Colors.GRAY2}`,
    },
  });

  return (
    <div style={styles.container}>
      <h1>{props.title}</h1>
    </div>
  );
};
