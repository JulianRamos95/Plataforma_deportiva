import { useEffect, useState } from "react";
import TablaPartidos from "../components/TablaPartidos";

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

function PartidosPage() {
    const [partidos, setPartidos] = useState<Partido[]>([]);
    const [jornada, setJornada] = useState("");
    const ligaId = localStorage.getItem("ligaId");
    const ligaNombre = localStorage.getItem("ligaNombre");

    async function cargarPartidos() {
        if (!ligaId) {
            return;
        }

        let url = "http://localhost:8080/api/partidos/liga/" + ligaId;

        if (jornada.trim() !== "") {
            url = "http://localhost:8080/api/partidos/liga/" + ligaId + "/jornada/" + jornada;
        }

        const response = await fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            })
        });

        if (response.ok) {
            setPartidos(await response.json());
        }
    }

    useEffect(() => {
        cargarPartidos();
    }, []);

    if (!ligaId) {
        return (
            <section className="container py-4">
                <div className="alert alert-info">
                    Primero debe seleccionar una liga desde la página principal.
                </div>
            </section>
        );
    }

    return (
        <section className="container py-4">
            <h2 className="fw-bold">Partidos</h2>
            <p className="text-muted">Liga seleccionada: {ligaNombre}</p>

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="row g-2 align-items-end">
                        <div className="col-12 col-md-4">
                            <label className="form-label">Filtrar por jornada</label>
                            <input
                                type="number"
                                className="form-control"
                                value={jornada}
                                onChange={e => setJornada(e.target.value)}
                            />
                        </div>

                        <div className="col-12 col-md-3">
                            <button onClick={cargarPartidos} className="btn btn-primary w-100">
                                Buscar
                            </button>
                        </div>

                        <div className="col-12 col-md-3">
                            <button onClick={() => { setJornada(""); cargarPartidos(); }} className="btn btn-secondary w-100">
                                Ver todos
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <TablaPartidos partidos={partidos} />
        </section>
    );
}

export default PartidosPage;