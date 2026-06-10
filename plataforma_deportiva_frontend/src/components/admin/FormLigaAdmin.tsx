interface FormLigaAdminProps {
    nuevoPaisLiga: string;
    nuevoNombreLiga: string;
    setNuevoPaisLiga: (pais: string) => void;
    setNuevoNombreLiga: (nombre: string) => void;
    onAgregarLiga: () => void;
}

function FormLigaAdmin({
                           nuevoPaisLiga,
                           nuevoNombreLiga,
                           setNuevoPaisLiga,
                           setNuevoNombreLiga,
                           onAgregarLiga
                       }: FormLigaAdminProps) {
    return (
        <div className="card card-football shadow h-100">
            <div className="card-body">
                <h4 className="fw-bold mb-3 text-dark">
                    <i className="fa-solid fa-earth-americas me-2 text-success"></i>
                    Agregar liga
                </h4>

                <p className="text-muted">
                    El país se guarda directamente dentro de la liga. Si el país no existe,
                    aparecerá como nuevo país en la lista.
                </p>

                <div className="mb-3">
                    <label className="form-label text-dark">País</label>
                    <input
                        className="form-control"
                        value={nuevoPaisLiga}
                        onChange={e => setNuevoPaisLiga(e.target.value)}
                        placeholder="Ejemplo: Costa Rica"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label text-dark">Nombre de la liga</label>
                    <input
                        className="form-control"
                        value={nuevoNombreLiga}
                        onChange={e => setNuevoNombreLiga(e.target.value)}
                        placeholder="Ejemplo: Primera División"
                    />
                </div>

                <button
                    className="btn btn-football w-100"
                    onClick={onAgregarLiga}
                >
                    <i className="fa-solid fa-plus me-2"></i>
                    Agregar liga
                </button>
            </div>
        </div>
    );
}

export default FormLigaAdmin;