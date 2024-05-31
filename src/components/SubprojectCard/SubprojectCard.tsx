import { IProject } from "../../@types/data";
import useData from "../../context/DataContext";
import useDates from "../../context/DatesContext";
import useUserOptions from "../../context/UserOptionsContext";
import { capFirstLetter } from "../../utils/reusableFunctions";
import "./SubprojectCard.scss";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

interface SubprojectCardProps {
  proyecto: IProject;
  subP: {
    nombreSubp: string;
    idSubp: string;
    cerrada: boolean;
    diasChecklist: {
      date: string;
      status: number;
    }[];
  };
}

export default function SubprojectCard({
  proyecto,
  subP,
}: SubprojectCardProps) {
  const { lang } = useUserOptions();
  const { dispatch } = useData();
  const { selectedDate } = useDates();

  return (
    <div
      className="subcat bold d-flex flex-column justify-content-between"
      key={subP.idSubp}
    >
      <div className="fila-1 d-flex align-items-center justify-content-between">
        <div className="subcat-name">{capFirstLetter(subP.nombreSubp)}</div>
        <button
          aria-label={
            lang == "es" ? "Eliminar subproyecto" : "Delete subproject"
          }
          onClick={() =>
            dispatch({
              type: "ELIMINAR_SUBPROYECTO",
              payload: { id: proyecto.id, idSubp: subP.idSubp },
            })
          }
          className="btn btn-rojo square sq-sm"
        >
          <ImCross className="x" />
        </button>
      </div>
      <div className="fila-2 d-flex align-items-center judfy-content-between">
        <div>{lang == "es" ? "Progreso del día" : "Day progress"}</div>
        <div
          className={`celda celda-project ${
            subP.diasChecklist.filter((dia) => dia.date == selectedDate)
              .length > 0
              ? subP.diasChecklist.filter(
                  (dia) => dia.date == selectedDate && dia.status == 0
                ).length > 0
                ? "check-1"
                : subP.diasChecklist.filter(
                    (dia) => dia.date == selectedDate && dia.status == 1
                  ).length > 0
                ? "check-2"
                : subP.diasChecklist.filter(
                    (dia) => dia.date == selectedDate && dia.status == 2
                  ).length > 0
                ? "check-3"
                : "check-4"
              : ""
          } d-flex align-items-center justify-content-center`}
          onClick={() =>
            dispatch({
              type: "ACTUALIZAR_SUBPROYECTO",
              payload: {
                id: proyecto.id,
                idSubp: subP.idSubp,
                diaActual: selectedDate,
              },
            })
          }
        >
          <FaCheck className="check-ic" />
        </div>
      </div>

      <div className="subcat-info d-flex flex-column g-10">
        <div className="">Total : {subP.diasChecklist.length}</div>
        <div className="row rg-10">
          <div className="d-flex col-6 align-items-center g-15">
            <div className="celda check-1"></div>
            {subP.diasChecklist.filter((dia) => dia.status == 0).length}
          </div>
          <div className="d-flex col-6 align-items-center g-15">
            <div className="celda check-2"></div>
            {subP.diasChecklist.filter((dia) => dia.status == 1).length}
          </div>
          <div className="d-flex col-6 align-items-center g-15">
            <div className="celda check-3"></div>
            {subP.diasChecklist.filter((dia) => dia.status == 2).length}
          </div>
          <div className="d-flex col-6 align-items-center g-15">
            <div className="celda check-4"></div>
            {subP.diasChecklist.filter((dia) => dia.status == 3).length}
          </div>
        </div>
      </div>
      <button
        aria-label={
          lang == "es" ? "Finalizar subproyecto" : "Finish subproject"
        }
        onClick={() =>
          dispatch({
            type: "FINALIZAR_SUBPROYECTO",
            payload: {
              id: proyecto.id,
              idSubp: subP.idSubp,
            },
          })
        }
        className="btn btn-celeste"
      >
        {lang == "es" ? "Finalizar" : "Finish"}
      </button>
    </div>
  );
}
