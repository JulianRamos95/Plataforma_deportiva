interface MensajeAdminProps {
    mensaje: string;
}

function MensajeAdmin({ mensaje }: MensajeAdminProps) {
    if (!mensaje) {
        return null;
    }

    return (
        <div className="alert alert-info shadow-sm">
            {mensaje}
        </div>
    );
}

export default MensajeAdmin;