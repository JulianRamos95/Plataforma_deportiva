interface CardPaisProps {
    pais: string;
    seleccionado: boolean;
    onSeleccionar: (pais: string) => void;
}

function CardPais({ pais, seleccionado, onSeleccionar }: CardPaisProps) {
    return (
        <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className={`card h-100 shadow-sm ${seleccionado ? "border-primary" : ""}`}>
                <div className="card-body">
                    <h5 className="card-title">{pais}</h5>
                    <p className="card-text text-muted">
                        Consulte las ligas registradas para este país.
                    </p>
                    <button onClick={() => onSeleccionar(pais)} className="btn btn-primary w-100">
                        Ver ligas
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardPais;