import { useState } from "react";
import useData from "../context/DataContext";
import useDates from "../context/DatesContext";
import useUserOptions from "../context/UserOptionsContext";

export default function NewProjectForm() {
  const { dispatch } = useData();
  const { actualDate } = useDates();
  const { lang } = useUserOptions();
  const [nombreP, setNombreP] = useState<string>("");
  const [tipoP, setTipoP] = useState<string>("");

  function handleSubmit(e: any) {
    e.preventDefault();
    dispatch({
      type: "CREAR_PROYECTO",
      payload: {
        nombre: nombreP,
        tipo: tipoP,
        diaActual: actualDate,
      },
    });
    setNombreP("");
    setTipoP("");
  }

  return (
    <form className="form-nuevo" onSubmit={handleSubmit}>
      <div className="container-lg d-flex flex-column flex-md-row align-items-end align-items-md-center justify-content-end">
        <div className="form-container d-flex align-items-center justify-content-center">
          <label className="form-label" htmlFor="item">
            {lang == "es" ? "Nuevo proyecto" : "New project"}
          </label>
          <input
            required
            className="input-form"
            type="text"
            value={nombreP}
            onChange={(e) => setNombreP(e.target.value)}
            id="item"
          />
        </div>
        <div className="form-container d-flex align-items-center justify-content-center">
          <label className="form-label" htmlFor="categoria">
            {lang == "es" ? "Categoría" : "Category"}
          </label>
          <select
            required
            id="categoria"
            className="input-form"
            value={tipoP}
            onChange={(e) => setTipoP(e.target.value)}
          >
            <option disabled value="">
              {lang == "es" ? "Elige una categoría" : "Select a category"}
            </option>
            <option value="Salud">{lang == "es" ? "Salud" : "Health"}</option>
            <option value="Crecimiento">
              {lang == "es" ? "Crecimiento Personal" : "Personal growth"}
            </option>
            <option value="Esparcimiento">
              {lang == "es" ? "Esparcimiento" : "Recreation"}
            </option>
          </select>
          <button type="submit" className="btn btn-violeta">
            {lang == "es" ? "Crear" : "Create"}
          </button>
        </div>
      </div>
    </form>
  );
}
