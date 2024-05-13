import { Route, Routes } from 'react-router';
import './main.scss';
import Home from './pages/Home';

function App() {

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
            />
          }
        />
        <Route path="*" element={<>not foun page</>} />
      </Routes>    </>
  )
}

export default App
