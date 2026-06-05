import { useEffect, useState } from "react";
import CardDeporte from "../components/CardDeporte";
import ListaLigas from "../components/ListaLigas";

interface Deporte {
    id: number;
    nombre: string;
    descripcion: string;
}

interface Liga {
    id: number;
    nombre: string;
    pais: string;
}

function HomePage() {
    const [deportes, setDeportes] = useState<Deporte[]>([]);
    const [ligas, setLigas] = useState<Liga[]>([]);
    const [deporteSeleccionado, setDeporteSeleccionado] = useState(0);

    async function cargarDeportes() {
        const response = await fetch("http://localhost:8080/api/deportes", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            })
        });

        if (response.ok) {
            setDeportes(await response.json());
        }
    }

    async function seleccionarDeporte(id: number) {
        setDeporteSeleccionado(id);

        const response = await fetch("http://localhost:8080/api/ligas/deporte/" + id, {
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
        cargarDeportes();
    }, []);

    return (
        <section className="container py-4">
            <h2 className="fw-bold mb-2">Deportes</h2>
            <p className="text-muted">Seleccione un deporte para ver las ligas disponibles.</p>

            <div className="row">
                {deportes.map((deporte) => (
                    <CardDeporte
                        key={deporte.id}
                        deporte={deporte}
                        seleccionado={deporteSeleccionado === deporte.id}
                        onSeleccionar={seleccionarDeporte}
                    />
                ))}
            </div>

            <ListaLigas ligas={ligas} />
        </section>
    );
}

export default HomePage;