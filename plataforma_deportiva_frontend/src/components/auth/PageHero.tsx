interface PageHeroProps {
    titulo: string;
    descripcion?: string;
    badgeTexto?: string;
    badgeIcono?: string;
}

function PageHero({ titulo, descripcion, badgeTexto, badgeIcono }: PageHeroProps) {
    return (
        <div className="hero-football mb-4">
            {badgeTexto && (
                <span className="badge bg-light text-success mb-3">
                    {badgeIcono && <i className={`${badgeIcono} me-2`}></i>}
                    {badgeTexto}
                </span>
            )}

            <h1 className="fw-bold mb-2">{titulo}</h1>

            {descripcion && (
                <p className="mb-0">
                    {descripcion}
                </p>
            )}
        </div>
    );
}

export default PageHero;