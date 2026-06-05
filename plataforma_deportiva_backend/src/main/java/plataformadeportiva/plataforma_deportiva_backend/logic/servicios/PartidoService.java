package plataformadeportiva.plataforma_deportiva_backend.logic.servicios;

import org.springframework.stereotype.Service;
import plataformadeportiva.plataforma_deportiva_backend.data.PartidoRepository;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.PartidoResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Partido;

import java.util.ArrayList;
import java.util.List;

@Service
public class PartidoService {

    private final PartidoRepository partidoRepository;

    public PartidoService(PartidoRepository partidoRepository) {
        this.partidoRepository = partidoRepository;
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
}