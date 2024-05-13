import useData from "../context/DataContext";
import useUserOptions from "../context/UserOptionsContext";

export default function Home() {
  const { data, dispatch } = useData();
  const { theme, lang } = useUserOptions();

  return (
    <>
      <div className={`main ${theme}`}>Home {lang}</div>
      {data.map((project) => (
        <div>{project.nombre} - {project.id}</div>
      ))}
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
    </>
  );
}
