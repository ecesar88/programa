import { Colors } from "@blueprintjs/core";
import { createStyleMap } from "../utils";

interface InputErrorProps {
  errorMessage?: string;
}

const InputError = (props: InputErrorProps) => {
  const styles = createStyleMap({
    errorMessage: {
      fontSize: "0.7rem",
      color: Colors.RED3,
      fontWeight: "bold",
      paddingTop: "4px"
    },
  });

  if (props?.errorMessage?.length) {
    return <div style={styles.errorMessage}>{props.errorMessage}</div>;
  }

  return null;
};

export default InputError;
