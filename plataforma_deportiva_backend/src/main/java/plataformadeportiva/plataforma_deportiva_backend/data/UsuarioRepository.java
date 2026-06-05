package plataformadeportiva.plataforma_deportiva_backend.data;

import org.springframework.data.repository.CrudRepository;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {
    Optional<Usuario> findByGmail(String gmail);
    boolean existsByGmail(String gmail);
}