import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput";
import AuthCard from "../components/auth/AuthCard";
import AuthIntro from "../components/auth/AuthIntro";

function LoginPage() {
    const navigate = useNavigate();

    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({ gmail, password })
        });

        if (response.ok) {
            const data = await response.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.id);
            localStorage.setItem("nombre", data.nombre);
            localStorage.setItem("gmail", data.gmail);
            localStorage.setItem("rol", data.rol);

            if (data.rol === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/home");
            }
        } else {
            alert("Credenciales incorrectas");
        }
    }

    return (
        <section className="login-section">
            <div className="container">
                <div className="row align-items-center justify-content-between g-5">
                    <div className="col-12 col-md-8 col-lg-4">
                        <AuthCard
                            icon="fa-solid fa-user-shield"
                            titulo="Iniciar sesión"
                            subtitulo="Accede a FutbolTrack"
                            botonTexto="Ingresar"
                            botonIcono="fa-solid fa-right-to-bracket"
                            linkTexto="¿No tienes cuenta?"
                            linkTo="/registro"
                            linkLabel="Registrarse"
                            onSubmit={login}
                        >
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
                            badgeTexto="Plataforma de seguimiento de fútbol"
                            titulo="Vive el seguimiento de tus ligas favoritas de fútbol"
                            descripcion="Consulta países, ligas, tablas de posiciones, estadísticas de equipos y jornadas desde una plataforma sencilla y rápida hecha por y para fanáticos del fútbol."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;