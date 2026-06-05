import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({
                gmail: gmail,
                password: password
            })
        });

        if (response.ok) {
            const data = await response.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.id);
            localStorage.setItem("nombre", data.nombre);
            localStorage.setItem("gmail", data.gmail);

            navigate("/");
        } else {
            alert("Credenciales incorrectas");
        }
    }

    return (
        <section className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Iniciar sesión</h3>

                            <div className="mb-3">
                                <label className="form-label">Gmail</label>
                                <input className="form-control" value={gmail} onChange={e => setGmail(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>

                            <button onClick={login} className="btn btn-primary w-100">
                                Ingresar
                            </button>

                            <p className="text-center mt-3 mb-0">
                                ¿No tienes cuenta? <Link to="/registro">Registrarse</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;