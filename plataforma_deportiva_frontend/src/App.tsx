import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import HomePage from "./pages/HomePage";
import LigaPage from "./pages/LigaPage";
import EquiposPage from "./pages/EquiposPage";
import PartidosPage from "./pages/PartidosPage";
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Header />

          <main className="flex-grow-1">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegistroPage />} />

              <Route path="/" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />

              <Route path="/liga" element={
                <ProtectedRoute>
                  <LigaPage />
                </ProtectedRoute>
              } />

              <Route path="/equipos" element={
                <ProtectedRoute>
                  <EquiposPage />
                </ProtectedRoute>
              } />

              <Route path="/partidos" element={
                <ProtectedRoute>
                  <PartidosPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;