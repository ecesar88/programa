import { InputGroup, InputGroupProps } from "@blueprintjs/core";
import * as React from "react";

export const Input = React.forwardRef<HTMLInputElement, InputGroupProps>(
  (props, ref) => {
    return <InputGroup fill inputRef={ref} {...props} />;
  }
);
