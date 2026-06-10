import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface AuthCardProps {
    icon: string;
    titulo: string;
    subtitulo: string;
    botonTexto: string;
    botonIcono: string;
    linkTexto: string;
    linkTo: string;
    linkLabel: string;
    onSubmit: () => void;
    children: ReactNode;
}

function AuthCard({
                      icon,
                      titulo,
                      subtitulo,
                      botonTexto,
                      botonIcono,
                      linkTexto,
                      linkTo,
                      linkLabel,
                      onSubmit,
                      children
                  }: AuthCardProps) {
    return (
        <div className="card login-card shadow">
            <div className="card-body p-4">
                <div className="text-center mb-4">
                    <div className="login-icon mb-3">
                        <i className={icon}></i>
                    </div>

                    <h3 className="fw-bold mb-1">{titulo}</h3>
                    <p className="text-muted mb-0">{subtitulo}</p>
                </div>

                {children}

                <button onClick={onSubmit} className="btn btn-football w-100 py-2">
                    <i className={`${botonIcono} me-2`}></i>
                    {botonTexto}
                </button>

                <p className="text-center mt-3 mb-0">
                    {linkTexto} <Link to={linkTo}>{linkLabel}</Link>
                </p>
            </div>
        </div>
    );
}

export default AuthCard;