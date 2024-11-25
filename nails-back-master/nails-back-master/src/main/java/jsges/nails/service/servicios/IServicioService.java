package jsges.nails.service.servicios;

import jsges.nails.DTO.servicios.ServicioDTO;
import jsges.nails.domain.servicios.ItemServicio;
import jsges.nails.domain.servicios.Servicio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IServicioService {
    List<Servicio> listar();
    Servicio buscarPorId(Integer id);
    Servicio guardar(Servicio model);
    Page<ServicioDTO> findPaginated(Pageable pageable, List<ServicioDTO> servicios);
    Page<Servicio> getServicios(Pageable pageable);
    List<Servicio> listar(String consulta);
    List<ItemServicio> obtenerItems(Integer id);
    void guardarItems(List<ItemServicio> items, Servicio nuevoServicio);  // Método a implementar
}
