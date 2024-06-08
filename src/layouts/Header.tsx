import { Link } from 'react-router-dom';
import { HiQuestionMarkCircle } from "react-icons/hi";
import logoCorto from "../assets/logo-celeste.svg";
import logo from "../assets/logo-celeste-texto.svg";
import useUserOptions from '../context/UserOptionsContext';
import UserOptions from '../components/UserOptions/UserOptions';

export default function Header() {
    const { theme, lang } = useUserOptions();

  return (
    <header className={`header ${theme}`}>
      <div className="container-lg d-flex align-items-center justify-content-between">
        <div className="sec-1 d-flex align-items-center justify-content-center justify-content-sm-start">
          <Link
            to={"/project-tracker-ts-app/"}
            aria-label={lang == "es" ? "Volver al inicio" : "Return to home"}
          >
            <img src={logoCorto} className="logo d-block d-sm-none mr-15" alt="Project tracker logo" />
            <img src={logo} className="logo d-none d-sm-block mr-15" alt="Project tracker logo" />
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
          <UserOptions />
        </div>
      </div>
    </header>  )
}
