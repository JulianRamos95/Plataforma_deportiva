package plataformadeportiva.plataforma_deportiva_backend.controllers;

import org.springframework.web.bind.annotation.*;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.LigaResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.config.ModeloDatos;

import java.util.List;

@RestController
@RequestMapping("/api/ligas")
public class LigaController {

    private final ModeloDatos modeloDatos;

    public LigaController(ModeloDatos modeloDatos) {
        this.modeloDatos = modeloDatos;
    }

    @GetMapping("/paises")
    public List<String> listarPaises() {
        return modeloDatos.getLigaService().listarPaises();
    }

    @GetMapping("/pais/{pais}")
    public List<LigaResponse> listarPorPais(@PathVariable String pais) {
        return modeloDatos.getLigaService().listarPorPais(pais);
    }
}