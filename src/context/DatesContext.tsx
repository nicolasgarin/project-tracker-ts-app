import React, { createContext, useContext, useEffect, useState } from "react";
import { Date, DateContextType } from "../@types/date";

const DatesContext = createContext<DateContextType | undefined>(
  undefined
);

export const DatesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [actualDate, setActualDate] = useState<Date["dateObj"]>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date["dateObj"]>(new Date());

  return (
    <DatesContext.Provider
      value={{
        actualDate,
        setActualDate,
        selectedDate,
        setSelectedDate
      }}
    >
      {children}
    </DatesContext.Provider>
  );
};

export default function useDates() {
  const context = useContext(DatesContext);
  if (!context)
    throw Error(
      "DatesContext can only be used inside an DatesProvider"
    );
  return context;
}
