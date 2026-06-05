package plataformadeportiva.plataforma_deportiva_backend.logic.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import plataformadeportiva.plataforma_deportiva_backend.data.UsuarioRepository;
import plataformadeportiva.plataforma_deportiva_backend.dto.request.LoginRequest;
import plataformadeportiva.plataforma_deportiva_backend.dto.request.RegistroRequest;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.LoginResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Usuario;
import plataformadeportiva.plataforma_deportiva_backend.security.JwtService;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordHash passwordHash;

    public LoginResponse login(LoginRequest request) {

        Usuario usuario = usuarioRepository.findByGmail(request.getGmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordHash.verify(request.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        String token = jwtService.generarToken(
                usuario.getId(),
                usuario.getGmail(),
                usuario.getNombre()
        );

        return new LoginResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getGmail(),
                token
        );
    }

    public LoginResponse registrar(RegistroRequest request) {

        if (usuarioRepository.existsByGmail(request.getGmail())) {
            throw new RuntimeException("El gmail ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setGmail(request.getGmail());
        usuario.setPassword(passwordHash.hash(request.getPassword()));

        usuario = usuarioRepository.save(usuario);

        String token = jwtService.generarToken(
                usuario.getId(),
                usuario.getGmail(),
                usuario.getNombre()
        );

        return new LoginResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getGmail(),
                token
        );
    }

    public Usuario findById(Integer id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario findByGmail(String gmail) {
        return usuarioRepository.findByGmail(gmail).orElse(null);
    }

    public Iterable<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
}