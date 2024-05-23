import { useState } from "react";
import useUserOptions from "../../context/UserOptionsContext";
import useData from "../../context/DataContext";
import { IProject } from "../../@types/data";

export default function NewSubprojectForm({
  proyecto,
}: {
  proyecto: IProject;
}) {
  const { dispatch } = useData();
  const { lang } = useUserOptions();
  const [nuevoSubP, setNuevoSubP] = useState<string>("");

  function handleSubP(e: any) {
    e.preventDefault();
    dispatch({
      type: "AGREGAR_SUBPROYECTO",
      payload: { nombreSubp: nuevoSubP, id: proyecto.id },
    });
    setNuevoSubP("");
  }

  return (
    <form className="form-nueva-subcat" onSubmit={handleSubP}>
      <div className="container-lg d-flex align-items-center justify-content-end">
        <label className="form-label bold" htmlFor="item">
          {lang == "es" ? "Nuevo subproyecto" : "New subproject"}
        </label>
        <input
          required
          className="input-form"
          type="text"
          value={nuevoSubP}
          onChange={(e) => setNuevoSubP(e.target.value)}
          id="item"
        />
        <button
          type="submit"
          className="btn btn-violeta"
          aria-label={lang == "es" ? "Crear subproyecto" : "Create subproject"}
        >
          {lang == "es" ? "Crear" : "Create"}
        </button>
      </div>
    </form>
  );
}
