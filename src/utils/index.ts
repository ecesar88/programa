import { CSSProperties } from "react";

export function createStyleMap<T extends { [name: string]: CSSProperties }>(
  cfg: T
) {
  return cfg;
}
