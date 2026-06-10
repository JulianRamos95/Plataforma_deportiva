import { useEffect, useState } from "react";
import CardPais from "../components/CardPais";
import ListaLigas from "../components/ListaLigas";

interface Liga {
    id: number;
    nombre: string;
    pais: string;
}

function HomePage() {
    const [paises, setPaises] = useState<string[]>([]);
    const [ligas, setLigas] = useState<Liga[]>([]);
    const [paisSeleccionado, setPaisSeleccionado] = useState("");

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

    async function seleccionarPais(pais: string) {
        setPaisSeleccionado(pais);

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

    useEffect(() => {
        cargarPaises();
    }, []);

    return (
        <section className="container py-4">
            <h2 className="fw-bold mb-2">Países</h2>
            <p className="text-muted">
                Seleccione un país para ver las ligas registradas.
            </p>

            <div className="row">
                {paises.map((pais) => (
                    <CardPais
                        key={pais}
                        pais={pais}
                        seleccionado={paisSeleccionado === pais}
                        onSeleccionar={seleccionarPais}
                    />
                ))}
            </div>

            <ListaLigas ligas={ligas} />
        </section>
    );
}

export default HomePage;