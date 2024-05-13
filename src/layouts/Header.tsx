import { Link } from 'react-router-dom';
import { HiQuestionMarkCircle } from "react-icons/hi";
import { IoMoon, IoSunny } from "react-icons/io5";
import logo from "../assets/logo-celeste-texto.svg";
import esLogo from "../assets/es.svg";
import enLogo from "../assets/en.svg";
import useUserOptions from '../context/UserOptionsContext';

export default function Header() {
    const { theme, toggleTheme, lang, toggleLang } = useUserOptions();

  return (
    <header className={`header ${theme}`}>
      <div className="container-lg d-flex flex-column flex-sm-row align-items-center justify-content-between">
        <div className="sec-1 d-flex align-items-center justify-content-center justify-content-sm-start">
          <Link
            to={"/project-tracker-ts-app/"}
            aria-label={lang == "es" ? "Volver al inicio" : "Return to home"}
          >
            <img src={logo} className="logo mr-15" alt="Project tracker logo" />
          </Link>
        </div>
        <div className="options g-30 d-flex align-items-center justify-content-center justify-content-sm-end">
          <Link
            to={"/project-tracker-ts-app/instructions"}
            aria-label={
              lang == "es" ? "Ir a instrucciones" : "Go to instructions"
            }
          >
            <HiQuestionMarkCircle className="qmark color-1" />
          </Link>
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
              aria-label={
                lang == "es" ? "Switch to english" : "Cambiar a español"
              }
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
        </div>
      </div>
    </header>  )
}
