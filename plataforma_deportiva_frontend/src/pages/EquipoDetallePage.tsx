import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MissingLigaAlert from "../components/auth/MissingLigaAlert";
import PageHero from "../components/auth/PageHero";
import ResumenEquipo from "../components/equipo/ResumenEquipo";
import TablaPartidosEquipo from "../components/equipo/TablaPartidosEquipo";

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

function EquipoDetallePage() {
    const { idEquipo } = useParams();
    const navigate = useNavigate();

    const [equipo, setEquipo] = useState<Equipo | null>(null);
    const [partidos, setPartidos] = useState<Partido[]>([]);

    const ligaId = localStorage.getItem("ligaId");
    const ligaNombre = localStorage.getItem("ligaNombre");

    async function cargarEquipo() {
        if (!ligaId || !idEquipo) {
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
            const equipos: Equipo[] = await response.json();
            const equipoEncontrado = equipos.find(e => e.id === Number(idEquipo));

            if (equipoEncontrado) {
                setEquipo(equipoEncontrado);
            }
        }
    }

    async function cargarPartidosEquipo() {
        if (!idEquipo) {
            return;
        }

        const response = await fetch("http://localhost:8080/api/partidos/equipo/" + idEquipo, {
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
        cargarEquipo();
        cargarPartidosEquipo();
    }, []);

    if (!ligaId) {
        return <MissingLigaAlert />;
    }

    if (!equipo) {
        return (
            <section className="container py-4">
                <div className="alert alert-warning">
                    No se encontró información del equipo seleccionado.
                </div>
            </section>
        );
    }

    return (
        <section className="container py-4">
            <PageHero
                titulo={equipo.nombre}
                descripcion={`Resumen estadístico y partidos del equipo en la ${ligaNombre}.`}
                badgeTexto="Detalle del equipo"
                badgeIcono="fa-solid fa-shield-halved"
            />

            <button
                className="btn btn-outline-light mb-4"
                onClick={() => navigate("/equipos")}
            >
                <i className="fa-solid fa-arrow-left me-2"></i>
                Volver a la tabla
            </button>

            <ResumenEquipo equipo={equipo} />

            <TablaPartidosEquipo
                partidos={partidos}
                nombreEquipo={equipo.nombre}
            />
        </section>
    );
}

export default EquipoDetallePage;