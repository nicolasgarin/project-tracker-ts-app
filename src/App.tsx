import { Route, Routes } from "react-router";
import "./main.scss";
import Home from "./pages/Home";
import Instructions from "./pages/Instructions";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instructions" element={<Instructions />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
