import useUserOptions from "../../context/UserOptionsContext";
import { IoMoon, IoSunny } from "react-icons/io5";
import esLogo from "../../assets/es.svg";
import enLogo from "../../assets/en.svg";

export default function UserOptions() {
  const { theme, toggleTheme, lang, toggleLang } = useUserOptions();

  return (
    <>
      <div className="switch-container g-5 d-flex align-items-center">
        <IoMoon />
        <label className="switch">
          <input
            aria-label={
              lang == "es"
                ? theme == "dark"
                  ? "Cambiar a modo claro"
                  : "Cambiar a modo oscuro"
                : theme == "light"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            type="checkbox"
            checked={theme === "light"}
            onChange={toggleTheme}
          />
          <span className="slider round" />
        </label>
        <IoSunny />
      </div>
      <div className="lang-container">
        <div
          aria-label={lang == "es" ? "Switch to english" : "Cambiar a español"}
          className={`logo-cont rounded-circle d-flex align-items-center justify-content-center ${
            lang === "es" ? "animation" : "animation-2"
          }`}
          onClick={toggleLang}
        >
          <img
            className="lang-logo"
            src={lang === "es" ? esLogo : enLogo}
            alt={lang === "es" ? "Bandera España" : "UK flag"}
          />
        </div>
      </div>
    </>
  );
}
