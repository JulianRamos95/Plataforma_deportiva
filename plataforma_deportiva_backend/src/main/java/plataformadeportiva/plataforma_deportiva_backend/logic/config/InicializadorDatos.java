package plataformadeportiva.plataforma_deportiva_backend.logic.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import plataformadeportiva.plataforma_deportiva_backend.data.UsuarioRepository;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Usuario;
import plataformadeportiva.plataforma_deportiva_backend.logic.servicios.PartidoService;
import plataformadeportiva.plataforma_deportiva_backend.logic.servicios.PasswordHash;

@Component
public class InicializadorDatos implements CommandLineRunner {

    private final PartidoService partidoService;
    private final UsuarioRepository usuarioRepository;
    private final PasswordHash passwordHash;

    public InicializadorDatos(
            PartidoService partidoService,
            UsuarioRepository usuarioRepository,
            PasswordHash passwordHash
    ) {
        this.partidoService = partidoService;
        this.usuarioRepository = usuarioRepository;
        this.passwordHash = passwordHash;
    }

    @Override
    public void run(String... args) {
        crearAdminSiNoExiste();
        partidoService.generarPartidosAlIniciar();
    }

    private void crearAdminSiNoExiste() {
        String gmailAdmin = "admin@gmail.com";

        if (!usuarioRepository.existsByGmail(gmailAdmin)) {
            Usuario admin = new Usuario();
            admin.setNombre("Administrador del sistema");
            admin.setGmail(gmailAdmin);
            admin.setPassword(passwordHash.hash("123"));
            admin.setRol("ADMIN");

            usuarioRepository.save(admin);
        }
    }
}