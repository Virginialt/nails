package jsges.nails.mapper;

import jsges.nails.domain.servicios.ItemServicio;
import jsges.nails.domain.servicios.Servicio;
import jsges.nails.domain.servicios.TipoServicio;

import org.springframework.stereotype.Component;

import jsges.nails.DTO.servicios.ItemServicioDTO;

@Component
public class ItemServicioMapper {

    public static ItemServicioDTO toDTO(ItemServicio item) {
        return new ItemServicioDTO(
            item.getTipoServicio().getId(),
            item.getPrecio(),
            item.getObservaciones()
        );
    }

    public static ItemServicio fromDTO(ItemServicioDTO dto, Servicio servicio, TipoServicio tipoServicio) {
        return new ItemServicio(servicio, tipoServicio, dto.getPrecio(), dto.getObservaciones());
    }
}
