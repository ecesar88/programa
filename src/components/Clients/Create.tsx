import { FormGroup } from "@blueprintjs/core";
import { useFormContext } from "react-hook-form";
import { createStyleMap } from "../../utils";
import { Input } from "../Input";

export const Create = () => {
  const styles = createStyleMap({
    container: {
      display: "flex",
      gap: "0.5rem",
    },
  });

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <form id="create-form" style={styles.container}>
      <FormGroup
        style={{ width: "250px" }}
        label="Nome:"
        labelInfo="(obrigatório)"
      >
        <Input placeholder="Nome" fill {...register("name")} />
      </FormGroup>

      <FormGroup style={{ width: "250px" }} label="Telefone:">
        <Input placeholder="Telefone" fill {...register("phone")} />
      </FormGroup>
    </form>
  );
};
