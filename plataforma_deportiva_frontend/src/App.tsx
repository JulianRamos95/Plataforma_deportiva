import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/estructura/Header";
import Footer from "./components/estructura/Footer";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import HomePage from "./pages/HomePage";
import TablaPage from "./pages/TablaPage";
import PartidosPage from "./pages/PartidosPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import EquipoDetallePage from "./pages/EquipoDetallePage";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <div className="app-layout">
                <Header />

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/registro" element={<RegistroPage />} />
                        <Route path="/home" element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
                        <Route path="/equipos" element={ <ProtectedRoute><TablaPage /></ProtectedRoute>} />
                        <Route path="/partidos" element={<ProtectedRoute><PartidosPage /></ProtectedRoute>} />
                        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPage /></ProtectedRoute>} />
                        <Route path="/equipo/:idEquipo" element={<ProtectedRoute><EquipoDetallePage /></ProtectedRoute>} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;