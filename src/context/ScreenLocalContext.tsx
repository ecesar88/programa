import { useState, createContext } from "react";
import { SCREEN_MODE } from "../constants";

interface ScreenLocalContextType<T extends Record<never, never> = {}> {
  screenMode: {
    screenMode: SCREEN_MODE;
    setScreenMode: React.Dispatch<React.SetStateAction<SCREEN_MODE>>;
  };
  selectedRow: {
    selectedRow: T;
    setSelectedRow: React.Dispatch<React.SetStateAction<T>>;
  };
}

const ScreenLocalContext = createContext<ScreenLocalContextType>(null as any);

const ScreenLocalContextProvider = <T extends Record<never, never>>({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [screenMode, setScreenMode] = useState(SCREEN_MODE.VIEW);
  const [selectedRow, setSelectedRow] = useState<T>({} as T);

  return (
    <ScreenLocalContext.Provider
      value={{
        screenMode: {
          screenMode,
          setScreenMode,
        },
        selectedRow: {
          selectedRow,
          setSelectedRow: setSelectedRow as React.Dispatch<
            React.SetStateAction<{}>
          >,
        },
      }}
    >
      {children}
    </ScreenLocalContext.Provider>
  );
};

export { ScreenLocalContextProvider, ScreenLocalContext };
