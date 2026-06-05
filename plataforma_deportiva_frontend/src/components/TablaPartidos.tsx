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

interface TablaPartidosProps {
    partidos: Partido[];
}

function TablaPartidos({ partidos }: TablaPartidosProps) {
    if (partidos.length === 0) {
        return (
            <div className="alert alert-warning">
                No hay partidos registrados para esta liga.
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                <tr>
                    <th>Jornada</th>
                    <th>Fecha</th>
                    <th>Local</th>
                    <th>Resultado</th>
                    <th>Visitante</th>
                    <th>Estado</th>
                </tr>
                </thead>
                <tbody>
                {partidos.map((partido) => (
                    <tr key={partido.id}>
                        <td>{partido.jornada}</td>
                        <td>{partido.fecha}</td>
                        <td className="fw-bold">{partido.equipoLocal}</td>
                        <td>
                            {partido.golesLocal === null || partido.golesVisitante === null
                                ? "-"
                                : `${partido.golesLocal} - ${partido.golesVisitante}`}
                        </td>
                        <td className="fw-bold">{partido.equipoVisitante}</td>
                        <td>
                                <span className="badge bg-primary">
                                    {partido.estado}
                                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaPartidos;