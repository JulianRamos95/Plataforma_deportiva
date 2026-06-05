package plataformadeportiva.plataforma_deportiva_backend.dto.response;

public class DeporteResponse {

    private Integer id;
    private String nombre;
    private String descripcion;

    public DeporteResponse(Integer id, String nombre, String descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }
}