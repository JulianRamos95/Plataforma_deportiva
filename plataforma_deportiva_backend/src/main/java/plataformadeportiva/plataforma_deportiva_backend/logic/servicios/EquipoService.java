package plataformadeportiva.plataforma_deportiva_backend.logic.servicios;

import org.springframework.stereotype.Service;
import plataformadeportiva.plataforma_deportiva_backend.data.EquipoRepository;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.EquipoResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Equipo;

import java.util.ArrayList;
import java.util.List;

@Service
public class EquipoService {

    private final EquipoRepository equipoRepository;

    public EquipoService(EquipoRepository equipoRepository) {
        this.equipoRepository = equipoRepository;
    }

    public List<EquipoResponse> listarPorLiga(Integer idLiga) {
        List<EquipoResponse> respuesta = new ArrayList<>();

        for (Equipo equipo : equipoRepository.findByIdLiga_Id(idLiga)) {
            respuesta.add(new EquipoResponse(
                    equipo.getId(),
                    equipo.getNombre(),
                    equipo.getPartidosJugados(),
                    equipo.getPartidosGanados(),
                    equipo.getPartidosEmpatados(),
                    equipo.getPartidosPerdidos(),
                    equipo.getGolesFavor(),
                    equipo.getGolesContra(),
                    equipo.getPuntos()
            ));
        }

        return respuesta;
    }
}