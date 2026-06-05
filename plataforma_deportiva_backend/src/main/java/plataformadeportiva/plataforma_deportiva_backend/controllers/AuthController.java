package plataformadeportiva.plataforma_deportiva_backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import plataformadeportiva.plataforma_deportiva_backend.dto.request.LoginRequest;
import plataformadeportiva.plataforma_deportiva_backend.dto.request.RegistroRequest;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.LoginResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.ModeloDatos;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Usuario;
import plataformadeportiva.plataforma_deportiva_backend.security.JwtService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final ModeloDatos modeloDatos;
    private final JwtService jwtService;

    public AuthController(ModeloDatos modeloDatos, JwtService jwtService) {
        this.modeloDatos = modeloDatos;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        Usuario usuario = modeloDatos.getAuthService().login(request);

        if (usuario == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas");
        }

        String token = jwtService.generarToken(usuario.getId(), usuario.getGmail(), usuario.getNombre());

        return new LoginResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getGmail(),
                token
        );
    }

    @PostMapping("/registro")
    public LoginResponse registrar(@RequestBody RegistroRequest request) {
        return modeloDatos.getUsuarioService().registrar(request);
    }

    @PostMapping("/logout")
    public String logout() {
        return "Sesión cerrada";
    }
}