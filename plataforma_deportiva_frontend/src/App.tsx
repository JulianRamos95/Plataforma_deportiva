import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import HomePage from "./pages/HomePage";
import LigaPage from "./pages/LigaPage";
import EquiposPage from "./pages/EquiposPage";
import PartidosPage from "./pages/PartidosPage";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <div className="app-layout">
                <Header />

                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/registro" element={<RegistroPage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/liga" element={<LigaPage />} />
                        <Route path="/equipos" element={<EquiposPage />} />
                        <Route path="/partidos" element={<PartidosPage />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;