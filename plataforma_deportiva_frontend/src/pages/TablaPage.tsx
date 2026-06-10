import { useEffect, useState } from "react";
import TablaEquipos from "../components/TablaEquipos";

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

function TablaPage() {
    const [equipos, setEquipos] = useState<Equipo[]>([]);
    const ligaId = localStorage.getItem("ligaId");
    const ligaNombre = localStorage.getItem("ligaNombre");

    async function cargarEquipos() {
        if (!ligaId) {
            return;
        }

        const response = await fetch("http://localhost:8080/api/equipos/liga/" + ligaId, {
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

    useEffect(() => {
        cargarEquipos();
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
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className="section-title mb-1">Tabla de posiciones</h2>
                    <p className="text-muted mb-0">Liga seleccionada: {ligaNombre}</p>
                </div>
            </div>

            <TablaEquipos equipos={equipos} />
        </section>
    );
}

export default TablaPage;