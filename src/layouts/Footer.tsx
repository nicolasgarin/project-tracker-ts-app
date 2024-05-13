import useUserOptions from '../context/UserOptionsContext';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineContactPage } from "react-icons/md";
import logoceleste from "../assets/logo-celeste-texto.svg";
import logovioleta from "../assets/logo-violeta-texto.svg";


export default function Footer() {
  const { theme, lang } = useUserOptions();
  return (
    <footer className={theme}>
      <div className="container-lg d-flex flex-column flex-sm-row align-items-center justify-content-between">
        <div className="texto-footer d-flex align-items-center justify-content-center justify-content-sm-start">
          <img
            src={theme == "light" ? logoceleste : logovioleta}
            className="logo"
            alt="Project tracker logo"
          />
        </div>

        <div className="section-icons d-flex align-items-center justify-content-center justify-content-sm-end g-30">
          <a href="https://github.com/nicolasgarin" aria-label={lang == "es" ? "Enlace a cuenta de Github" : "Github account link"} >
            <FaGithub className="ficon" />
          </a>
          <a href="https://www.linkedin.com/in/nicol%C3%A1s-gar%C3%ADn-a90b55202/" aria-label={lang == "es" ? "Enlace a cuenta de Linkedin" : "Linkedin account link"} >
            <FaLinkedin className="ficon" />
          </a>
          <a href="#" aria-label={lang == "es" ? "Descargar Curriculum Vitae" : "Download Curriculum Vitae"}>
            <MdOutlineContactPage className="ficon" />
          </a>
        </div>
      </div>
    </footer>
  );
}
