import { useState, createContext } from "react";
import { SCREEN_MODE } from "../constants";

interface ScreenLocalContextType<T extends {} = {}> {
  screenMode: {
    screenMode: SCREEN_MODE;
    setScreenMode: React.Dispatch<React.SetStateAction<SCREEN_MODE>>;
  };
  formData: {
    formData: {};
    setFormData: React.Dispatch<React.SetStateAction<{}>>;
  };
}

const ScreenLocalContext = createContext<ScreenLocalContextType>(null as any);

function ScreenLocalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [screenMode, setScreenMode] = useState(SCREEN_MODE.VIEW);
  const [formData, setFormData] = useState({});

  return (
    <ScreenLocalContext.Provider
      value={{
        screenMode: {
          screenMode,
          setScreenMode,
        },
        formData: {
          formData,
          setFormData,
        },
      }}
    >
      {children}
    </ScreenLocalContext.Provider>
  );
}

export { ScreenLocalContextProvider, ScreenLocalContext };
