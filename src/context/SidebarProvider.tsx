"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface SidebarContextType {
  activeSortedNavGroup: string[];
  setActiveSortedNavGroup: Dispatch<SetStateAction<string[]>>;
  isNavbarDrawerOpen: boolean;
  setIsNavbarDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const SidebarProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [activeSortedNavGroup, setActiveSortedNavGroup] = useState<string[]>(
    [],
  );
  const [isNavbarDrawerOpen, setIsNavbarDrawerOpen] = useState<boolean>(false);

  return (
    <SidebarContext.Provider
      value={{
        activeSortedNavGroup,
        setActiveSortedNavGroup,
        isNavbarDrawerOpen,
        setIsNavbarDrawerOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error(
      "useSidebarNavGroup must be used within a SidebarNavGroupProvider",
    );
  }
  return context;
};

export default SidebarProvider;
