package plataformadeportiva.plataforma_deportiva_backend.dto.response;

public class LigaResponse {

    private Integer id;
    private String nombre;
    private String pais;

    public LigaResponse(Integer id, String nombre, String pais) {
        this.id = id;
        this.nombre = nombre;
        this.pais = pais;
    }

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getPais() {
        return pais;
    }
}