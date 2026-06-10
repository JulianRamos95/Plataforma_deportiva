import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    function calcularDiferencia(equipo: Equipo) {
        return equipo.golesFavor - equipo.golesContra;
    }

    function abrirDetalleEquipo(idEquipo: number) {
        navigate("/equipo/" + idEquipo);
    }

    return (
        <div className="card tabla-liga-card shadow">
            <div className="table-responsive">
                <table className="table tabla-liga align-middle mb-0">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Equipo</th>
                        <th className="text-center">PJ</th>
                        <th className="text-center">PG</th>
                        <th className="text-center">PE</th>
                        <th className="text-center">PP</th>
                        <th className="text-center">GF</th>
                        <th className="text-center">GC</th>
                        <th className="text-center">DG</th>
                        <th className="text-center">PTS</th>
                    </tr>
                    </thead>

                    <tbody>
                    {equipos.map((equipo, index) => (
                        <tr
                            key={equipo.id}
                            onClick={() => abrirDetalleEquipo(equipo.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <td className="posicion-col">{index + 1}</td>

                            <td className="fw-bold equipo-nombre">
                                <i className="fa-solid fa-shield-halved me-2 text-success"></i>
                                {equipo.nombre}
                            </td>

                            <td className="text-center">{equipo.partidosJugados}</td>
                            <td className="text-center">{equipo.partidosGanados}</td>
                            <td className="text-center">{equipo.partidosEmpatados}</td>
                            <td className="text-center">{equipo.partidosPerdidos}</td>
                            <td className="text-center">{equipo.golesFavor}</td>
                            <td className="text-center">{equipo.golesContra}</td>

                            <td className="text-center">
                                {calcularDiferencia(equipo) > 0
                                    ? `+${calcularDiferencia(equipo)}`
                                    : calcularDiferencia(equipo)}
                            </td>

                            <td className="text-center">
                                <span className="badge puntos-badge">
                                    {equipo.puntos}
                                </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TablaEquipos;