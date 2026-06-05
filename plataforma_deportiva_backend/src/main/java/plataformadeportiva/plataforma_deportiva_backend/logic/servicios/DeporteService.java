package plataformadeportiva.plataforma_deportiva_backend.logic.servicios;

import org.springframework.stereotype.Service;
import plataformadeportiva.plataforma_deportiva_backend.data.DeporteRepository;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.DeporteResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Deporte;

import java.util.ArrayList;
import java.util.List;

@Service
public class DeporteService {

    private final DeporteRepository deporteRepository;

    public DeporteService(DeporteRepository deporteRepository) {
        this.deporteRepository = deporteRepository;
    }

    public List<DeporteResponse> listar() {
        List<DeporteResponse> respuesta = new ArrayList<>();

        for (Deporte deporte : deporteRepository.findAll()) {
            respuesta.add(new DeporteResponse(
                    deporte.getId(),
                    deporte.getNombre(),
                    deporte.getDescripcion()
            ));
        }

        return respuesta;
    }
}