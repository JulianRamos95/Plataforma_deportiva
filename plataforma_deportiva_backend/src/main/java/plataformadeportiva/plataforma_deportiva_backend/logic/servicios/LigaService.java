package plataformadeportiva.plataforma_deportiva_backend.logic.servicios;

import org.springframework.stereotype.Service;
import plataformadeportiva.plataforma_deportiva_backend.data.LigaRepository;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.LigaResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Liga;

import java.util.ArrayList;
import java.util.List;

@Service
public class LigaService {

    private final LigaRepository ligaRepository;

    public LigaService(LigaRepository ligaRepository) {
        this.ligaRepository = ligaRepository;
    }

    public List<LigaResponse> listarPorDeporte(Integer idDeporte) {
        List<LigaResponse> respuesta = new ArrayList<>();

        for (Liga liga : ligaRepository.findByIdDeporte_Id(idDeporte)) {
            respuesta.add(new LigaResponse(
                    liga.getId(),
                    liga.getNombre(),
                    liga.getPais()
            ));
        }

        return respuesta;
    }
}