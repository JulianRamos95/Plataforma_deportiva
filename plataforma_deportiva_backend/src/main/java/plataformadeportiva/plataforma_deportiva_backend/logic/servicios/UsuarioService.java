package plataformadeportiva.plataforma_deportiva_backend.logic.servicios;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import plataformadeportiva.plataforma_deportiva_backend.data.UsuarioRepository;
import plataformadeportiva.plataforma_deportiva_backend.dto.request.LoginRequest;
import plataformadeportiva.plataforma_deportiva_backend.dto.request.RegistroRequest;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.LoginResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Usuario;
import plataformadeportiva.plataforma_deportiva_backend.security.JwtService;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UsuarioService(UsuarioRepository usuarioRepository, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByGmail(request.getGmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        String token = jwtService.generarToken(usuario.getId(), usuario.getGmail(), usuario.getNombre());

        return new LoginResponse(usuario.getId(), usuario.getNombre(), usuario.getGmail(), token);
    }

    public LoginResponse registrar(RegistroRequest request) {
        if (usuarioRepository.existsByGmail(request.getGmail())) {
            throw new RuntimeException("El gmail ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setGmail(request.getGmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));

        usuario = usuarioRepository.save(usuario);

        String token = jwtService.generarToken(usuario.getId(), usuario.getGmail(), usuario.getNombre());

        return new LoginResponse(usuario.getId(), usuario.getNombre(), usuario.getGmail(), token);
    }
}