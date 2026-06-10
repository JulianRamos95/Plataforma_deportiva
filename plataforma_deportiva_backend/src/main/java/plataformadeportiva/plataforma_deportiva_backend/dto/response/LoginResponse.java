package plataformadeportiva.plataforma_deportiva_backend.dto.response;

public class LoginResponse {

    private Integer id;
    private String nombre;
    private String gmail;
    private String rol;
    private String token;

    public LoginResponse(Integer id, String nombre, String gmail, String rol, String token) {
        this.id = id;
        this.nombre = nombre;
        this.gmail = gmail;
        this.rol = rol;
        this.token = token;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getGmail() {
        return gmail;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}