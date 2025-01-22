"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface GeneralStateContextType {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
}

const GeneralStateContext = createContext<GeneralStateContextType | undefined>(
  undefined,
);

const GeneralStateProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [sortBy, setSortBy] = useState<string>("featured");

  return (
    <GeneralStateContext.Provider
      value={{
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </GeneralStateContext.Provider>
  );
};

export const useGeneralStateContext = () => {
  const context = useContext(GeneralStateContext);
  if (context === undefined) {
    throw new Error(
      "useGeneralStateContext must be used within a GeneralStateProvider",
    );
  }
  return context;
};

export default GeneralStateProvider;
