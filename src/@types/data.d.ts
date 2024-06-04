export interface IProject {
  nombre: string;
  id: string;
  tipo: string;
  fechaCreacion: string;
  favorito: boolean;
  archivado: boolean;
  logros: {
    idLogro: string;
    nombreLogro: string;
    imgLogro: string;
  }[];
  subproyectos: {
    nombreSubp: string;
    idSubp: string;
    cerrada: boolean;
    diasChecklist: {
      date: string;
      status: number;
    }[];
  }[];
}

export type DataAction =
| { type: "INIT_DATA"; payload: {data: IProject[]}}
| { type: "CREAR_PROYECTO"; payload: {nombre: string, tipo: string, diaActual: string} }
| { type: "ELIMINAR_PROYECTO"; payload: {id: string} }
| { type: "AGREGAR_LOGRO"; payload: {id: string, nombreLogro: string, imgLogro: string} }
| { type: "AGREGAR_SUBPROYECTO"; payload: {id: string, nombreSubp: string} }
| { type: "ELIMINAR_SUBPROYECTO"; payload: {id: string, idSubp: string} }
| { type: "FAV_PROYECTO"; payload: {id: string} }
| { type: "ARCHIVAR_PROYECTO"; payload: {id: string} }
| { type: "ACTUALIZAR_SUBPROYECTO"; payload: {id: string, idSubp: string, diaActual: string} }
| { type: "FINALIZAR_SUBPROYECTO"; payload: {id: string, idSubp: string} };