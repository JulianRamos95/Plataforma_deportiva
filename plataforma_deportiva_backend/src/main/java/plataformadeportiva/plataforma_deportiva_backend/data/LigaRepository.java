package plataformadeportiva.plataforma_deportiva_backend.data;

import org.springframework.data.repository.CrudRepository;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Liga;

import java.util.List;
import java.util.Optional;

public interface LigaRepository extends CrudRepository<Liga, Integer> {
    List<Liga> findByPais(String pais);
    Optional<Liga> findByNombre(String nombre);
}