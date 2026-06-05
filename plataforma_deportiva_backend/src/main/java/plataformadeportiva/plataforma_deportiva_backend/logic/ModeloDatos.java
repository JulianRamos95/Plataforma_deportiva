package plataformadeportiva.plataforma_deportiva_backend.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import plataformadeportiva.plataforma_deportiva_backend.logic.servicios.DeporteService;
import plataformadeportiva.plataforma_deportiva_backend.logic.servicios.EquipoService;
import plataformadeportiva.plataforma_deportiva_backend.logic.servicios.LigaService;
import plataformadeportiva.plataforma_deportiva_backend.logic.servicios.PartidoService;
import plataformadeportiva.plataforma_deportiva_backend.logic.servicios.UsuarioService;

@Component
public class ModeloDatos {

    @Autowired private UsuarioService usuarioService;
    @Autowired private DeporteService deporteService;
    @Autowired private LigaService ligaService;
    @Autowired private EquipoService equipoService;
    @Autowired private PartidoService partidoService;

    public UsuarioService getUsuarioService() {
        return usuarioService;
    }

    public DeporteService getDeporteService() {
        return deporteService;
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
}