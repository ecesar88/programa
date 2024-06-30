import { LOG_TYPE, logger } from "./logger";

export const parseEnv = <T extends string | number>(
  name: string,
  env?: string
): T => {
  if (!env) {
    logger({
      level: LOG_TYPE.ERROR,
      message: `env ${name} is not defined or does not exist`,
    });

    process.exit(1);
  }

  return env as T;
};
