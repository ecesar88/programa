// import ipc from "node-ipc";

import { IPC } from "node-ipc";

// ipc.config.maxRetries = 10;
// ipc.config.logInColor = true;

// ipc.connectTo("world", undefined, () => {
//   ipc.log("Connected to world");

//   ipc.of.world.emit("data", { teste: 123 });
// });

class IPCModule extends IPC {
  constructor() {
    super();
    this.config.maxRetries = 10
    this.config.logInColor = true
  }

  IPC = IPC;
}

const singleton = new IPCModule();

export { singleton as default, IPCModule };
