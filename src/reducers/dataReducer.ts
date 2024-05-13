import { DataAction, IProject } from "../@types/data";
import { v4 as uuidv4 } from "uuid";

export const dataReducer = (state: IProject[], action: DataAction): IProject[] => {
    switch (action.type) {
      case 'CREAR_PROYECTO':
        const newProject = (nombre: string, tipo: string, diaActual: string) => {
        const newProj: IProject = {
        nombre: nombre,
        id: uuidv4(),
        tipo: tipo,
        fechaCreacion: diaActual,
        favorito: false,
        archivado: false,
        logros: [],
        subproyectos: [],
        };
        return newProj;
        };
        return [...state, newProject(action.payload.nombre, action.payload.tipo, action.payload.diaActual)];
      default:
        return state;
    }
};