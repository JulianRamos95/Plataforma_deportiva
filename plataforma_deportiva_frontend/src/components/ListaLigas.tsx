import { useNavigate } from "react-router-dom";

interface Liga {
    id: number;
    nombre: string;
    pais: string;
}

interface ListaLigasProps {
    ligas: Liga[];
}

function ListaLigas({ ligas }: ListaLigasProps) {
    const navigate = useNavigate();

    function seleccionarLiga(liga: Liga) {
        localStorage.setItem("ligaId", liga.id.toString());
        localStorage.setItem("ligaNombre", liga.nombre);
        navigate("/liga");
    }

    if (ligas.length === 0) {
        return (
            <div className="alert alert-info mt-3">
                Seleccione un deporte para visualizar sus ligas.
            </div>
        );
    }

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-header bg-primary text-white">
                Ligas disponibles
            </div>
            <div className="list-group list-group-flush">
                {ligas.map((liga) => (
                    <button
                        key={liga.id}
                        onClick={() => seleccionarLiga(liga)}
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    >
                        <span>{liga.nombre}</span>
                        <span className="badge bg-secondary">{liga.pais}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ListaLigas;