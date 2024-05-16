import { Route, Routes } from "react-router";
import "./main.scss";
import Home from "./pages/Home";
import Instructions from "./pages/Instructions";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Project from "./pages/Project";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects">
          <Route
            path=":id"
            element={
              <Project/>
            }
          />
        </Route>
        <Route path="/instructions" element={<Instructions />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
