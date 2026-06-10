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
import java.util.List;

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

        partidoRepository.saveAll(partidos);

        return "Partidos generados correctamente";
    }

    public List<PartidoResponse> listarPorLiga(Integer idLiga) {
        List<PartidoResponse> respuesta = new ArrayList<>();

        for (Partido partido : partidoRepository.findByIdLiga_Id(idLiga)) {
            respuesta.add(new PartidoResponse(
                    partido.getId(),
                    partido.getIdEquipoLocal().getNombre(),
                    partido.getIdEquipoVisitante().getNombre(),
                    partido.getGolesLocal(),
                    partido.getGolesVisitante(),
                    partido.getJornada(),
                    partido.getFecha(),
                    partido.getEstado()
            ));
        }

        return respuesta;
    }

    public List<PartidoResponse> listarPorLigaYJornada(Integer idLiga, Integer jornada) {
        List<PartidoResponse> respuesta = new ArrayList<>();

        for (Partido partido : partidoRepository.findByIdLiga_IdAndJornada(idLiga, jornada)) {
            respuesta.add(new PartidoResponse(
                    partido.getId(),
                    partido.getIdEquipoLocal().getNombre(),
                    partido.getIdEquipoVisitante().getNombre(),
                    partido.getGolesLocal(),
                    partido.getGolesVisitante(),
                    partido.getJornada(),
                    partido.getFecha(),
                    partido.getEstado()
            ));
        }

        return respuesta;
    }

    public void generarPartidosAlIniciar() {
        for (Liga liga : ligaRepository.findAll()) {
            if (!existenPartidosLiga(liga.getId())) {
                generarPartidosLiga(liga.getId());
            }
        }
    }
}