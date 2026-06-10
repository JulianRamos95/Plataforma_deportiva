import { useEffect, useState } from "react";
import AdminHero from "../components/admin/AdminHero";
import MensajeAdmin from "../components/admin/MensajeAdmin";
import SelectorLigaAdmin from "../components/admin/SelectorLigaAdmin";
import FormLigaAdmin from "../components/admin/FormLigaAdmin";
import FormEquipoAdmin from "../components/admin/FormEquipoAdmin";
import TablaEquiposAdmin from "../components/admin/TablaEquiposAdmin";

interface Liga {
    id: number;
    nombre: string;
    pais: string;
}

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

function AdminPage() {
    const [paises, setPaises] = useState<string[]>([]);
    const [ligas, setLigas] = useState<Liga[]>([]);
    const [equipos, setEquipos] = useState<Equipo[]>([]);

    const [paisSeleccionado, setPaisSeleccionado] = useState("");
    const [ligaSeleccionada, setLigaSeleccionada] = useState("");

    const [nuevoPaisLiga, setNuevoPaisLiga] = useState("");
    const [nuevoNombreLiga, setNuevoNombreLiga] = useState("");
    const [nuevoEquipo, setNuevoEquipo] = useState("");

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

    async function cargarLigas(pais: string) {
        setPaisSeleccionado(pais);
        setLigaSeleccionada("");
        setEquipos([]);

        if (!pais) {
            setLigas([]);
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
            setLigas(await response.json());
        }
    }

    async function cargarEquipos(idLiga: string) {
        setLigaSeleccionada(idLiga);

        if (!idLiga) {
            setEquipos([]);
            return;
        }

        const response = await fetch("http://localhost:8080/api/equipos/liga/" + idLiga, {
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

    async function agregarLiga() {
        if (!nuevoNombreLiga.trim() || !nuevoPaisLiga.trim()) {
            setMensaje("Debe ingresar el nombre de la liga y el país.");
            return;
        }

        const response = await fetch("http://localhost:8080/api/admin/ligas", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "X-Usuario-Gmail": gmail || ""
            }),
            body: JSON.stringify({
                nombre: nuevoNombreLiga,
                pais: nuevoPaisLiga
            })
        });

        const texto = await response.text();
        setMensaje(texto);

        if (response.ok) {
            setNuevoNombreLiga("");
            setNuevoPaisLiga("");
            cargarPaises();
        }
    }

    async function agregarEquipo() {
        if (!ligaSeleccionada) {
            setMensaje("Debe seleccionar una liga.");
            return;
        }

        if (!nuevoEquipo.trim()) {
            setMensaje("Debe ingresar el nombre del equipo.");
            return;
        }

        const response = await fetch("http://localhost:8080/api/admin/liga/" + ligaSeleccionada + "/equipos", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "X-Usuario-Gmail": gmail || ""
            }),
            body: JSON.stringify({
                nombre: nuevoEquipo
            })
        });

        const texto = await response.text();
        setMensaje(texto);

        if (response.ok) {
            setNuevoEquipo("");
            cargarEquipos(ligaSeleccionada);
        }
    }

    async function eliminarEquipo(idEquipo: number) {
        const confirmar = window.confirm(
            "¿Seguro que desea eliminar este equipo? Se eliminarán también los partidos de su liga."
        );

        if (!confirmar) {
            return;
        }

        const response = await fetch("http://localhost:8080/api/admin/equipos/" + idEquipo, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "X-Usuario-Gmail": gmail || ""
            })
        });

        const texto = await response.text();
        setMensaje(texto);

        if (response.ok && ligaSeleccionada) {
            cargarEquipos(ligaSeleccionada);
        }
    }

    async function reiniciarLiga() {
        if (!ligaSeleccionada) {
            setMensaje("Debe seleccionar una liga.");
            return;
        }

        const confirmar = window.confirm(
            "¿Seguro que desea reiniciar esta liga? Se borrarán sus partidos actuales y se generarán nuevamente."
        );

        if (!confirmar) {
            return;
        }

        const response = await fetch("http://localhost:8080/api/admin/liga/" + ligaSeleccionada + "/reiniciar", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "X-Usuario-Gmail": gmail || ""
            })
        });

        const texto = await response.text();
        setMensaje(texto);

        if (response.ok) {
            cargarEquipos(ligaSeleccionada);
        }
    }

    async function simularJornada() {
        if (!ligaSeleccionada) {
            setMensaje("Debe seleccionar una liga.");
            return;
        }

        const response = await fetch("http://localhost:8080/api/admin/liga/" + ligaSeleccionada + "/simular-jornada", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "X-Usuario-Gmail": gmail || ""
            })
        });

        const texto = await response.text();
        setMensaje(texto);

        if (response.ok) {
            cargarEquipos(ligaSeleccionada);
        }
    }

    useEffect(() => {
        cargarPaises();
    }, []);

    return (
        <section className="container py-4">
            <AdminHero />

            <MensajeAdmin mensaje={mensaje} />

            <div className="row g-4">
                <div className="col-12 col-lg-4">
                    <SelectorLigaAdmin
                        paises={paises}
                        ligas={ligas}
                        paisSeleccionado={paisSeleccionado}
                        ligaSeleccionada={ligaSeleccionada}
                        onCambiarPais={cargarLigas}
                        onCambiarLiga={cargarEquipos}
                        onSimularJornada={simularJornada}
                        onReiniciarLiga={reiniciarLiga}
                    />
                </div>

                <div className="col-12 col-lg-4">
                    <FormLigaAdmin
                        nuevoPaisLiga={nuevoPaisLiga}
                        nuevoNombreLiga={nuevoNombreLiga}
                        setNuevoPaisLiga={setNuevoPaisLiga}
                        setNuevoNombreLiga={setNuevoNombreLiga}
                        onAgregarLiga={agregarLiga}
                    />
                </div>

                <div className="col-12 col-lg-4">
                    <FormEquipoAdmin
                        nuevoEquipo={nuevoEquipo}
                        ligaSeleccionada={ligaSeleccionada}
                        setNuevoEquipo={setNuevoEquipo}
                        onAgregarEquipo={agregarEquipo}
                    />
                </div>
            </div>

            <TablaEquiposAdmin
                equipos={equipos}
                onEliminarEquipo={eliminarEquipo}
            />
        </section>
    );
}

export default AdminPage;