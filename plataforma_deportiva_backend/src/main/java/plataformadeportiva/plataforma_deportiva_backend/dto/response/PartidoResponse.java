package plataformadeportiva.plataforma_deportiva_backend.dto.response;

import java.time.LocalDate;

public class PartidoResponse {

    private Integer id;
    private String equipoLocal;
    private String equipoVisitante;
    private Integer golesLocal;
    private Integer golesVisitante;
    private Integer jornada;
    private LocalDate fecha;
    private String estado;

    public PartidoResponse(
            Integer id,
            String equipoLocal,
            String equipoVisitante,
            Integer golesLocal,
            Integer golesVisitante,
            Integer jornada,
            LocalDate fecha,
            String estado) {

        this.id = id;
        this.equipoLocal = equipoLocal;
        this.equipoVisitante = equipoVisitante;
        this.golesLocal = golesLocal;
        this.golesVisitante = golesVisitante;
        this.jornada = jornada;
        this.fecha = fecha;
        this.estado = estado;
    }

    public Integer getId() { return id; }
    public String getEquipoLocal() { return equipoLocal; }
    public String getEquipoVisitante() { return equipoVisitante; }
    public Integer getGolesLocal() { return golesLocal; }
    public Integer getGolesVisitante() { return golesVisitante; }
    public Integer getJornada() { return jornada; }
    public LocalDate getFecha() { return fecha; }
    public String getEstado() { return estado; }
}