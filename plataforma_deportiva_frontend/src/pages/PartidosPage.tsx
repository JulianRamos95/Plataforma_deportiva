import { useEffect, useState } from "react";
import TablaPartidos from "../components/partidos/TablaPartidos";
import PageHero from "../components/auth/PageHero";
import MissingLigaAlert from "../components/auth/MissingLigaAlert";
import JornadaSelector from "../components/partidos/JornadaSelector";

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
    const [jornada, setJornada] = useState(1);
    const [maxJornadas, setMaxJornadas] = useState(18);

    const ligaId = localStorage.getItem("ligaId");
    const ligaNombre = localStorage.getItem("ligaNombre");

    async function cargarPartidos(jornadaActual: number) {
        if (!ligaId) {
            return;
        }

        const response = await fetch(
            "http://localhost:8080/api/partidos/liga/" + ligaId + "/jornada/" + jornadaActual,
            {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                })
            }
        );

        if (response.ok) {
            setPartidos(await response.json());
        }
    }

    async function calcularMaxJornadas() {
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
            const equipos = await response.json();
            setMaxJornadas((equipos.length - 1) * 2);
        }
    }

    async function cargarJornadaProximaAJugar() {
        if (!ligaId) {
            return;
        }

        const response = await fetch("http://localhost:8080/api/partidos/liga/" + ligaId, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            })
        });

        if (response.ok) {
            const todosPartidos: Partido[] = await response.json();

            if (todosPartidos.length === 0) {
                setJornada(1);
                setPartidos([]);
                return;
            }

            let jornadaProxima = todosPartidos[todosPartidos.length - 1].jornada;

            for (let i = 0; i < todosPartidos.length; i++) {
                if (todosPartidos[i].estado === "Programado") {
                    jornadaProxima = todosPartidos[i].jornada;
                    break;
                }
            }

            setJornada(jornadaProxima);
            cargarPartidos(jornadaProxima);
        }
    }

    function jornadaAnterior() {
        if (jornada > 1) {
            const nuevaJornada = jornada - 1;
            setJornada(nuevaJornada);
            cargarPartidos(nuevaJornada);
        }
    }

    function jornadaSiguiente() {
        if (jornada < maxJornadas) {
            const nuevaJornada = jornada + 1;
            setJornada(nuevaJornada);
            cargarPartidos(nuevaJornada);
        }
    }

    useEffect(() => {
        calcularMaxJornadas();
        cargarJornadaProximaAJugar();
    }, []);

    if (!ligaId) {
        return <MissingLigaAlert />;
    }

    return (
        <section className="container py-4">
            <PageHero
                titulo={`Partidos de la ${ligaNombre}`}
                descripcion="Consulte la jornada actual, jornadas anteriores y próximas jornadas."
            />

            <JornadaSelector
                jornada={jornada}
                maxJornadas={maxJornadas}
                onAnterior={jornadaAnterior}
                onSiguiente={jornadaSiguiente}
            />

            <TablaPartidos partidos={partidos} />
        </section>
    );
}

export default PartidosPage;