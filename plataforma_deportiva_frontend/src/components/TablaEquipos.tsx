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

interface TablaEquiposProps {
    equipos: Equipo[];
}

function TablaEquipos({ equipos }: TablaEquiposProps) {
    if (equipos.length === 0) {
        return (
            <div className="alert alert-warning">
                No hay equipos registrados para esta liga.
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                <tr>
                    <th>Equipo</th>
                    <th>PJ</th>
                    <th>PG</th>
                    <th>PE</th>
                    <th>PP</th>
                    <th>GF</th>
                    <th>GC</th>
                    <th>PTS</th>
                </tr>
                </thead>
                <tbody>
                {equipos.map((equipo) => (
                    <tr key={equipo.id}>
                        <td className="fw-bold">{equipo.nombre}</td>
                        <td>{equipo.partidosJugados}</td>
                        <td>{equipo.partidosGanados}</td>
                        <td>{equipo.partidosEmpatados}</td>
                        <td>{equipo.partidosPerdidos}</td>
                        <td>{equipo.golesFavor}</td>
                        <td>{equipo.golesContra}</td>
                        <td className="fw-bold">{equipo.puntos}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaEquipos;