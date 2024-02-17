import { OverlayToaster, Position } from "@blueprintjs/core";

/** Singleton toaster instance. Create separate instances for different options. */
export const AppToaster = OverlayToaster.createAsync({
  className: "recipe-toaster",
  position: Position.TOP,
  maxToasts: 10,
});
