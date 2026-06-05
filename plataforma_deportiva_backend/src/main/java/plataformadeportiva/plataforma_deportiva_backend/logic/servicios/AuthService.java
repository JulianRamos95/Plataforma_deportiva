package plataformadeportiva.plataforma_deportiva_backend.logic.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import plataformadeportiva.plataforma_deportiva_backend.data.UsuarioRepository;
import plataformadeportiva.plataforma_deportiva_backend.dto.request.LoginRequest;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Usuario;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordHash passwordHash;

    public Usuario login(LoginRequest request) {

        if (request.getGmail() == null || request.getPassword() == null) {
            return null;
        }

        Usuario usuario = usuarioRepository.findByGmail(request.getGmail()).orElse(null);

        if (usuario == null) {
            return null;
        }

        if (!passwordHash.verify(request.getPassword(), usuario.getPassword())) {
            return null;
        }

        return usuario;
    }
}