interface Deporte {
    id: number;
    nombre: string;
    descripcion: string;
}

interface CardDeporteProps {
    deporte: Deporte;
    seleccionado: boolean;
    onSeleccionar: (id: number) => void;
}

function CardDeporte({ deporte, seleccionado, onSeleccionar }: CardDeporteProps) {
    return (
        <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className={`card h-100 shadow-sm ${seleccionado ? "border-primary" : ""}`}>
                <div className="card-body">
                    <h5 className="card-title">{deporte.nombre}</h5>
                    <p className="card-text text-muted">
                        {deporte.descripcion}
                    </p>
                    <button onClick={() => onSeleccionar(deporte.id)} className="btn btn-primary w-100">
                        Ver ligas
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardDeporte;