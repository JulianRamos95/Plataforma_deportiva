package plataformadeportiva.plataforma_deportiva_backend.logic.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import plataformadeportiva.plataforma_deportiva_backend.logic.servicios.PartidoService;

@Component
public class InicializadorDatos implements CommandLineRunner {

    private final PartidoService partidoService;

    public InicializadorDatos(PartidoService partidoService) {
        this.partidoService = partidoService;
    }

    @Override
    public void run(String... args) {
        partidoService.generarPartidosAlIniciar();
    }
}