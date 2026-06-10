interface Liga {
    id: number;
    nombre: string;
    pais: string;
}

interface AcordeonFavoritosLigasProps {
    ligas: Liga[];
    onSeleccionarLiga: (liga: Liga) => void;
    onAlternarFavorito: (idLiga: number) => void;
}

function AcordeonFavoritosLigas({
                                    ligas,
                                    onSeleccionarLiga,
                                    onAlternarFavorito
                                }: AcordeonFavoritosLigasProps) {
    return (
        <div className="accordion mb-4" id="acordeonFavoritos">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#favoritosCollapse"
                    >
                        <i className="fa-solid fa-star me-2"></i>
                        Favoritos
                    </button>
                </h2>

                <div
                    id="favoritosCollapse"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#acordeonFavoritos"
                >
                    <div className="accordion-body bg-white">
                        {ligas.length === 0 ? (
                            <div className="alert alert-warning mb-0">
                                Todavía no tiene ligas favoritas.
                            </div>
                        ) : (
                            <div className="list-group">
                                {ligas.map(liga => (
                                    <div
                                        key={liga.id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <button
                                            className="btn btn-link text-decoration-none text-dark fw-bold p-0"
                                            onClick={() => onSeleccionarLiga(liga)}
                                        >
                                            {liga.nombre}
                                            <span className="text-muted ms-2">
                                                ({liga.pais})
                                            </span>
                                        </button>

                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => onAlternarFavorito(liga.id)}
                                        >
                                            <i className="fa-solid fa-star me-1"></i>
                                            Quitar
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AcordeonFavoritosLigas;