package plataformadeportiva.plataforma_deportiva_backend.data;

import org.springframework.data.repository.CrudRepository;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Equipo;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Liga;

import java.util.List;
import java.util.Optional;

public interface EquipoRepository extends CrudRepository<Equipo, Integer> {
    List<Equipo> findByIdLiga(Liga liga);
    List<Equipo> findByIdLiga_Id(Integer idLiga);
    Optional<Equipo> findByNombre(String nombre);
}