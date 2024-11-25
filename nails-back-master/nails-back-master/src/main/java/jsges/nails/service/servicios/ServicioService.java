package jsges.nails.service.servicios;

import jsges.nails.DTO.servicios.ServicioDTO;
import jsges.nails.domain.servicios.ItemServicio;
import jsges.nails.domain.servicios.Servicio;
import jsges.nails.repository.servicios.ItemServicioRepository;
import jsges.nails.repository.servicios.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioService implements IServicioService {

    @Autowired
    private ServicioRepository servicioRepository;

    @Autowired
    private ItemServicioRepository itemServicioRepository;

    @Autowired
    private ItemServicioService itemServicioService;

    @Override
    public List<Servicio> listar() {
        return servicioRepository.findAll();  // Lista todos los servicios
    }

    @Override
    public Servicio buscarPorId(Integer id) {
        return servicioRepository.findById(id).orElse(null);  // Busca un servicio por ID
    }

    @Override
    public Servicio guardar(Servicio model) {
        return servicioRepository.save(model);  // Guarda un servicio
    }

    @Override
    public Page<ServicioDTO> findPaginated(Pageable pageable, List<ServicioDTO> servicios) {
        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        int startItem = currentPage * pageSize;
        List<ServicioDTO> list;
        if (servicios.size() < startItem) {
            list = List.of();  // Si no hay más elementos para mostrar
        } else {
            int toIndex = Math.min(startItem + pageSize, servicios.size());
            list = servicios.subList(startItem, toIndex);
        }
        return new PageImpl<>(list, PageRequest.of(currentPage, pageSize), servicios.size());
    }

    @Override
    public Page<Servicio> getServicios(Pageable pageable) {
        return servicioRepository.findAll(pageable);  // Devuelve un paginado de servicios
    }

    @Override
    public List<Servicio> listar(String consulta) {
        return servicioRepository.buscarNoEliminados(consulta);  // Filtra servicios según consulta
    }

    @Override
    public List<ItemServicio> obtenerItems(Integer id) {
        return itemServicioRepository.buscarPorServicio(id);  // Devuelve los items asociados a un servicio
    }

    @Override
    public void guardarItems(List<ItemServicio> items, Servicio nuevoServicio) {
        // Asocia cada ItemServicio con el Servicio y guarda cada uno en la base de datos
        for (ItemServicio item : items) {
            item.setServicio(nuevoServicio);  // Establece la relación entre el servicio y el item
            itemServicioRepository.save(item);  // Guarda el item
        }
    }
}
