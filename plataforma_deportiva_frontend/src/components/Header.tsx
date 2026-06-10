import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem("token");
    const nombre = localStorage.getItem("nombre");
    const ligaId = localStorage.getItem("ligaId");

    const esPantallaPublica =
        location.pathname === "/login" ||
        location.pathname === "/registro" ||
        location.pathname === "/";

    function salir() {
        localStorage.clear();
        navigate("/login");
    }

    function volverInicio() {
        localStorage.removeItem("ligaId");
        localStorage.removeItem("ligaNombre");

        navigate("/home");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to={token ? "/home" : "/login"}
                >
                    ⚽ FutbolTrack
                </Link>

                {!esPantallaPublica && (
                    <>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#menuPrincipal"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="menuPrincipal">

                            <ul className="navbar-nav me-auto">

                                <li className="nav-item">
                                    <button
                                        className="nav-link bg-transparent border-0"
                                        onClick={volverInicio}
                                    >
                                        Inicio
                                    </button>
                                </li>

                                {ligaId && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/equipos">
                                                Tabla
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link className="nav-link" to="/partidos">
                                                Partidos
                                            </Link>
                                        </li>
                                    </>
                                )}

                            </ul>

                            <div className="d-flex align-items-center gap-3">

                                <span className="text-white small">
                                    {nombre}
                                </span>

                                <button
                                    className="btn btn-outline-light btn-sm"
                                    onClick={salir}
                                >
                                    Salir
                                </button>

                            </div>

                        </div>
                    </>
                )}

            </div>
        </nav>
    );
}

export default Header;