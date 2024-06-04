import React, { useContext, useEffect, useReducer, useState } from "react";
import { IProject, DataAction } from "../@types/data";
import { dataReducer } from "../reducers/dataReducer";
import axios from "axios";

export const DataContext = React.createContext<
  | {
      data: IProject[];
      dispatch: React.Dispatch<DataAction>;
    }
  | undefined
>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [initialData, setInitialData] = useState(
    JSON.parse(localStorage.getItem("data") || "{}") != ""
      ? JSON.parse(localStorage.getItem("data") || "{}")
      : []
  );
  const [data, dispatch] = useReducer(
    dataReducer,
    Object.keys(initialData).length === 0 ? [] : initialData
  );

  useEffect(() => {
    localStorage.getItem("data") == null
      ? axios
          .get(
            "https://raw.githubusercontent.com/nicolasgarin/json/main/project-tracker-data.json"
          )
          .then((res) => {
            setInitialData(res.data);
          })
          .catch((err) => console.log(err))
      : null;
    dispatch({ type: "INIT_DATA", payload: { data: initialData } });
  }, [initialData]);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <DataContext.Provider
      value={{
        data,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default function useData() {
  const context = useContext(DataContext);
  if (!context)
    throw Error("DataContext can only be used inside an DataProvider");
  return context;
}
