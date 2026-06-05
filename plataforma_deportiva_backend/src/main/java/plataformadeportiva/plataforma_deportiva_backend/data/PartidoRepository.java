package plataformadeportiva.plataforma_deportiva_backend.data;

import org.springframework.data.repository.CrudRepository;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Liga;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Partido;

import java.util.List;

public interface PartidoRepository extends CrudRepository<Partido, Integer> {
    List<Partido> findByIdLiga(Liga liga);
    List<Partido> findByIdLiga_Id(Integer idLiga);
    List<Partido> findByIdLiga_IdAndJornada(Integer idLiga, Integer jornada);
}