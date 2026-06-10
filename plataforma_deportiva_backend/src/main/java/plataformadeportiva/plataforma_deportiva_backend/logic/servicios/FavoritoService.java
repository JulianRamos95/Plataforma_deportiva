package plataformadeportiva.plataforma_deportiva_backend.logic.servicios;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import plataformadeportiva.plataforma_deportiva_backend.data.LigaRepository;
import plataformadeportiva.plataforma_deportiva_backend.data.UsuarioLigaFavoritaRepository;
import plataformadeportiva.plataforma_deportiva_backend.data.UsuarioRepository;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.LigaResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Liga;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Usuario;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.UsuarioLigaFavorita;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavoritoService {

    private final UsuarioLigaFavoritaRepository favoritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final LigaRepository ligaRepository;

    public FavoritoService(
            UsuarioLigaFavoritaRepository favoritoRepository,
            UsuarioRepository usuarioRepository,
            LigaRepository ligaRepository
    ) {
        this.favoritoRepository = favoritoRepository;
        this.usuarioRepository = usuarioRepository;
        this.ligaRepository = ligaRepository;
    }

    public List<LigaResponse> listarFavoritos(String gmail) {
        List<LigaResponse> respuesta = new ArrayList<>();

        if (gmail == null || gmail.isBlank()) {
            return respuesta;
        }

        for (UsuarioLigaFavorita favorito : favoritoRepository.findByUsuario_GmailOrderByLiga_PaisAscLiga_NombreAsc(gmail)) {
            Liga liga = favorito.getLiga();

            respuesta.add(new LigaResponse(
                    liga.getId(),
                    liga.getNombre(),
                    liga.getPais()
            ));
        }

        return respuesta;
    }

    @Transactional
    public String alternarFavorito(String gmail, Integer idLiga) {
        Usuario usuario = usuarioRepository.findByGmail(gmail).orElse(null);

        if (usuario == null) {
            return "Usuario no encontrado";
        }

        Liga liga = ligaRepository.findById(idLiga).orElse(null);

        if (liga == null) {
            return "Liga no encontrada";
        }

        boolean yaEsFavorita = favoritoRepository.existsByUsuario_IdAndLiga_Id(usuario.getId(), liga.getId());

        if (yaEsFavorita) {
            favoritoRepository.deleteByUsuario_IdAndLiga_Id(usuario.getId(), liga.getId());
            return "Liga eliminada de favoritos";
        }

        UsuarioLigaFavorita favorito = new UsuarioLigaFavorita();
        favorito.setUsuario(usuario);
        favorito.setLiga(liga);

        favoritoRepository.save(favorito);

        return "Liga agregada a favoritos";
    }
}