import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const nombre = localStorage.getItem("nombre");

    function salir() {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("nombre");
        localStorage.removeItem("gmail");
        localStorage.removeItem("ligaId");
        localStorage.removeItem("ligaNombre");
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">Plataforma Deportiva</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="menuPrincipal">
                    {token && (
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Principal</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/equipos">Equipos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/partidos">Partidos</Link>
                            </li>
                        </ul>
                    )}

                    <div className="d-flex align-items-center gap-2">
                        {token ? (
                            <>
                                <span className="text-white small">{nombre}</span>
                                <button onClick={salir} className="btn btn-outline-light btn-sm">
                                    Salir
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="btn btn-outline-light btn-sm" to="/login">Login</Link>
                                <Link className="btn btn-primary btn-sm" to="/registro">Registrarse</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;