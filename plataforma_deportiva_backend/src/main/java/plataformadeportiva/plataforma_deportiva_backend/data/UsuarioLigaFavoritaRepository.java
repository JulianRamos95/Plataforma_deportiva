package plataformadeportiva.plataforma_deportiva_backend.data;

import org.springframework.data.repository.CrudRepository;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.UsuarioLigaFavorita;

import java.util.List;
import java.util.Optional;

public interface UsuarioLigaFavoritaRepository extends CrudRepository<UsuarioLigaFavorita, Integer> {
    List<UsuarioLigaFavorita> findByUsuario_GmailOrderByLiga_PaisAscLiga_NombreAsc(String gmail);
    Optional<UsuarioLigaFavorita> findByUsuario_IdAndLiga_Id(Integer idUsuario, Integer idLiga);
    boolean existsByUsuario_IdAndLiga_Id(Integer idUsuario, Integer idLiga);
    void deleteByUsuario_IdAndLiga_Id(Integer idUsuario, Integer idLiga);
}