import { useEffect, useState } from "react";

interface Liga {
    id: number;
    nombre: string;
    pais: string;
}

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

function AdminPage() {
    const [paises, setPaises] = useState<string[]>([]);
    const [ligas, setLigas] = useState<Liga[]>([]);
    const [equipos, setEquipos] = useState<Equipo[]>([]);

    const [paisSeleccionado, setPaisSeleccionado] = useState("");
    const [ligaSeleccionada, setLigaSeleccionada] = useState("");

    const [nuevoPaisLiga, setNuevoPaisLiga] = useState("");
    const [nuevoNombreLiga, setNuevoNombreLiga] = useState("");
    const [nuevoEquipo, setNuevoEquipo] = useState("");

    const [mensaje, setMensaje] = useState("");

    const gmail = localStorage.getItem("gmail");

    async function cargarPaises() {
        const response = await fetch("http://localhost:8080/api/ligas/paises", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            })
        });

        if (response.ok) {
            setPaises(await response.json());
        }
    }

    async function cargarLigas(pais: string) {
        setPaisSeleccionado(pais);
        setLigaSeleccionada("");
        setEquipos([]);

        if (!pais) {
            setLigas([]);
            return;
        }

        const response = await fetch("http://localhost:8080/api/ligas/pais/" + pais, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            })
        });

        if (response.ok) {
            setLigas(await response.json());
        }
    }

    async function cargarEquipos(idLiga: string) {
        setLigaSeleccionada(idLiga);

        if (!idLiga) {
            setEquipos([]);
            return;
        }

        const response = await fetch("http://localhost:8080/api/equipos/liga/" + idLiga, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            })
        });

        if (response.ok) {
            setEquipos(await response.json());
        }
    }

    async function agregarLiga() {
        if (!nuevoNombreLiga.trim() || !nuevoPaisLiga.trim()) {
            setMensaje("Debe ingresar el nombre de la liga y el país.");
            return;
        }

        const response = await fetch("http://localhost:8080/api/admin/ligas", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "X-Usuario-Gmail": gmail || ""
            }),
            body: JSON.stringify({
                nombre: nuevoNombreLiga,
                pais: nuevoPaisLiga
            })
        });

        const texto = await response.text();
        setMensaje(texto);

        if (response.ok) {
            setNuevoNombreLiga("");
            setNuevoPaisLiga("");
            cargarPaises();
        }
    }

    async function agregarEquipo() {
        if (!ligaSeleccionada) {
            setMensaje("Debe seleccionar una liga.");
            return;
        }

        if (!nuevoEquipo.trim()) {
            setMensaje("Debe ingresar el nombre del equipo.");
            return;
        }

        const response = await fetch("http://localhost:8080/api/admin/liga/" + ligaSeleccionada + "/equipos", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "X-Usuario-Gmail": gmail || ""
            }),
            body: JSON.stringify({
                nombre: nuevoEquipo
            })
        });

        const texto = await response.text();
        setMensaje(texto);

        if (response.ok) {
            setNuevoEquipo("");
            cargarEquipos(ligaSeleccionada);
        }
    }

    async function eliminarEquipo(idEquipo: number) {
        const confirmar = window.confirm("¿Seguro que desea eliminar este equipo? Se eliminarán también los partidos de su liga.");

        if (!confirmar) {
            return;
        }

        const response = await fetch("http://localhost:8080/api/admin/equipos/" + idEquipo, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "X-Usuario-Gmail": gmail || ""
            })
        });

        const texto = await response.text();
        setMensaje(texto);

        if (response.ok && ligaSeleccionada) {
            cargarEquipos(ligaSeleccionada);
        }
    }

    async function reiniciarLiga() {
        if (!ligaSeleccionada) {
            setMensaje("Debe seleccionar una liga.");
            return;
        }

        const confirmar = window.confirm("¿Seguro que desea reiniciar esta liga? Se borrarán sus partidos actuales y se generarán nuevamente.");

        if (!confirmar) {
            return;
        }

        const response = await fetch("http://localhost:8080/api/admin/liga/" + ligaSeleccionada + "/reiniciar", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "X-Usuario-Gmail": gmail || ""
            })
        });

        const texto = await response.text();
        setMensaje(texto);

        if (response.ok) {
            cargarEquipos(ligaSeleccionada);
        }
    }

    async function simularJornada() {
        if (!ligaSeleccionada) {
            setMensaje("Debe seleccionar una liga.");
            return;
        }

        const response = await fetch("http://localhost:8080/api/admin/liga/" + ligaSeleccionada + "/simular-jornada", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "X-Usuario-Gmail": gmail || ""
            })
        });

        const texto = await response.text();
        setMensaje(texto);

        if (response.ok) {
            cargarEquipos(ligaSeleccionada);
        }
    }

    useEffect(() => {
        cargarPaises();
    }, []);

    return (
        <section className="container py-4">
            <div className="hero-football mb-4">
                <span className="badge bg-light text-success mb-3">
                    <i className="fa-solid fa-user-shield me-2"></i>
                    Módulo administrativo
                </span>

                <h1 className="fw-bold mb-2">Panel de administración</h1>

                <p className="mb-0">
                    Gestione ligas, equipos y simulación de jornadas desde un único panel.
                </p>
            </div>

            {mensaje && (
                <div className="alert alert-info shadow-sm">
                    {mensaje}
                </div>
            )}

            <div className="row g-4">
                <div className="col-12 col-lg-4">
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
                                    onChange={e => cargarLigas(e.target.value)}
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
                                    onChange={e => cargarEquipos(e.target.value)}
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
                                    onClick={simularJornada}
                                    disabled={!ligaSeleccionada}
                                >
                                    <i className="fa-solid fa-play me-2"></i>
                                    Simular jornada actual
                                </button>

                                <button
                                    className="btn btn-outline-danger"
                                    onClick={reiniciarLiga}
                                    disabled={!ligaSeleccionada}
                                >
                                    <i className="fa-solid fa-rotate-right me-2"></i>
                                    Reiniciar liga
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="card card-football shadow h-100">
                        <div className="card-body">
                            <h4 className="fw-bold mb-3 text-dark">
                                <i className="fa-solid fa-earth-americas me-2 text-success"></i>
                                Agregar liga
                            </h4>

                            <p className="text-muted">
                                El país se guarda directamente dentro de la liga. Si el país no existe, aparecerá como nuevo país en la lista.
                            </p>

                            <div className="mb-3">
                                <label className="form-label text-dark">País</label>
                                <input
                                    className="form-control"
                                    value={nuevoPaisLiga}
                                    onChange={e => setNuevoPaisLiga(e.target.value)}
                                    placeholder="Ejemplo: Costa Rica"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-dark">Nombre de la liga</label>
                                <input
                                    className="form-control"
                                    value={nuevoNombreLiga}
                                    onChange={e => setNuevoNombreLiga(e.target.value)}
                                    placeholder="Ejemplo: Primera División"
                                />
                            </div>

                            <button
                                className="btn btn-football w-100"
                                onClick={agregarLiga}
                            >
                                <i className="fa-solid fa-plus me-2"></i>
                                Agregar liga
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="card card-football shadow h-100">
                        <div className="card-body">
                            <h4 className="fw-bold mb-3 text-dark">
                                <i className="fa-solid fa-shield-halved me-2 text-success"></i>
                                Agregar equipo
                            </h4>

                            <p className="text-muted">
                                Seleccione una liga y agregue nuevos equipos. Luego reinicie la liga para actualizar el calendario.
                            </p>

                            <div className="mb-3">
                                <label className="form-label text-dark">Nombre del equipo</label>
                                <input
                                    className="form-control"
                                    value={nuevoEquipo}
                                    onChange={e => setNuevoEquipo(e.target.value)}
                                    placeholder="Ejemplo: Saprissa"
                                    disabled={!ligaSeleccionada}
                                />
                            </div>

                            <button
                                className="btn btn-football w-100"
                                onClick={agregarEquipo}
                                disabled={!ligaSeleccionada}
                            >
                                <i className="fa-solid fa-plus me-2"></i>
                                Agregar equipo
                            </button>
                        </div>
                    </div>
                </div>
            </div>

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
                                                onClick={() => eliminarEquipo(equipo.id)}
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
        </section>
    );
}

export default AdminPage;