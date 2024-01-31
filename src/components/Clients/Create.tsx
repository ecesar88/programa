import { InputGroup } from "@blueprintjs/core";
import { createStyleMap } from "../../utils";

export const Create = () => {
  const styles = createStyleMap({
    container: {
      display: "flex",
      gap: "0.5rem",
    },
  });

  return (
    <div style={styles.container}>
      <InputGroup large placeholder="teste" />
    </div>
  );
};
