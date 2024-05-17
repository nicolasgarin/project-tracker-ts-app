import React, { createContext, useContext, useEffect, useState } from "react";
import { Util, UtilContextType } from "../@types/util";
const UtilsContext = createContext<UtilContextType | undefined>(undefined);

export const UtilsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cardHeight, setCardHeight] = useState<Util["num"]>(20);
  const [cardHeights, setCardHeights] = useState<Util["numArray"]>([20]);

  useEffect(() => {
    calculateMaxHeight();
  }, [cardHeights]);

  function calculateMaxHeight() {
    setCardHeight(Math.max(...cardHeights));
  }

  return (
    <UtilsContext.Provider
      value={{
        cardHeight,
        updateCardHeights: (num: number) => setCardHeights([...cardHeights, num]),
      }}
    >
      {children}
    </UtilsContext.Provider>
  );
};

export default function useUtils() {
  const context = useContext(UtilsContext);
  if (!context)
    throw Error("UtilsContext can only be used inside an UtilsProvider");
  return context;
}
