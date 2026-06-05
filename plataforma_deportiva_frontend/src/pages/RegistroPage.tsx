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
            body: JSON.stringify({
                nombre: nombre,
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
            alert("No se pudo registrar el usuario");
        }
    }

    return (
        <section className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Registro</h3>

                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Gmail</label>
                                <input className="form-control" value={gmail} onChange={e => setGmail(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>

                            <button onClick={registrar} className="btn btn-primary w-100">
                                Registrarse
                            </button>

                            <p className="text-center mt-3 mb-0">
                                ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegistroPage;