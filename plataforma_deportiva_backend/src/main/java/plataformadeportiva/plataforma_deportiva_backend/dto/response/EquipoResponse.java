package plataformadeportiva.plataforma_deportiva_backend.dto.response;

public class EquipoResponse {

    private Integer id;
    private String nombre;
    private Integer partidosJugados;
    private Integer partidosGanados;
    private Integer partidosEmpatados;
    private Integer partidosPerdidos;
    private Integer golesFavor;
    private Integer golesContra;
    private Integer puntos;

    public EquipoResponse(
            Integer id,
            String nombre,
            Integer partidosJugados,
            Integer partidosGanados,
            Integer partidosEmpatados,
            Integer partidosPerdidos,
            Integer golesFavor,
            Integer golesContra,
            Integer puntos) {

        this.id = id;
        this.nombre = nombre;
        this.partidosJugados = partidosJugados;
        this.partidosGanados = partidosGanados;
        this.partidosEmpatados = partidosEmpatados;
        this.partidosPerdidos = partidosPerdidos;
        this.golesFavor = golesFavor;
        this.golesContra = golesContra;
        this.puntos = puntos;
    }

    public Integer getId() { return id; }
    public String getNombre() { return nombre; }
    public Integer getPartidosJugados() { return partidosJugados; }
    public Integer getPartidosGanados() { return partidosGanados; }
    public Integer getPartidosEmpatados() { return partidosEmpatados; }
    public Integer getPartidosPerdidos() { return partidosPerdidos; }
    public Integer getGolesFavor() { return golesFavor; }
    public Integer getGolesContra() { return golesContra; }
    public Integer getPuntos() { return puntos; }
}