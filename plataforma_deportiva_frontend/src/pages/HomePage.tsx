import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AcordeonPaisesLigas from "../components/home/AcordeonPaisesLigas";
import AcordeonFavoritosLigas from "../components/home/AcordeonFavoritosLiga";
import PageHero from "../components/auth/PageHero";

interface Liga {
    id: number;
    nombre: string;
    pais: string;
}

function HomePage() {
    const navigate = useNavigate();

    const [paises, setPaises] = useState<string[]>([]);
    const [favoritos, setFavoritos] = useState<Liga[]>([]);
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

    async function cargarFavoritos() {
        const response = await fetch("http://localhost:8080/api/favoritos", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "X-Usuario-Gmail": gmail || ""
            })
        });

        if (response.ok) {
            setFavoritos(await response.json());
        }
    }

    async function alternarFavorito(idLiga: number) {
        const response = await fetch("http://localhost:8080/api/favoritos/liga/" + idLiga + "/alternar", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "X-Usuario-Gmail": gmail || ""
            })
        });

        const texto = await response.text();
        setMensaje(texto);

        if (response.ok) {
            cargarFavoritos();
        }
    }

    function seleccionarLiga(liga: Liga) {
        localStorage.setItem("ligaId", String(liga.id));
        localStorage.setItem("ligaNombre", liga.nombre);

        navigate("/equipos");
    }

    function obtenerIdsFavoritos() {
        return favoritos.map(liga => liga.id);
    }

    useEffect(() => {
        cargarPaises();
        cargarFavoritos();
    }, []);

    return (
        <section className="container py-4">
            <PageHero
                titulo="Seguimiento de fútbol"
                descripcion="Seleccione un país para consultar sus ligas, equipos, estadísticas y jornadas."
            />

            {mensaje && (
                <div className="alert alert-info shadow-sm">
                    {mensaje}
                </div>
            )}

            <h2 className="section-title mb-2">Ligas favoritas</h2>

            <AcordeonFavoritosLigas
                ligas={favoritos}
                onSeleccionarLiga={seleccionarLiga}
                onAlternarFavorito={alternarFavorito}
            />

            <h2 className="section-title mb-2">Países disponibles</h2>

            <AcordeonPaisesLigas
                paises={paises}
                ligasFavoritasIds={obtenerIdsFavoritos()}
                onSeleccionarLiga={seleccionarLiga}
                onAlternarFavorito={alternarFavorito}
            />
        </section>
    );
}

export default HomePage;