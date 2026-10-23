//Local Elements
import './css/App.css'
import Navbar from './components/navbar'

// Pages
import Menu from './pages/Menu'
import Abilities from './pages/Abilities'
import Equipment from './pages/Equipment'
import StrengthWeak from "./pages/StrengthWeak.jsx";
import Extrema from "./pages/Extrema.jsx";

// Modules
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
        <Navbar />
        <main className="relative min-h-screen h-full w-full overflow-x-hidden">
            <Routes>
                <Route path="/"  element={<Menu />} />
                <Route path="/abilities" element={<Abilities />} />
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/extrema" element={<Extrema />} />
                <Route path="/strength-weakness" element={<StrengthWeak />} />
            </Routes>
        </main>
    </div>

  );
}

export default App