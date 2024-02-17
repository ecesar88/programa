import nodeColorLog from "node-color-log";

export enum LOG_LEVEL {
  ERROR,
  WARN,
  INFO,
}

export const logger = ({
  level,
  message,
  object,
}: {
  level: LOG_LEVEL;
  message: string;
  object?: string;
}) => {
  const errorLog = (message: string) =>
    nodeColorLog.color("white").bgColor("red").bold().log(message);

  const warnLog = (message: string) =>
    nodeColorLog.color("black").bgColor("yellow").bold().log(message);

  const infoLog = (message: string) =>
    nodeColorLog.color("white").bgColor("green").bold().log(message);

  const errorPrefix = " [ ERROR ] => ";
  const warnPrefix = " [ WARN ] => ";
  const infoPrefix = " [ INFO ] => ";

  switch (level) {
    case LOG_LEVEL.ERROR: {
      errorLog(`\n\n${errorPrefix} ${message}`);

      if (object) {
        nodeColorLog.log(`Error: \n${object}\n\n`);
      }

      break;
    }
    case LOG_LEVEL.WARN: {
      warnLog(`${warnPrefix} ${message}`);
      if (object) {
        nodeColorLog.log(`Object: \n${object}\n\n`);
      }

      break;
    }
    case LOG_LEVEL.INFO: {
      infoLog(`${infoPrefix} ${message}`);

      if (object) {
        nodeColorLog.log(`Object: \n${object}\n\n`);
      }

      break;
    }
  }
};
