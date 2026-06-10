import { useEffect, useState } from "react";
import AcordeonPaisesLigas from "../components/home/AcordeonPaisesLigas";
import PageHero from "../components/auth/PageHero";

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
            <PageHero
                titulo="Seguimiento de fútbol"
                descripcion="Seleccione un país para consultar sus ligas, equipos, estadísticas y jornadas."
            />

            <h2 className="section-title mb-2">Países disponibles</h2>

            <AcordeonPaisesLigas paises={paises} />
        </section>
    );
}

export default HomePage;