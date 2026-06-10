import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput";
import AuthCard from "../components/auth/AuthCard";
import AuthIntro from "../components/auth/AuthIntro";

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
            localStorage.setItem("rol", data.rol || "USUARIO");

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
                        <AuthCard
                            icon="fa-solid fa-user-plus"
                            titulo="Crear cuenta"
                            subtitulo="Regístrate en FutbolTrack"
                            botonTexto="Registrarse"
                            botonIcono="fa-solid fa-user-check"
                            linkTexto="¿Ya tienes cuenta?"
                            linkTo="/login"
                            linkLabel="Iniciar sesión"
                            onSubmit={registrar}
                        >
                            <AuthInput
                                label="Nombre"
                                icon="fa-solid fa-user"
                                value={nombre}
                                onChange={setNombre}
                            />

                            <AuthInput
                                label="Gmail"
                                icon="fa-solid fa-envelope"
                                value={gmail}
                                onChange={setGmail}
                            />

                            <div className="mb-4">
                                <AuthInput
                                    label="Contraseña"
                                    icon="fa-solid fa-lock"
                                    type="password"
                                    value={password}
                                    onChange={setPassword}
                                />
                            </div>
                        </AuthCard>
                    </div>

                    <div className="col-12 col-lg-7">
                        <AuthIntro
                            badgeTexto="Plataforma de seguimiento fútbol"
                            titulo="Únete a FutbolTrack y sigue tus ligas favoritas"
                            descripcion="Crea tu cuenta para consultar países, ligas, tablas de posiciones, estadísticas de equipos y jornadas desde una plataforma sencilla y rápida hecha por y para fanáticos del fútbol."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegistroPage;