"use client";

import GeneralStateProvider from "@/context/GeneralStateProvider";
import SidebarProvider from "@/context/SidebarProvider";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <GeneralStateProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </GeneralStateProvider>
  );
};

export default Providers;
