import { useEffect, useState } from "react";
import TablaEquipos from "../components/equipo/TablaEquipos";
import PageHero from "../components/auth/PageHero";
import MissingLigaAlert from "../components/auth/MissingLigaAlert";

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
        return <MissingLigaAlert />;
    }

    return (
        <section className="container py-4">
            <PageHero
                titulo={`Tabla de posiciones de la ${ligaNombre}`}
                descripcion="Consulte el rendimiento de los equipos de la liga seleccionada."
            />

            <TablaEquipos equipos={equipos} />
        </section>
    );
}

export default TablaPage;