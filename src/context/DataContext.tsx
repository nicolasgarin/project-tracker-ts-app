import React, { useContext, useEffect, useReducer, useState } from "react";
import { IProject, DataAction } from "../@types/data";
import { dataReducer } from "../reducers/dataReducer";
import axios from "axios";

export const DataContext = React.createContext<{
    data: IProject[];
    dispatch: React.Dispatch<DataAction>;
  } | undefined>(
  undefined
);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [initialData, setInitialData] = useState(JSON.parse(localStorage.getItem("data") || '{}') != '' ?JSON.parse(localStorage.getItem("data") || '{}') : []);
  const [data, dispatch] = useReducer(dataReducer, Object.keys(initialData).length === 0? [] : initialData);
/*
  useEffect(() => {
    localStorage.getItem("data") == null ?
    axios
      .get(
        "https://raw.githubusercontent.com/nicolasgarin/json/main/project-tracker-data.json"
      )
      .then((res) => {
        setInitialData(res.data);
      })
      .catch((err) => console.log(err))
      : null
  }, []);
*/
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
      throw Error(
        "DataContext can only be used inside an DataProvider"
      );
    return context;
  }

/*
const mockData ={
  nombre: "Entrenamiento",
  id: "ukjsdsdff21sdds",
  tipo: "Salud",
  fechaCreacion: "2024-2-17",
  favorito: true,
  archivado: false,
  logros: [
    {
      idLogro: "dskfs",
      nombreLogro: "5K Montevideo corre",
      imgLogro: "ray",
    },
    {
      idLogro: "dskfsdfdss",
      nombreLogro: "3 meses crossfit",
      imgLogro: "cup",
    },
  ],
  subproyectos: [
    {
      nombreSubp: "Correr",
      idSubp: "sdf1sdvcf2",
      cerrada: false,
      diasChecklist: [
        {
          date: "2023-10-17",
          status: 1,
        },
        {
          date: "2024-2-17",
          status: 1,
        },
        {
          date: "2024-2-20",
          status: 0,
        },
        {
          date: "2024-2-21",
          status: 1,
        },
        {
          date: "2024-3-3",
          status: 0,
        },
        {
          date: "2024-3-6",
          status: 0,
        },
        {
          date: "2024-3-8",
          status: 1,
        },
        {
          date: "2024-3-11",
          status: 1,
        },
        {
          date: "2024-3-13",
          status: 0,
        },
        {
          date: "2024-3-18",
          status: 0,
        },
        {
          date: "2024-3-20",
          status: 1,
        },
        {
          date: "2024-3-25",
          status: 2,
        },
        {
          date: "2024-3-27",
          status: 0,
        },
        {
          date: "2024-3-29",
          status: 1,
        },
        {
          date: "2024-4-1",
          status: 1,
        },
        {
          date: "2024-4-5",
          status: 0,
        },
        {
          date: "2024-4-8",
          status: 1,
        },
        {
          date: "2024-4-12",
          status: 0,
        },
        {
          date: "2024-4-14",
          status: 1,
        },
        {
          date: "2024-4-16",
          status: 0,
        },
        {
          date: "2024-4-23",
          status: 1,
        },
      ],
    },
    {
      nombreSubp: "Crossfit",
      idSubp: "26a9c159-7e4e-4861-aca8-04c3a08a5e43",
      cerrada: false,
      diasChecklist: [
        {
          date: "2024-3-5",
          status: 2,
        },
        {
          date: "2024-3-7",
          status: 1,
        },
        {
          date: "2024-3-12",
          status: 2,
        },
        {
          date: "2024-3-14",
          status: 2,
        },
        {
          date: "2024-3-19",
          status: 1,
        },
        {
          date: "2024-3-21",
          status: 2,
        },
        {
          date: "2024-3-26",
          status: 1,
        },
        {
          date: "2024-3-28",
          status: 2,
        },
        {
          date: "2024-4-2",
          status: 1,
        },
        {
          date: "2024-4-4",
          status: 2,
        },
        {
          date: "2024-4-9",
          status: 1,
        },
        {
          date: "2024-4-11",
          status: 2,
        },
        {
          date: "2024-4-23",
          status: 2,
        },
      ],
    },
  ],
}
*/