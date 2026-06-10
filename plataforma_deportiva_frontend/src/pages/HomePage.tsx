import { useEffect, useState } from "react";
import AcordeonPaisesLigas from "../components/AcordeonPaisesLigas";

function HomePage() {
    const [paises, setPaises] = useState<string[]>([]);

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

    useEffect(() => {
        cargarPaises();
    }, []);

    return (
        <section className="container py-4">
            <div className="hero-football mb-4">
                <h1 className="fw-bold mb-2">Seguimiento de fútbol</h1>
                <p className="mb-0">
                    Seleccione un país para consultar sus ligas, equipos, estadísticas y jornadas.
                </p>
            </div>

            <h2 className="section-title mb-2">Países disponibles</h2>
            <p className="text-muted">
                Abra un país para ver sus ligas registradas.
            </p>

            <AcordeonPaisesLigas paises={paises} />
        </section>
    );
}

export default HomePage;