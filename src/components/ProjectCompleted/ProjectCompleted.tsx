import { FaCheck, FaUndo } from "react-icons/fa";
import { IProject } from "../../@types/data";
import useUserOptions from "../../context/UserOptionsContext";
import useData from "../../context/DataContext";
import { capFirstLetter } from "../../utils/reusableFunctions";
import "./ProjectCompleted.scss";

export default function ProjectCompleted({ project }: { project: IProject }) {
  const { dispatch } = useData();
  const { lang } = useUserOptions();

  return (
    <div className="completed-subp">
      {project.subproyectos.filter((subP) => subP.cerrada).length > 0 ? (
        <div className="filas d-flex flex-column">
          {project.subproyectos.map((subP) => {
            if (subP.cerrada) {
              return (
                <div
                  key={subP.idSubp}
                  className="fila d-flex align-items-center justify-content-between"
                >
                  <div className="nombre bold">{capFirstLetter(subP.nombreSubp)}</div>
                  <div className="info d-flex">
                    <div className="d-flex align-items-center">
                      <FaCheck className="check" />{" "}
                      {subP.diasChecklist.length}
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="celda celda-md check-1"></div>
                      {
                        subP.diasChecklist.filter((dia) => dia.status == 0)
                          .length
                      }
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="celda celda-md check-2"></div>
                      {
                        subP.diasChecklist.filter((dia) => dia.status == 1)
                          .length
                      }
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="celda celda-md check-3"></div>
                      {
                        subP.diasChecklist.filter((dia) => dia.status == 2)
                          .length
                      }
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="celda celda-md check-4"></div>
                      {
                        subP.diasChecklist.filter((dia) => dia.status == 3)
                          .length
                      }
                    </div>
                  </div>
                  <button
                    aria-label={lang == "es" ? "Reactivar subproyecto" : "Reactive subproject"}
                    className="btn btn-celeste"
                    onClick={() => {
                      dispatch({
                        type: "FINALIZAR_SUBPROYECTO",
                        payload: {
                          id: project.id,
                          idSubp: subP.idSubp,
                        },
                      });
                    }}
                  >
                    <FaUndo />
                  </button>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div className="msj d-flex align-items-center justify-content-center bold">
          {lang == "es" ? "Todavía no hay subproyectos terminados" : "There are no completed subprojects yet"}
        </div>
      )}
    </div>
  );
}
