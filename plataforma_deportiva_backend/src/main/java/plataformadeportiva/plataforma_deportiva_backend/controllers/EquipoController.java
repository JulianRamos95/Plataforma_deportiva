package plataformadeportiva.plataforma_deportiva_backend.controllers;

import org.springframework.web.bind.annotation.*;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.EquipoResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.ModeloDatos;

import java.util.List;

@RestController
@RequestMapping("/api/equipos")
public class EquipoController {

    private final ModeloDatos modeloDatos;

    public EquipoController(ModeloDatos modeloDatos) {
        this.modeloDatos = modeloDatos;
    }

    @GetMapping("/liga/{idLiga}")
    public List<EquipoResponse> listarPorLiga(@PathVariable Integer idLiga) {
        return modeloDatos.getEquipoService().listarPorLiga(idLiga);
    }
}