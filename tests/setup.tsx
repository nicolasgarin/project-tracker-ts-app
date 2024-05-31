import React from "react";
import "@testing-library/jest-dom/vitest";
import { DataProvider } from "../src/context/DataContext";
import { DatesProvider } from "../src/context/DatesContext";
import { UserOptionsProvider } from "../src/context/UserOptionsContext";

export const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserOptionsProvider>
      <DatesProvider>
        <DataProvider>{children}</DataProvider>
      </DatesProvider>
    </UserOptionsProvider>
  );
};
