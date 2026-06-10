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
            <div className="alert alert-warning text-center">
                No hay partidos registrados para esta jornada.
            </div>
        );
    }

    return (
        <div className="card shadow partido-card">
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0 tabla-partidos">
                        <tbody>
                        {partidos.map((partido) => (
                            <tr key={partido.id}>
                                <td className="text-center fw-bold equipo-col">
                                    {partido.equipoLocal}
                                </td>

                                <td className="text-center resultado-col">
                                    {partido.golesLocal === null || partido.golesVisitante === null
                                        ? "VS"
                                        : `${partido.golesLocal} - ${partido.golesVisitante}`}
                                </td>

                                <td className="text-center fw-bold equipo-col">
                                    {partido.equipoVisitante}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TablaPartidos;