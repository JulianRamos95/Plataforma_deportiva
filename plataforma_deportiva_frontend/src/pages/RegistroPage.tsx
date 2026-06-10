import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegistroPage() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");

    async function registrar() {
        const response = await fetch("http://localhost:8080/api/auth/registro", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({ nombre, gmail, password })
        });

        if (response.ok) {
            const data = await response.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.id);
            localStorage.setItem("nombre", data.nombre);
            localStorage.setItem("gmail", data.gmail);

            navigate("/home");
        } else {
            alert("No se pudo registrar el usuario");
        }
    }

    return (
        <section className="login-section">
            <div className="container">
                <div className="row align-items-center justify-content-between g-5">

                    <div className="col-12 col-md-8 col-lg-4">
                        <div className="card login-card shadow">
                            <div className="card-body p-4">
                                <div className="text-center mb-4">
                                    <div className="login-icon mb-3">
                                        <i className="fa-solid fa-user-plus"></i>
                                    </div>
                                    <h3 className="fw-bold mb-1">Crear cuenta</h3>
                                    <p className="text-muted mb-0">Regístrate en FutbolTrack</p>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fa-solid fa-user"></i>
                                        </span>
                                        <input
                                            className="form-control"
                                            value={nombre}
                                            onChange={e => setNombre(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Gmail</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fa-solid fa-envelope"></i>
                                        </span>
                                        <input
                                            className="form-control"
                                            value={gmail}
                                            onChange={e => setGmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Contraseña</label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fa-solid fa-lock"></i>
                                        </span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button onClick={registrar} className="btn btn-football w-100 py-2">
                                    <i className="fa-solid fa-user-check me-2"></i>
                                    Registrarse
                                </button>

                                <p className="text-center mt-3 mb-0">
                                    ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-7">
                        <div className="login-intro">
                            <span className="badge bg-success mb-3">
                                <i className="fa-solid fa-futbol me-2"></i>
                                Plataforma de seguimiento fútbol
                            </span>

                            <h1 className="fw-bold mb-3">
                                Únete a FutbolTrack y sigue tus ligas favoritas
                            </h1>

                            <p className="lead mb-4">
                                Crea tu cuenta para consultar países, ligas, tablas de posiciones, estadísticas de equipos y jornadas desde una plataforma sencilla y rápida hecha por y para fanáticos del fútbol.
                            </p>

                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <div className="feature-box">
                                        <i className="fa-solid fa-table-list"></i>
                                        <span>Tablas de posiciones</span>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className="feature-box">
                                        <i className="fa-solid fa-calendar-days"></i>
                                        <span>Jornadas y partidos</span>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className="feature-box">
                                        <i className="fa-solid fa-chart-simple"></i>
                                        <span>Estadísticas de equipos</span>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className="feature-box">
                                        <i className="fa-solid fa-globe"></i>
                                        <span>Ligas por país</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default RegistroPage;