package plataformadeportiva.plataforma_deportiva_backend.data;

import org.springframework.data.repository.CrudRepository;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Deporte;

import java.util.Optional;

public interface DeporteRepository extends CrudRepository<Deporte, Integer> {
    Optional<Deporte> findByNombre(String nombre);
}