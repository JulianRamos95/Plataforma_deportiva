interface Partido {
    id: number;
    equipoLocal: string;
    equipoVisitante: string;
    golesLocal: number | null;
    golesVisitante: number | null;
    jornada: number;
    fecha: string;
    estado: string;
}

interface TablaPartidosEquipoProps {
    partidos: Partido[];
    nombreEquipo: string;
}

function TablaPartidosEquipo({ partidos, nombreEquipo }: TablaPartidosEquipoProps) {
    function mostrarResultado(partido: Partido) {
        if (partido.golesLocal === null || partido.golesVisitante === null) {
            return "vs";
        }

        return `${partido.golesLocal} - ${partido.golesVisitante}`;
    }

    function claseEquipo(nombre: string) {
        if (nombre === nombreEquipo) {
            return "fw-bold text-success";
        }

        return "fw-bold equipo-nombre";
    }

    return (
        <div className="card partido-card shadow mt-4">
            <div className="card-body">
                <h4 className="fw-bold text-dark mb-3">
                    <i className="fa-solid fa-calendar-days me-2 text-success"></i>
                    Partidos del equipo
                </h4>

                {partidos.length === 0 ? (
                    <div className="alert alert-warning mb-0">
                        No hay partidos registrados para este equipo.
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table tabla-partidos align-middle mb-0">
                            <thead>
                            <tr>
                                <th className="text-center">Jornada</th>
                                <th>Local</th>
                                <th className="text-center">Resultado</th>
                                <th>Visitante</th>
                                <th className="text-center">Estado</th>
                            </tr>
                            </thead>

                            <tbody>
                            {partidos.map(partido => (
                                <tr key={partido.id}>
                                    <td className="text-center fw-bold">
                                        Jornada {partido.jornada}
                                    </td>

                                    <td className={claseEquipo(partido.equipoLocal)}>
                                        {partido.equipoLocal}
                                    </td>

                                    <td className="text-center resultado-col">
                                        {mostrarResultado(partido)}
                                    </td>

                                    <td className={claseEquipo(partido.equipoVisitante)}>
                                        {partido.equipoVisitante}
                                    </td>

                                    <td className="text-center">
                                        <span className={
                                            partido.estado === "Finalizado"
                                                ? "badge bg-success"
                                                : "badge bg-secondary"
                                        }>
                                            {partido.estado}
                                        </span>
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

export default TablaPartidosEquipo;