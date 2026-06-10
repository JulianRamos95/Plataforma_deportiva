interface FormEquipoAdminProps {
    nuevoEquipo: string;
    ligaSeleccionada: string;
    setNuevoEquipo: (nombre: string) => void;
    onAgregarEquipo: () => void;
}

function FormEquipoAdmin({
                             nuevoEquipo,
                             ligaSeleccionada,
                             setNuevoEquipo,
                             onAgregarEquipo
                         }: FormEquipoAdminProps) {
    return (
        <div className="card card-football shadow h-100">
            <div className="card-body">
                <h4 className="fw-bold mb-3 text-dark">
                    <i className="fa-solid fa-shield-halved me-2 text-success"></i>
                    Agregar equipo
                </h4>

                <p className="text-muted">
                    Seleccione una liga y agregue nuevos equipos. Luego reinicie la liga
                    para actualizar el calendario.
                </p>

                <div className="mb-3">
                    <label className="form-label text-dark">Nombre del equipo</label>
                    <input
                        className="form-control"
                        value={nuevoEquipo}
                        onChange={e => setNuevoEquipo(e.target.value)}
                        placeholder="Ejemplo: Saprissa"
                        disabled={!ligaSeleccionada}
                    />
                </div>

                <button
                    className="btn btn-football w-100"
                    onClick={onAgregarEquipo}
                    disabled={!ligaSeleccionada}
                >
                    <i className="fa-solid fa-plus me-2"></i>
                    Agregar equipo
                </button>
            </div>
        </div>
    );
}

export default FormEquipoAdmin;