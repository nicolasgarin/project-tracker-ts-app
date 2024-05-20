import React, { useState } from "react";
import { ACCIONES } from "../App";
import rocket from "../assets/medals/rocket-medal.svg";
import star from "../assets/medals/star-medal.svg";
import cup from "../assets/medals/cup-medal.svg";
import ray from "../assets/medals/ray-medal.svg";
import crown from "../assets/medals/crown-medal.svg";
import { useUserOptions } from "../context/UserOptionsContext";

export default function Logros({ project, dispatch }) {
  const { lang } = useUserOptions();
  const [nombreLogro, setNombreLogro] = useState("");
  const availableImgs = ["rocket", "star", "cup", "ray", "crown"];

  function handleLogro(e) {
    e.preventDefault();
    dispatch({
      tipo: ACCIONES.AGREGAR_LOGRO,
      payload: {
        id: project.id,
        nombreLogro: nombreLogro,
        imgLogro:
          availableImgs[Math.floor(Math.random() * availableImgs.length)],
      },
    });
    setNombreLogro("");
  }

  function logoAssign(string) {
    switch (string) {
      case "rocket":
        return rocket;
      case "star":
        return star;
      case "cup":
        return cup;
      case "ray":
        return ray;
      case "crown":
        return crown;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="logros-tab">
        <div className="logros-container">
          {project.logros.length > 0 ? (
            <div key={project.id} className="logros d-flex row">
              {project.logros.map((logro) => {
                return (
                  <div key={logro.id} className="medal-box d-flex flex-column align-items-center col-4">
                    <img
                      alt={`${lang == "es" ? "Medalla " : ''}${logro.nombreLogro}${lang == "en" ? " medal " : ''}`}
                      src={logoAssign(logro.imgLogo)}
                      className="medal"
                    />
                    <div className="medal-name texto-imp text-center">
                      {logro.nombreLogro.toUpperCase()}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="msj d-flex align-items-center justify-content-center texto-imp">
              {lang == "es"
                ? "Aún no hay logros creados"
                : "There are no achievements created yet"}
            </div>
          )}
        </div>

        <div className="logros-form d-flex align-items-center">
          <form className="d-flex align-items-center justify-content-between">
            <input
              type="text"
              id="nombreNuevoLogro"
              value={nombreLogro}
              onChange={(e) => setNombreLogro(e.target.value)}
              required
            />
            <input
              aria-label={lang == "es" ? "Crear logro" : "Create achievment"}
              className="btn btn-violeta"
              type="submit"
              value={lang == "es" ? "Crear" : "Create"}
              onClick={handleLogro}
            />
          </form>
        </div>
      </div>
    </>
  );
}
