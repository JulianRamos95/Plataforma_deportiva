import { Link } from "react-router-dom";

function LigaPage() {
    const ligaId = localStorage.getItem("ligaId");
    const ligaNombre = localStorage.getItem("ligaNombre");

    if (!ligaId) {
        return (
            <section className="container py-4">
                <div className="alert alert-info">
                    Primero debe seleccionar una liga desde la página principal.
                </div>
                <Link to="/" className="btn btn-primary">
                    Volver a principal
                </Link>
            </section>
        );
    }

    return (
        <section className="container py-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="fw-bold mb-2">{ligaNombre}</h2>
                    <p className="text-muted">
                        Seleccione una de las opciones disponibles para consultar la información de la liga.
                    </p>

                    <div className="row g-3 mt-3">
                        <div className="col-12 col-md-6">
                            <Link to="/equipos" className="btn btn-primary w-100 py-3">
                                Ver equipos y estadísticas
                            </Link>
                        </div>

                        <div className="col-12 col-md-6">
                            <Link to="/partidos" className="btn btn-outline-primary w-100 py-3">
                                Ver partidos y jornadas
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LigaPage;