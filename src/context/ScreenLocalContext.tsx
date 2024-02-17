import { useState, createContext } from "react";
import { SCREEN_MODE } from "../constants";

// TODO - fix types
interface ScreenLocalContextType<T extends {} = {}> {
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

function ScreenLocalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [screenMode, setScreenMode] = useState(SCREEN_MODE.VIEW);
  const [selectedRow, setSelectedRow] = useState<any>({});

  return (
    <ScreenLocalContext.Provider
      value={{
        screenMode: {
          screenMode,
          setScreenMode,
        },
        selectedRow: {
          selectedRow,
          setSelectedRow,
        },
      }}
    >
      {children}
    </ScreenLocalContext.Provider>
  );
}

export { ScreenLocalContextProvider, ScreenLocalContext };
