interface JornadaSelectorProps {
    jornada: number;
    maxJornadas: number;
    onAnterior: () => void;
    onSiguiente: () => void;
}

function JornadaSelector({
                             jornada,
                             maxJornadas,
                             onAnterior,
                             onSiguiente
                         }: JornadaSelectorProps) {
    return (
        <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
            <button
                className="btn btn-outline-light"
                onClick={onAnterior}
                disabled={jornada === 1}
            >
                <i className="fa-solid fa-chevron-left"></i>
            </button>

            <h3 className="text-white fw-bold mb-0">
                Jornada {jornada}
            </h3>

            <button
                className="btn btn-outline-light"
                onClick={onSiguiente}
                disabled={jornada === maxJornadas}
            >
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
}

export default JornadaSelector;