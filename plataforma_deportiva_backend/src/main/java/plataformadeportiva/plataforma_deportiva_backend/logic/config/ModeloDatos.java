package plataformadeportiva.plataforma_deportiva_backend.logic.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import plataformadeportiva.plataforma_deportiva_backend.logic.servicios.*;

@Component
public class ModeloDatos {

    @Autowired private UsuarioService usuarioService;
    @Autowired private LigaService ligaService;
    @Autowired private EquipoService equipoService;
    @Autowired private PartidoService partidoService;
    @Autowired private AuthService authService;
    @Autowired private PasswordHash passwordHash;
    @Autowired private FavoritoService favoritoService;

    public PasswordHash getPasswordHash() {return passwordHash; }
    public AuthService getAuthService() {
        return authService;
    }
    public UsuarioService getUsuarioService() {
        return usuarioService;
    }
    public LigaService getLigaService() {
        return ligaService;
    }
    public EquipoService getEquipoService() {
        return equipoService;
    }
    public PartidoService getPartidoService() {
        return partidoService;
    }
    public FavoritoService getFavoritoService() { return favoritoService; }
}