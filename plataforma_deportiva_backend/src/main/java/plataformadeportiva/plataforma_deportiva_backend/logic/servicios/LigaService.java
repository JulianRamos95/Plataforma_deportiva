package plataformadeportiva.plataforma_deportiva_backend.logic.servicios;

import org.springframework.stereotype.Service;
import plataformadeportiva.plataforma_deportiva_backend.data.LigaRepository;
import plataformadeportiva.plataforma_deportiva_backend.dto.request.LigaRequest;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.LigaResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Liga;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
public class LigaService {

    private final LigaRepository ligaRepository;

    public LigaService(LigaRepository ligaRepository) {
        this.ligaRepository = ligaRepository;
    }

    public List<String> listarPaises() {
        Set<String> paises = new LinkedHashSet<>();

        for (Liga liga : ligaRepository.findAll()) {
            paises.add(liga.getPais());
        }

        return new ArrayList<>(paises);
    }

    public List<LigaResponse> listarPorPais(String pais) {
        List<LigaResponse> respuesta = new ArrayList<>();

        for (Liga liga : ligaRepository.findByPais(pais)) {
            respuesta.add(new LigaResponse(
                    liga.getId(),
                    liga.getNombre(),
                    liga.getPais()
            ));
        }

        return respuesta;
    }

    public String agregarLiga(LigaRequest request) {
        if (request.getNombre() == null || request.getNombre().isBlank()) {
            return "Debe ingresar el nombre de la liga";
        }

        if (request.getPais() == null || request.getPais().isBlank()) {
            return "Debe ingresar el país de la liga";
        }

        Liga liga = new Liga();
        liga.setNombre(request.getNombre().trim());
        liga.setPais(request.getPais().trim());

        ligaRepository.save(liga);

        return "Liga agregada correctamente";
    }
}