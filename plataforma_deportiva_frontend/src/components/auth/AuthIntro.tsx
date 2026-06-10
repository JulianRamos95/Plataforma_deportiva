interface AuthIntroProps {
    badgeTexto: string;
    titulo: string;
    descripcion: string;
}

function AuthIntro({ badgeTexto, titulo, descripcion }: AuthIntroProps) {
    return (
        <div className="login-intro">
            <span className="badge bg-success mb-3">
                <i className="fa-solid fa-futbol me-2"></i>
                {badgeTexto}
            </span>

            <h1 className="fw-bold mb-3">
                {titulo}
            </h1>

            <p className="lead mb-4">
                {descripcion}
            </p>

            <div className="row g-3">
                <div className="col-12 col-md-6">
                    <div className="feature-box">
                        <i className="fa-solid fa-table-list"></i>
                        <span>Tablas de posiciones</span>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="feature-box">
                        <i className="fa-solid fa-calendar-days"></i>
                        <span>Jornadas y partidos</span>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="feature-box">
                        <i className="fa-solid fa-chart-simple"></i>
                        <span>Estadísticas de equipos</span>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="feature-box">
                        <i className="fa-solid fa-globe"></i>
                        <span>Ligas por país</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthIntro;