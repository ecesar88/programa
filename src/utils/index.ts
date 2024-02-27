import { CSSProperties } from "react";
import { logger, LOG_LEVEL } from "./logger";
import { parseEnv } from "./parseEnv";

export function createStyleMap<T extends { [name: string]: CSSProperties }>(
  cfg: T
) {
  return cfg;
}

export { logger, LOG_LEVEL, parseEnv };
