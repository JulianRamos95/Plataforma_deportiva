interface AuthInputProps {
    label: string;
    value: string;
    icon: string;
    type?: string;
    onChange: (value: string) => void;
}

function AuthInput({ label, value, icon, type = "text", onChange }: AuthInputProps) {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>

            <div className="input-group">
                <span className="input-group-text">
                    <i className={icon}></i>
                </span>

                <input
                    type={type}
                    className="form-control"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                />
            </div>
        </div>
    );
}

export default AuthInput;