package plataformadeportiva.plataforma_deportiva_backend.logic.modelo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "equipo")
public class Equipo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_equipo", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_liga", nullable = false)
    private Liga idLiga;

    @Size(max = 100)
    @NotNull
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Size(max = 100)
    @Column(name = "ciudad", length = 100)
    private String ciudad;

    @Size(max = 100)
    @Column(name = "estadio", length = 100)
    private String estadio;

    @ColumnDefault("0")
    @Column(name = "partidos_jugados")
    private Integer partidosJugados;

    @ColumnDefault("0")
    @Column(name = "partidos_ganados")
    private Integer partidosGanados;

    @ColumnDefault("0")
    @Column(name = "partidos_empatados")
    private Integer partidosEmpatados;

    @ColumnDefault("0")
    @Column(name = "partidos_perdidos")
    private Integer partidosPerdidos;

    @ColumnDefault("0")
    @Column(name = "goles_favor")
    private Integer golesFavor;

    @ColumnDefault("0")
    @Column(name = "goles_contra")
    private Integer golesContra;

    @ColumnDefault("0")
    @Column(name = "puntos")
    private Integer puntos;


}