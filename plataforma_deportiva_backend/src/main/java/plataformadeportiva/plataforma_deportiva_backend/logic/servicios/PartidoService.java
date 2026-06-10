package plataformadeportiva.plataforma_deportiva_backend.logic.servicios;

import org.springframework.stereotype.Service;
import plataformadeportiva.plataforma_deportiva_backend.data.EquipoRepository;
import plataformadeportiva.plataforma_deportiva_backend.data.LigaRepository;
import plataformadeportiva.plataforma_deportiva_backend.data.PartidoRepository;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.PartidoResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Equipo;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Liga;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Partido;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PartidoService {

    private final PartidoRepository partidoRepository;
    private final EquipoRepository equipoRepository;
    private final LigaRepository ligaRepository;

    public PartidoService(
            PartidoRepository partidoRepository,
            EquipoRepository equipoRepository,
            LigaRepository ligaRepository
    ) {
        this.partidoRepository = partidoRepository;
        this.equipoRepository = equipoRepository;
        this.ligaRepository = ligaRepository;
    }

    public boolean existenPartidosLiga(Integer idLiga) {
        return partidoRepository.existsByIdLiga_Id(idLiga);
    }

    public String generarPartidosLiga(Integer idLiga) {
        Liga liga = ligaRepository.findById(idLiga).orElse(null);

        if (liga == null) {
            return "Liga no encontrada";
        }

        if (existenPartidosLiga(idLiga)) {
            return "La liga ya tiene partidos generados";
        }

        List<Equipo> equipos = equipoRepository.findByIdLiga_Id(idLiga);

        if (equipos.size() < 2) {
            return "La liga debe tener al menos 2 equipos";
        }

        if (equipos.size() % 2 != 0) {
            return "La cantidad de equipos debe ser par";
        }

        List<Partido> partidos = new ArrayList<>();

        int cantidadEquipos = equipos.size();
        int jornadasPorVuelta = cantidadEquipos - 1;
        int partidosPorJornada = cantidadEquipos / 2;
        int totalJornadas = jornadasPorVuelta * 2;

        List<Equipo> rotacion = new ArrayList<>(equipos);

        for (int jornada = 1; jornada <= jornadasPorVuelta; jornada++) {

            for (int i = 0; i < partidosPorJornada; i++) {
                Equipo local = rotacion.get(i);
                Equipo visita = rotacion.get(cantidadEquipos - 1 - i);

                Partido partidoIda = new Partido();
                partidoIda.setIdLiga(liga);
                partidoIda.setIdEquipoLocal(local);
                partidoIda.setIdEquipoVisitante(visita);
                partidoIda.setJornada(jornada);
                partidoIda.setFecha(LocalDate.now().plusDays(jornada * 7L));
                partidoIda.setGolesLocal(null);
                partidoIda.setGolesVisitante(null);
                partidoIda.setEstado("Programado");

                partidos.add(partidoIda);

                Partido partidoVuelta = new Partido();
                partidoVuelta.setIdLiga(liga);
                partidoVuelta.setIdEquipoLocal(visita);
                partidoVuelta.setIdEquipoVisitante(local);
                partidoVuelta.setJornada(jornada + jornadasPorVuelta);
                partidoVuelta.setFecha(LocalDate.now().plusDays((jornada + jornadasPorVuelta) * 7L));
                partidoVuelta.setGolesLocal(null);
                partidoVuelta.setGolesVisitante(null);
                partidoVuelta.setEstado("Programado");

                partidos.add(partidoVuelta);
            }

            Equipo ultimo = rotacion.remove(cantidadEquipos - 1);
            rotacion.add(1, ultimo);
        }

        boolean localiasAjustadas = ajustarLocaliasMaximoDosSeguidas(partidos, totalJornadas);

        if (!localiasAjustadas) {
            return "No fue posible generar partidos respetando el máximo de 2 partidos seguidos en casa";
        }

        partidoRepository.saveAll(partidos);

        return "Partidos generados correctamente";
    }

    private boolean ajustarLocaliasMaximoDosSeguidas(List<Partido> partidos, int totalJornadas) {
        Map<Integer, Integer> rachasCasa = new HashMap<>();

        for (int jornada = 1; jornada <= totalJornadas; jornada++) {
            List<Partido> partidosJornada = obtenerPartidosPorJornada(partidos, jornada);

            boolean[] invertirPartidos = new boolean[partidosJornada.size()];

            boolean jornadaValida = buscarAsignacionLocalias(
                    partidosJornada,
                    0,
                    rachasCasa,
                    invertirPartidos
            );

            if (!jornadaValida) {
                return false;
            }

            aplicarInversiones(partidosJornada, invertirPartidos);
            actualizarRachasCasa(partidosJornada, rachasCasa);
        }

        return true;
    }

    private List<Partido> obtenerPartidosPorJornada(List<Partido> partidos, int jornada) {
        List<Partido> partidosJornada = new ArrayList<>();

        for (Partido partido : partidos) {
            if (partido.getJornada().equals(jornada)) {
                partidosJornada.add(partido);
            }
        }

        return partidosJornada;
    }

    private boolean buscarAsignacionLocalias(
            List<Partido> partidosJornada,
            int indice,
            Map<Integer, Integer> rachasCasa,
            boolean[] invertirPartidos
    ) {
        if (indice == partidosJornada.size()) {
            return true;
        }

        Partido partido = partidosJornada.get(indice);

        Equipo localOriginal = partido.getIdEquipoLocal();
        Equipo visitanteOriginal = partido.getIdEquipoVisitante();

        List<Boolean> opciones = obtenerOrdenOpciones(localOriginal, visitanteOriginal, rachasCasa);

        for (Boolean invertir : opciones) {
            Equipo local;
            Equipo visitante;

            if (invertir) {
                local = visitanteOriginal;
                visitante = localOriginal;
            } else {
                local = localOriginal;
                visitante = visitanteOriginal;
            }

            int rachaActualLocal = rachasCasa.getOrDefault(local.getId(), 0);

            if (rachaActualLocal >= 2) {
                continue;
            }

            Map<Integer, Integer> nuevasRachas = new HashMap<>(rachasCasa);
            nuevasRachas.put(local.getId(), rachaActualLocal + 1);
            nuevasRachas.put(visitante.getId(), 0);

            invertirPartidos[indice] = invertir;

            boolean asignacionValida = buscarAsignacionLocalias(
                    partidosJornada,
                    indice + 1,
                    nuevasRachas,
                    invertirPartidos
            );

            if (asignacionValida) {
                return true;
            }
        }

        return false;
    }

    private List<Boolean> obtenerOrdenOpciones(
            Equipo localOriginal,
            Equipo visitanteOriginal,
            Map<Integer, Integer> rachasCasa
    ) {
        List<Boolean> opciones = new ArrayList<>();

        int rachaLocalOriginal = rachasCasa.getOrDefault(localOriginal.getId(), 0);
        int rachaVisitanteOriginal = rachasCasa.getOrDefault(visitanteOriginal.getId(), 0);

        if (rachaLocalOriginal > rachaVisitanteOriginal) {
            opciones.add(true);
            opciones.add(false);
        } else {
            opciones.add(false);
            opciones.add(true);
        }

        return opciones;
    }

    private void aplicarInversiones(List<Partido> partidosJornada, boolean[] invertirPartidos) {
        for (int i = 0; i < partidosJornada.size(); i++) {
            if (invertirPartidos[i]) {
                Partido partido = partidosJornada.get(i);

                Equipo local = partido.getIdEquipoLocal();
                Equipo visitante = partido.getIdEquipoVisitante();

                partido.setIdEquipoLocal(visitante);
                partido.setIdEquipoVisitante(local);
            }
        }
    }

    private void actualizarRachasCasa(List<Partido> partidosJornada, Map<Integer, Integer> rachasCasa) {
        for (Partido partido : partidosJornada) {
            Integer idLocal = partido.getIdEquipoLocal().getId();
            Integer idVisitante = partido.getIdEquipoVisitante().getId();

            int rachaActualLocal = rachasCasa.getOrDefault(idLocal, 0);

            rachasCasa.put(idLocal, rachaActualLocal + 1);
            rachasCasa.put(idVisitante, 0);
        }
    }

    public List<PartidoResponse> listarPorLiga(Integer idLiga) {
        List<PartidoResponse> respuesta = new ArrayList<>();

        for (Partido partido : partidoRepository.findByIdLiga_IdOrderByJornadaAscIdAsc(idLiga)) {
            respuesta.add(convertirAResponse(partido));
        }

        return respuesta;
    }

    public List<PartidoResponse> listarPorLigaYJornada(Integer idLiga, Integer jornada) {
        List<PartidoResponse> respuesta = new ArrayList<>();

        for (Partido partido : partidoRepository.findByIdLiga_IdAndJornadaOrderByIdAsc(idLiga, jornada)) {
            respuesta.add(convertirAResponse(partido));
        }

        return respuesta;
    }

    private PartidoResponse convertirAResponse(Partido partido) {
        return new PartidoResponse(
                partido.getId(),
                partido.getIdEquipoLocal().getNombre(),
                partido.getIdEquipoVisitante().getNombre(),
                partido.getGolesLocal(),
                partido.getGolesVisitante(),
                partido.getJornada(),
                partido.getFecha(),
                partido.getEstado()
        );
    }

    public void generarPartidosAlIniciar() {
        for (Liga liga : ligaRepository.findAll()) {
            if (!existenPartidosLiga(liga.getId())) {
                generarPartidosLiga(liga.getId());
            }
        }
    }
}