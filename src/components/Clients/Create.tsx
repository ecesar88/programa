import { FormGroup } from "@blueprintjs/core";
import { useFormContext } from "react-hook-form";
import { createStyleMap } from "../../utils";
import { Input } from "../Input";
import InputError from "../InputError";

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

  console.log("Erros: ", errors);
  // TODO - BOTÃO CANCELAR

  return (
    <form id="create-form" style={styles.container}>
      <FormGroup
        style={{ width: "250px" }}
        label="Nome:"
        labelInfo="(obrigatório)"
      >
        <Input
          placeholder="Nome"
          fill
          {...register("name")}
          intent={errors?.["name"]?.message?.toString() ? "danger" : "none"}
        />
        <InputError errorMessage={errors?.["name"]?.message?.toString()} />
      </FormGroup>

      <FormGroup style={{ width: "250px" }} label="Telefone:">
        <Input
          placeholder="Telefone"
          fill
          {...register("phone")}
          intent={errors?.["phone"]?.message?.toString() ? "danger" : "none"}
        />
        <InputError errorMessage={errors?.["phone"]?.message?.toString()} />
      </FormGroup>
    </form>
  );
};
