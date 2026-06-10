package plataformadeportiva.plataforma_deportiva_backend.logic.servicios;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import plataformadeportiva.plataforma_deportiva_backend.data.EquipoRepository;
import plataformadeportiva.plataforma_deportiva_backend.data.LigaRepository;
import plataformadeportiva.plataforma_deportiva_backend.data.PartidoRepository;
import plataformadeportiva.plataforma_deportiva_backend.dto.request.EquipoRequest;
import plataformadeportiva.plataforma_deportiva_backend.dto.response.EquipoResponse;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Equipo;
import plataformadeportiva.plataforma_deportiva_backend.logic.modelo.Liga;

import java.util.ArrayList;
import java.util.List;

@Service
public class EquipoService {

    private final EquipoRepository equipoRepository;
    private final LigaRepository ligaRepository;
    private final PartidoRepository partidoRepository;

    public EquipoService(
            EquipoRepository equipoRepository,
            LigaRepository ligaRepository,
            PartidoRepository partidoRepository
    ) {
        this.equipoRepository = equipoRepository;
        this.ligaRepository = ligaRepository;
        this.partidoRepository = partidoRepository;
    }

    public List<EquipoResponse> listarPorLiga(Integer idLiga) {
        List<Equipo> equipos = equipoRepository.findByIdLiga_Id(idLiga);

        equipos = mergeSortEquipos(equipos);

        List<EquipoResponse> respuesta = new ArrayList<>();

        for (Equipo equipo : equipos) {
            respuesta.add(new EquipoResponse(
                    equipo.getId(),
                    equipo.getNombre(),
                    equipo.getPartidosJugados(),
                    equipo.getPartidosGanados(),
                    equipo.getPartidosEmpatados(),
                    equipo.getPartidosPerdidos(),
                    equipo.getGolesFavor(),
                    equipo.getGolesContra(),
                    equipo.getPuntos()
            ));
        }

        return respuesta;
    }

    private List<Equipo> mergeSortEquipos(List<Equipo> equipos) {
        if (equipos.size() <= 1) {
            return equipos;
        }

        int mitad = equipos.size() / 2;

        List<Equipo> izquierda = new ArrayList<>();
        List<Equipo> derecha = new ArrayList<>();

        for (int i = 0; i < mitad; i++) {
            izquierda.add(equipos.get(i));
        }

        for (int i = mitad; i < equipos.size(); i++) {
            derecha.add(equipos.get(i));
        }

        izquierda = mergeSortEquipos(izquierda);
        derecha = mergeSortEquipos(derecha);

        return mezclarEquipos(izquierda, derecha);
    }

    private List<Equipo> mezclarEquipos(List<Equipo> izquierda, List<Equipo> derecha) {
        List<Equipo> resultado = new ArrayList<>();

        int i = 0;
        int j = 0;

        while (i < izquierda.size() && j < derecha.size()) {
            Equipo equipoIzquierda = izquierda.get(i);
            Equipo equipoDerecha = derecha.get(j);

            if (debeIrAntes(equipoIzquierda, equipoDerecha)) {
                resultado.add(equipoIzquierda);
                i++;
            } else {
                resultado.add(equipoDerecha);
                j++;
            }
        }

        while (i < izquierda.size()) {
            resultado.add(izquierda.get(i));
            i++;
        }

        while (j < derecha.size()) {
            resultado.add(derecha.get(j));
            j++;
        }

        return resultado;
    }

    private boolean debeIrAntes(Equipo equipoA, Equipo equipoB) {
        if (equipoA.getPuntos() > equipoB.getPuntos()) {
            return true;
        }

        if (equipoA.getPuntos() < equipoB.getPuntos()) {
            return false;
        }

        int diferenciaGolesA = equipoA.getGolesFavor() - equipoA.getGolesContra();
        int diferenciaGolesB = equipoB.getGolesFavor() - equipoB.getGolesContra();

        if (diferenciaGolesA > diferenciaGolesB) {
            return true;
        }

        if (diferenciaGolesA < diferenciaGolesB) {
            return false;
        }

        if (equipoA.getGolesFavor() > equipoB.getGolesFavor()) {
            return true;
        }

        if (equipoA.getGolesFavor() < equipoB.getGolesFavor()) {
            return false;
        }

        return equipoA.getNombre().compareToIgnoreCase(equipoB.getNombre()) <= 0;
    }

    public String agregarEquipoALiga(Integer idLiga, EquipoRequest request) {
        Liga liga = ligaRepository.findById(idLiga).orElse(null);

        if (liga == null) {
            return "Liga no encontrada";
        }

        if (request.getNombre() == null || request.getNombre().isBlank()) {
            return "Debe ingresar el nombre del equipo";
        }

        Equipo equipo = new Equipo();
        equipo.setNombre(request.getNombre().trim());
        equipo.setIdLiga(liga);
        equipo.setPartidosJugados(0);
        equipo.setPartidosGanados(0);
        equipo.setPartidosEmpatados(0);
        equipo.setPartidosPerdidos(0);
        equipo.setGolesFavor(0);
        equipo.setGolesContra(0);
        equipo.setPuntos(0);

        equipoRepository.save(equipo);

        return "Equipo agregado correctamente. Reinicie la liga para generar el calendario actualizado";
    }

    @Transactional
    public String eliminarEquipo(Integer idEquipo) {
        Equipo equipo = equipoRepository.findById(idEquipo).orElse(null);

        if (equipo == null) {
            return "Equipo no encontrado";
        }

        Integer idLiga = equipo.getIdLiga().getId();

        partidoRepository.deleteByIdLiga_Id(idLiga);
        equipoRepository.delete(equipo);

        return "Equipo eliminado correctamente. Los partidos de la liga fueron eliminados. Reinicie la liga para generar el calendario actualizado";
    }
}