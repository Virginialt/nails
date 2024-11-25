package jsges.nails.mapper;

import jsges.nails.domain.servicios.Servicio;
import jsges.nails.DTO.Organizacion.ClienteDTO;
import jsges.nails.DTO.servicios.ServicioDTO;
import jsges.nails.domain.organizacion.Cliente;
import jsges.nails.domain.servicios.ItemServicio;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
@Component
public class ServicioMapper {

    public static ServicioDTO toDTO(Servicio servicio, List<ItemServicio> items) {
        ServicioDTO dto = new ServicioDTO(servicio);
        dto.listaItems = items.stream().map(ItemServicioMapper::toDTO).collect(Collectors.toSet());
        return dto;
    }

    public static Servicio fromDTO(ServicioDTO dto, ClienteDTO cliente) {
        Servicio servicio = new Servicio();
        servicio.setCliente(cliente);
        servicio.setFechaRegistro(dto.fechaDocumento);
        servicio.setFechaRealizacion(dto.fechaDocumento);
        servicio.setEstado(0); 
        return servicio;
    }
}
