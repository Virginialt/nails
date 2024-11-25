package jsges.nails.mapper;

import java.util.List;

import org.springframework.stereotype.Service;

import jsges.nails.DTO.servicios.ServicioDTO;
import jsges.nails.domain.organizacion.Cliente;
import jsges.nails.domain.servicios.ItemServicio;
import jsges.nails.domain.servicios.Servicio;

@Service
public class ServicioMapper {
    public ServicioDTO toDto(Servicio servicio, List<ItemServicio> items) {
        return new ServicioDTO(servicio, items);
    }

    public Servicio toEntity(ServicioDTO dto, Cliente cliente) {
        Servicio servicio = new Servicio();
        servicio.setCliente(cliente);
        servicio.setFechaRegistro(dto.fechaDocumento);
        servicio.setFechaRealizacion(dto.fechaDocumento);
        servicio.setEstado(0);
        return servicio;
    }
}
