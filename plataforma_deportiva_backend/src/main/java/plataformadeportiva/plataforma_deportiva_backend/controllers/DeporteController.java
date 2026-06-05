package plataformadeportiva.plataforma_deportiva_backend.controllers;

import org.springframework.web.bind.annotation.*;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.DeporteResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.ModeloDatos;

import java.util.List;

@RestController
@RequestMapping("/api/deportes")
public class DeporteController {

    private final ModeloDatos modeloDatos;

    public DeporteController(ModeloDatos modeloDatos) {
        this.modeloDatos = modeloDatos;
    }

    @GetMapping
    public List<DeporteResponse> listar() {
        return modeloDatos.getDeporteService().listar();
    }
}