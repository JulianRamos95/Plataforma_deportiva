interface Equipo {
    id: number;
    nombre: string;
    partidosJugados: number;
    partidosGanados: number;
    partidosEmpatados: number;
    partidosPerdidos: number;
    golesFavor: number;
    golesContra: number;
    puntos: number;
}

interface TablaEquiposAdminProps {
    equipos: Equipo[];
    onEliminarEquipo: (idEquipo: number) => void;
}

function TablaEquiposAdmin({ equipos, onEliminarEquipo }: TablaEquiposAdminProps) {
    return (
        <div className="card tabla-liga-card shadow mt-4">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h4 className="fw-bold text-dark mb-1">
                            Equipos de la liga seleccionada
                        </h4>
                        <p className="text-muted mb-0">
                            Desde aquí puede eliminar equipos de la liga actual.
                        </p>
                    </div>
                </div>

                {equipos.length === 0 ? (
                    <div className="alert alert-warning mb-0">
                        No hay equipos para mostrar o no se ha seleccionado una liga.
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table align-middle tabla-liga mb-0">
                            <thead>
                            <tr>
                                <th>Equipo</th>
                                <th className="text-center">PJ</th>
                                <th className="text-center">PTS</th>
                                <th className="text-center">Acción</th>
                            </tr>
                            </thead>

                            <tbody>
                            {equipos.map(equipo => (
                                <tr key={equipo.id}>
                                    <td className="fw-bold equipo-nombre">
                                        <i className="fa-solid fa-shield-halved me-2 text-success"></i>
                                        {equipo.nombre}
                                    </td>

                                    <td className="text-center">
                                        {equipo.partidosJugados}
                                    </td>

                                    <td className="text-center">
                                        <span className="badge puntos-badge">
                                            {equipo.puntos}
                                        </span>
                                    </td>

                                    <td className="text-center">
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => onEliminarEquipo(equipo.id)}
                                        >
                                            <i className="fa-solid fa-trash me-1"></i>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TablaEquiposAdmin;