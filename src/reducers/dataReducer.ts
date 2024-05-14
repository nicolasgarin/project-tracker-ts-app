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
      case 'ELIMINAR_PROYECTO':
        return state.filter(
          (proyecto) => proyecto.id !== action.payload.id
        );
        case 'AGREGAR_LOGRO':
          return state.map((proyecto) => {
            if (proyecto.id === action.payload.id) {
              return {
                ...proyecto,
                logros: [
                  ...proyecto.logros,
                  { idLogro: uuidv4(), nombreLogro: action.payload.nombreLogro, imgLogo: action.payload.imgLogro },
                ],
              };
            } else {
              return proyecto;
            }
          });
          case 'AGREGAR_SUBPROYECTO':
            return state.map((proyecto) => {
              if (proyecto.id === action.payload.idSubp) {
                return {
                  ...proyecto,
                  subcategorias: [
                    ...proyecto.subcategorias,
                    {
                      nombreSubcat: action.payload.nombreSubp,
                      idSubcat: uuidv4(),
                      cerrada: false,
                      diasCheckeados: [],
                    },
                  ],
                };
              } else {
                return proyecto;
              }
            });
            case 'ELIMINAR_SUBPROYECTO':
              return state.map((proyecto) => {
                if (proyecto.id === action.payload.id) {
                  return {
                    ...proyecto,
                    subcategorias: proyecto.subcategorias.filter(
                      (subP) => subP.idSubcat !== action.payload.idSubp
                    ),
                  };
                } else {
                  return proyecto;
                }
              });
              case 'FAV_PROYECTO':
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
        case 'ARCHIVAR_PROYECTO':
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
          case 'ACTUALIZAR_SUBPROYECTO':
            return state.map((proyecto) => {
              if (proyecto.id === action.payload.id) {
                return {
                  ...proyecto,
                  subcategorias: proyecto.subcategorias.map((subP) => {
                    if (subP.idSubcat === action.payload.idSubp) {
                      return {
                        ...subP,
                        diasCheckeados:
                        subP.diasCheckeados.filter((dia) => dia.date == action.payload.diaActual)
                            .length > 0
                            ? subP.diasCheckeados.filter(
                                (dia) => dia.date == action.payload.diaActual && dia.status == 0
                              ).length > 0
                              ? [
                                  ...subP.diasCheckeados.filter(
                                    (dia) => dia.date != action.payload.diaActual
                                  ),
                                  { date: action.payload.diaActual, status: 1 },
                                ]
                              : subP.diasCheckeados.filter(
                                  (dia) => dia.date == action.payload.diaActual && dia.status == 1
                                ).length > 0
                              ? [
                                  ...subP.diasCheckeados.filter(
                                    (dia) => dia.date != action.payload.diaActual
                                  ),
                                  { date: action.payload.diaActual, status: 2 },
                                ]
                              : subP.diasCheckeados.filter(
                                  (dia) => dia.date == action.payload.diaActual && dia.status == 2
                                ).length > 0
                              ? [
                                  ...subP.diasCheckeados.filter(
                                    (dia) => dia.date != action.payload.diaActual
                                  ),
                                  { date: action.payload.diaActual, status: 3 },
                                ]
                              : subP.diasCheckeados.filter(
                                  (dia) => dia.date != action.payload.diaActual
                                )
                            : [...subP.diasCheckeados, { date: action.payload.diaActual, status: 0 }],
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
            case 'FINALIZAR_SUBPROYECTO':
              return state.map((proyecto) => {
                if (proyecto.id === action.payload.id) {
                  return {
                    ...proyecto,
                    subcategorias: proyecto.subcategorias.map((subcat) => {
                      if (subcat.idSubcat === action.payload.idSubp) {
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
