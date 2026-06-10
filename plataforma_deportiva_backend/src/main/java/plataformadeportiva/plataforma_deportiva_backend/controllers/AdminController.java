package plataformadeportiva.plataforma_deportiva_backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import plataformadeportiva.plataforma_deportiva_backend.dto.request.EquipoRequest;
import plataformadeportiva.plataforma_deportiva_backend.dto.request.LigaRequest;
import plataformadeportiva.plataforma_deportiva_backend.logic.config.ModeloDatos;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Usuario;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ModeloDatos modeloDatos;

    public AdminController(ModeloDatos modeloDatos) {
        this.modeloDatos = modeloDatos;
    }

    @PostMapping("/liga/{idLiga}/simular-jornada")
    public String simularJornadaActual(
            @RequestHeader("X-Usuario-Gmail") String gmail,
            @PathVariable Integer idLiga
    ) {
        validarAdmin(gmail);
        return modeloDatos.getPartidoService().simularJornadaActual(idLiga);
    }

    @PostMapping("/ligas")
    public String agregarLiga(
            @RequestHeader("X-Usuario-Gmail") String gmail,
            @RequestBody LigaRequest request
    ) {
        validarAdmin(gmail);
        return modeloDatos.getLigaService().agregarLiga(request);
    }

    @PostMapping("/liga/{idLiga}/reiniciar")
    public String reiniciarLiga(
            @RequestHeader("X-Usuario-Gmail") String gmail,
            @PathVariable Integer idLiga
    ) {
        validarAdmin(gmail);
        return modeloDatos.getPartidoService().reiniciarLiga(idLiga);
    }

    @PostMapping("/liga/{idLiga}/equipos")
    public String agregarEquipo(
            @RequestHeader("X-Usuario-Gmail") String gmail,
            @PathVariable Integer idLiga,
            @RequestBody EquipoRequest request
    ) {
        validarAdmin(gmail);
        return modeloDatos.getEquipoService().agregarEquipoALiga(idLiga, request);
    }

    @DeleteMapping("/equipos/{idEquipo}")
    public String eliminarEquipo(
            @RequestHeader("X-Usuario-Gmail") String gmail,
            @PathVariable Integer idEquipo
    ) {
        validarAdmin(gmail);
        return modeloDatos.getEquipoService().eliminarEquipo(idEquipo);
    }

    private void validarAdmin(String gmail) {
        Usuario usuario = modeloDatos.getUsuarioService().findByGmail(gmail);

        if (usuario == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario no autenticado");
        }

        if (!"ADMIN".equals(usuario.getRol())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tiene permisos de administrador");
        }
    }
}