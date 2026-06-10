import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Liga {
    id: number;
    nombre: string;
    pais: string;
}

interface AcordeonPaisesProps {
    paises: string[];
}

function AcordeonPaisesLigas({ paises }: AcordeonPaisesProps) {
    const navigate = useNavigate();
    const [ligasPorPais, setLigasPorPais] = useState<{ [key: string]: Liga[] }>({});

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
            const data = await response.json();
            setLigasPorPais({
                ...ligasPorPais,
                [pais]: data
            });
        }
    }

    function seleccionarLiga(liga: Liga) {
        localStorage.setItem("ligaId", liga.id.toString());
        localStorage.setItem("ligaNombre", liga.nombre);
        localStorage.setItem("ligaPais", liga.pais);

        navigate("/equipos");
    }

    return (
        <div className="accordion shadow-sm" id="accordionPaises">
            {paises.map((pais, index) => {
                const collapseId = `collapsePais${index}`;
                const headingId = `headingPais${index}`;
                const ligas = ligasPorPais[pais] || [];

                return (
                    <div className="accordion-item" key={pais}>
                        <h2 className="accordion-header" id={headingId}>
                            <button
                                className="accordion-button collapsed fw-bold"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${collapseId}`}
                                aria-expanded="false"
                                aria-controls={collapseId}
                                onClick={() => cargarLigas(pais)}
                            >
                                 {pais}
                            </button>
                        </h2>

                        <div
                            id={collapseId}
                            className="accordion-collapse collapse"
                            aria-labelledby={headingId}
                        >
                            <div className="accordion-body">
                                {ligas.length === 0 ? (
                                    <div className="alert alert-info mb-0">
                                        No hay ligas registradas para este país.
                                    </div>
                                ) : (
                                    <div className="list-group">
                                        {ligas.map((liga) => (
                                            <button
                                                key={liga.id}
                                                onClick={() => seleccionarLiga(liga)}
                                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                            >
                                                <span>⚽ {liga.nombre}</span>
                                                <span className="badge bg-success">
                                                    Ver tabla
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default AcordeonPaisesLigas;