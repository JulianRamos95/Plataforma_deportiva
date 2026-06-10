package plataformadeportiva.plataforma_deportiva_backend.controllers;

import org.springframework.web.bind.annotation.*;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.PartidoResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.ModeloDatos;

import java.util.List;

@RestController
@RequestMapping("/api/partidos")
public class PartidoController {

    private final ModeloDatos modeloDatos;

    public PartidoController(ModeloDatos modeloDatos) {
        this.modeloDatos = modeloDatos;
    }

    @GetMapping("/liga/{idLiga}")
    public List<PartidoResponse> listarPorLiga(@PathVariable Integer idLiga) {
        return modeloDatos.getPartidoService().listarPorLiga(idLiga);
    }

    @GetMapping("/liga/{idLiga}/jornada/{jornada}")
    public List<PartidoResponse> listarPorLigaYJornada(@PathVariable Integer idLiga, @PathVariable Integer jornada) {
        return modeloDatos.getPartidoService().listarPorLigaYJornada(idLiga, jornada);
    }

    @PostMapping("/generar/liga/{idLiga}")
    public String generarPartidos(@PathVariable Integer idLiga) {
        return modeloDatos.getPartidoService().generarPartidosLiga(idLiga);
    }

}