package plataformadeportiva.plataforma_deportiva_backend.controllers;

import org.springframework.web.bind.annotation.*;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.LigaResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.ModeloDatos;

import java.util.List;

@RestController
@RequestMapping("/api/ligas")
public class LigaController {

    private final ModeloDatos modeloDatos;

    public LigaController(ModeloDatos modeloDatos) {
        this.modeloDatos = modeloDatos;
    }

    @GetMapping("/deporte/{idDeporte}")
    public List<LigaResponse> listarPorDeporte(@PathVariable Integer idDeporte) {
        return modeloDatos.getLigaService().listarPorDeporte(idDeporte);
    }
}