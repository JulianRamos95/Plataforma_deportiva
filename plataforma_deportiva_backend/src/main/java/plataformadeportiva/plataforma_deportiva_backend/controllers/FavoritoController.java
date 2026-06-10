package plataformadeportiva.plataforma_deportiva_backend.controllers;

import org.springframework.web.bind.annotation.*;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.LigaResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.config.ModeloDatos;

import java.util.List;

@RestController
@RequestMapping("/api/favoritos")
public class FavoritoController {

    private final ModeloDatos modeloDatos;

    public FavoritoController(ModeloDatos modeloDatos) {
        this.modeloDatos = modeloDatos;
    }

    @GetMapping
    public List<LigaResponse> listarFavoritos(
            @RequestHeader("X-Usuario-Gmail") String gmail
    ) {
        return modeloDatos.getFavoritoService().listarFavoritos(gmail);
    }

    @PostMapping("/liga/{idLiga}/alternar")
    public String alternarFavorito(
            @RequestHeader("X-Usuario-Gmail") String gmail,
            @PathVariable Integer idLiga
    ) {
        return modeloDatos.getFavoritoService().alternarFavorito(gmail, idLiga);
    }
}