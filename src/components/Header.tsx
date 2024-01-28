import { createStyleMap } from "../utils";

interface HeaderProps {
  title: string;
}

export const Header = (props: HeaderProps) => {
  const styles = createStyleMap({
    container: {
      display: "flex",
      paddingBottom: "6px",
      borderBottom: "2px solid #738091",
    },
  });

  return (
    <div style={styles.container}>
      <h1>{props.title}</h1>
    </div>
  );
};
