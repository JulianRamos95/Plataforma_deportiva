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

interface ResumenEquipoProps {
    equipo: Equipo;
}

function ResumenEquipo({ equipo }: ResumenEquipoProps) {
    const diferenciaGoles = equipo.golesFavor - equipo.golesContra;

    return (
        <div className="row g-4 mb-4">
            <div className="col-12 col-md-6 col-lg-3">
                <div className="card card-football shadow h-100">
                    <div className="card-body text-center">
                        <i className="fa-solid fa-star text-success fs-2 mb-3"></i>
                        <h5 className="text-dark fw-bold">Puntos</h5>
                        <h2 className="text-success fw-bold mb-0">{equipo.puntos}</h2>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
                <div className="card card-football shadow h-100">
                    <div className="card-body text-center">
                        <i className="fa-solid fa-futbol text-success fs-2 mb-3"></i>
                        <h5 className="text-dark fw-bold">Goles anotados</h5>
                        <h2 className="text-success fw-bold mb-0">{equipo.golesFavor}</h2>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
                <div className="card card-football shadow h-100">
                    <div className="card-body text-center">
                        <i className="fa-solid fa-shield text-success fs-2 mb-3"></i>
                        <h5 className="text-dark fw-bold">Goles recibidos</h5>
                        <h2 className="text-success fw-bold mb-0">{equipo.golesContra}</h2>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
                <div className="card card-football shadow h-100">
                    <div className="card-body text-center">
                        <i className="fa-solid fa-chart-line text-success fs-2 mb-3"></i>
                        <h5 className="text-dark fw-bold">Diferencia</h5>
                        <h2 className="text-success fw-bold mb-0">
                            {diferenciaGoles > 0 ? `+${diferenciaGoles}` : diferenciaGoles}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card tabla-liga-card shadow">
                    <div className="card-body">
                        <h4 className="fw-bold text-dark mb-3">
                            <i className="fa-solid fa-chart-simple me-2 text-success"></i>
                            Rendimiento general
                        </h4>

                        <div className="table-responsive">
                            <table className="table tabla-liga align-middle mb-0">
                                <thead>
                                <tr>
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
                                <tr>
                                    <td className="text-center">{equipo.partidosJugados}</td>
                                    <td className="text-center">{equipo.partidosGanados}</td>
                                    <td className="text-center">{equipo.partidosEmpatados}</td>
                                    <td className="text-center">{equipo.partidosPerdidos}</td>
                                    <td className="text-center">{equipo.golesFavor}</td>
                                    <td className="text-center">{equipo.golesContra}</td>
                                    <td className="text-center">
                                        {diferenciaGoles > 0 ? `+${diferenciaGoles}` : diferenciaGoles}
                                    </td>
                                    <td className="text-center">
                                        <span className="badge puntos-badge">
                                            {equipo.puntos}
                                        </span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumenEquipo;