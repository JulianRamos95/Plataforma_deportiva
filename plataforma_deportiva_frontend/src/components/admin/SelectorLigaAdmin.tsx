interface Liga {
    id: number;
    nombre: string;
    pais: string;
}

interface SelectorLigaAdminProps {
    paises: string[];
    ligas: Liga[];
    paisSeleccionado: string;
    ligaSeleccionada: string;
    onCambiarPais: (pais: string) => void;
    onCambiarLiga: (idLiga: string) => void;
    onSimularJornada: () => void;
    onReiniciarLiga: () => void;
}

function SelectorLigaAdmin({
                               paises,
                               ligas,
                               paisSeleccionado,
                               ligaSeleccionada,
                               onCambiarPais,
                               onCambiarLiga,
                               onSimularJornada,
                               onReiniciarLiga
                           }: SelectorLigaAdminProps) {
    return (
        <div className="card card-football shadow h-100">
            <div className="card-body">
                <h4 className="fw-bold mb-3 text-dark">
                    <i className="fa-solid fa-trophy me-2 text-success"></i>
                    Seleccionar liga
                </h4>

                <div className="mb-3">
                    <label className="form-label text-dark">País</label>
                    <select
                        className="form-select"
                        value={paisSeleccionado}
                        onChange={e => onCambiarPais(e.target.value)}
                    >
                        <option value="">Seleccione un país</option>
                        {paises.map(pais => (
                            <option key={pais} value={pais}>
                                {pais}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label text-dark">Liga</label>
                    <select
                        className="form-select"
                        value={ligaSeleccionada}
                        onChange={e => onCambiarLiga(e.target.value)}
                        disabled={!paisSeleccionado}
                    >
                        <option value="">Seleccione una liga</option>
                        {ligas.map(liga => (
                            <option key={liga.id} value={liga.id}>
                                {liga.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="d-grid gap-2 mt-4">
                    <button
                        className="btn btn-football"
                        onClick={onSimularJornada}
                        disabled={!ligaSeleccionada}
                    >
                        <i className="fa-solid fa-play me-2"></i>
                        Simular jornada actual
                    </button>

                    <button
                        className="btn btn-outline-danger"
                        onClick={onReiniciarLiga}
                        disabled={!ligaSeleccionada}
                    >
                        <i className="fa-solid fa-rotate-right me-2"></i>
                        Reiniciar liga
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SelectorLigaAdmin;