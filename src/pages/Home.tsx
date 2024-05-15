import useData from "../context/DataContext";
import useUserOptions from "../context/UserOptionsContext";
import { CardList } from "../layouts/CardList";

export default function Home() {
  const { data, dispatch } = useData();
  const { theme, lang } = useUserOptions();

  return (
    <>
      <div className={`main ${theme}`}>Home {lang}</div>

      <button
        onClick={() =>
          dispatch({
            type: "CREAR_PROYECTO",
            payload: { nombre: "EF", tipo: "Salud", diaActual: "2022-5-13" },
          })
        }
      >
        Agregar proyecto
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "AGREGAR_LOGRO",
            payload: {id: "ukjsdsdff21sdds", nombreLogro: "Correr", imgLogro: "ray.png"},
          })
        }
      >
        Agregar logro
      </button>
      <CardList>
      {data.map((project) => (
        <>
        <div>{project.nombre} - {project.id}</div>
        {project.logros.map((logro) => (
          <div>
            {logro.idLogro} - {logro.nombreLogro} - {logro.imgLogro}
          </div>
        ))}
        </>
      ))}
      </CardList>
    </>
  );
}
