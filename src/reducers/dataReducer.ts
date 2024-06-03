import { DataAction, IProject } from "../@types/data";
import { v4 as uuidv4 } from "uuid";

export const dataReducer = (
  state: IProject[],
  action: DataAction
): IProject[] => {
  switch (action.type) {
    case "INIT_DATA":
      return action.payload.data;
    case "ORDENAR_DATA":
      return state
        .sort(function (a, b) {
          if (a.fechaCreacion == b.fechaCreacion) {
            return a.nombre < b.nombre ? -1 : a.nombre > b.nombre ? 1 : 0;
          } else {
            return (
              new Date(b.fechaCreacion).getTime() -
              new Date(a.fechaCreacion).getTime()
            );
          }
        })
        .sort(function (a) {
          return a.archivado ? 1 : -1;
        })
        .sort(function (a) {
          return a.favorito ? -1 : 1;
        })
        .map((proyecto) => proyecto);
    case "CREAR_PROYECTO":
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
      return [
        ...state,
        newProject(
          action.payload.nombre,
          action.payload.tipo,
          action.payload.diaActual
        ),
      ];
    case "ELIMINAR_PROYECTO":
      return state.filter((proyecto) => proyecto.id !== action.payload.id);
    case "AGREGAR_LOGRO":
      return state.map((proyecto) => {
        if (proyecto.id === action.payload.id) {
          return {
            ...proyecto,
            logros: [
              ...proyecto.logros,
              {
                idLogro: uuidv4(),
                nombreLogro: action.payload.nombreLogro,
                imgLogro: action.payload.imgLogro,
              },
            ],
          };
        } else {
          return proyecto;
        }
      });
    case "AGREGAR_SUBPROYECTO":
      return state.map((proyecto) => {
        if (proyecto.id === action.payload.id) {
          return {
            ...proyecto,
            subproyectos: [
              ...proyecto.subproyectos,
              {
                nombreSubp: action.payload.nombreSubp,
                idSubp: uuidv4(),
                cerrada: false,
                diasChecklist: [],
              },
            ],
          };
        } else {
          return proyecto;
        }
      });
    case "ELIMINAR_SUBPROYECTO":
      return state.map((proyecto) => {
        if (proyecto.id === action.payload.id) {
          return {
            ...proyecto,
            subproyectos: proyecto.subproyectos.filter(
              (subP) => subP.idSubp !== action.payload.idSubp
            ),
          };
        } else {
          return proyecto;
        }
      });
    case "FAV_PROYECTO":
      return state.map((proyecto) => {
        if (proyecto.id === action.payload.id) {
          return {
            ...proyecto,
            favorito: !proyecto.favorito,
          };
        } else {
          return proyecto;
        }
      });
    case "ARCHIVAR_PROYECTO":
      return state.map((proyecto) => {
        if (proyecto.id === action.payload.id) {
          return {
            ...proyecto,
            favorito: false,
            archivado: !proyecto.archivado,
          };
        } else {
          return proyecto;
        }
      });
    case "ACTUALIZAR_SUBPROYECTO":
      return state.map((proyecto) => {
        if (proyecto.id === action.payload.id) {
          return {
            ...proyecto,
            subproyectos: proyecto.subproyectos.map((subP) => {
              if (subP.idSubp === action.payload.idSubp) {
                return {
                  ...subP,
                  diasChecklist:
                    subP.diasChecklist.filter(
                      (dia) => dia.date == action.payload.diaActual
                    ).length > 0
                      ? subP.diasChecklist.filter(
                          (dia) =>
                            dia.date == action.payload.diaActual &&
                            dia.status == 0
                        ).length > 0
                        ? [
                            ...subP.diasChecklist.filter(
                              (dia) => dia.date != action.payload.diaActual
                            ),
                            { date: action.payload.diaActual, status: 1 },
                          ]
                        : subP.diasChecklist.filter(
                            (dia) =>
                              dia.date == action.payload.diaActual &&
                              dia.status == 1
                          ).length > 0
                        ? [
                            ...subP.diasChecklist.filter(
                              (dia) => dia.date != action.payload.diaActual
                            ),
                            { date: action.payload.diaActual, status: 2 },
                          ]
                        : subP.diasChecklist.filter(
                            (dia) =>
                              dia.date == action.payload.diaActual &&
                              dia.status == 2
                          ).length > 0
                        ? [
                            ...subP.diasChecklist.filter(
                              (dia) => dia.date != action.payload.diaActual
                            ),
                            { date: action.payload.diaActual, status: 3 },
                          ]
                        : subP.diasChecklist.filter(
                            (dia) => dia.date != action.payload.diaActual
                          )
                      : [
                          ...subP.diasChecklist,
                          { date: action.payload.diaActual, status: 0 },
                        ],
                };
              } else {
                return subP;
              }
            }),
          };
        } else {
          return proyecto;
        }
      });
    case "FINALIZAR_SUBPROYECTO":
      return state.map((proyecto) => {
        if (proyecto.id === action.payload.id) {
          return {
            ...proyecto,
            subproyectos: proyecto.subproyectos.map((subcat) => {
              if (subcat.idSubp === action.payload.idSubp) {
                return {
                  ...subcat,
                  cerrada: !subcat.cerrada,
                };
              } else {
                return subcat;
              }
            }),
          };
        } else {
          return proyecto;
        }
      });
    default:
      return state;
  }
};
