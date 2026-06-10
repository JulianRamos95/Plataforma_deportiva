interface CardPaisProps {
    pais: string;
    seleccionado: boolean;
    onSeleccionar: (pais: string) => void;
}

function CardPais({ pais, seleccionado, onSeleccionar }: CardPaisProps) {
    return (
        <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className={`card card-football h-100 ${seleccionado ? "border border-success border-2" : ""}`}>
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="card-title mb-0">🌍 {pais}</h5>
                        <span className="badge bg-success">País</span>
                    </div>

                    <p className="card-text text-muted">
                        Consulte las ligas de fútbol registradas en este país.
                    </p>

                    <button onClick={() => onSeleccionar(pais)} className="btn btn-football w-100">
                        Ver ligas
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardPais;