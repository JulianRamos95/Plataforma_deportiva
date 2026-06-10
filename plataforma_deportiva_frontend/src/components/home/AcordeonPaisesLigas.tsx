import { useState } from "react";

interface Liga {
    id: number;
    nombre: string;
    pais: string;
}

interface AcordeonPaisesLigasProps {
    paises: string[];
    ligasFavoritasIds: number[];
    onSeleccionarLiga: (liga: Liga) => void;
    onAlternarFavorito: (idLiga: number) => void;
}

function AcordeonPaisesLigas({
                                 paises,
                                 ligasFavoritasIds,
                                 onSeleccionarLiga,
                                 onAlternarFavorito
                             }: AcordeonPaisesLigasProps) {
    const [ligasPorPais, setLigasPorPais] = useState<Record<string, Liga[]>>({});

    async function cargarLigas(pais: string) {
        if (ligasPorPais[pais]) {
            return;
        }

        const response = await fetch("http://localhost:8080/api/ligas/pais/" + pais, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            })
        });

        if (response.ok) {
            const ligas = await response.json();

            setLigasPorPais({
                ...ligasPorPais,
                [pais]: ligas
            });
        }
    }

    function esFavorita(idLiga: number) {
        return ligasFavoritasIds.includes(idLiga);
    }

    return (
        <div className="accordion" id="acordeonPaises">
            {paises.map((pais, index) => (
                <div className="accordion-item" key={pais}>
                    <h2 className="accordion-header">
                        <button
                            className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#pais-${index}`}
                            onClick={() => cargarLigas(pais)}
                        >
                            {pais}
                        </button>
                    </h2>

                    <div
                        id={`pais-${index}`}
                        className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                        data-bs-parent="#acordeonPaises"
                    >
                        <div className="accordion-body bg-white">
                            {!ligasPorPais[pais] ? (
                                <div className="text-muted">
                                    Cargando ligas...
                                </div>
                            ) : ligasPorPais[pais].length === 0 ? (
                                <div className="alert alert-warning mb-0">
                                    No hay ligas registradas para este país.
                                </div>
                            ) : (
                                <div className="list-group">
                                    {ligasPorPais[pais].map(liga => (
                                        <div
                                            key={liga.id}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            <button
                                                className="btn btn-link text-decoration-none text-dark p-0"
                                                onClick={() => onSeleccionarLiga(liga)}
                                            >
                                                {liga.nombre}
                                            </button>

                                            <button
                                                className={
                                                    esFavorita(liga.id)
                                                        ? "btn btn-sm btn-warning"
                                                        : "btn btn-sm btn-outline-success"
                                                }
                                                onClick={() => onAlternarFavorito(liga.id)}
                                            >
                                                <i className={
                                                    esFavorita(liga.id)
                                                        ? "fa-solid fa-star me-1"
                                                        : "fa-regular fa-star me-1"
                                                }></i>

                                                {esFavorita(liga.id)
                                                    ? "Quitar"
                                                    : "Favorito"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AcordeonPaisesLigas;