package jsges.nails.mapper;

import jsges.nails.DTO.articulos.ArticuloVentaDTO;
import jsges.nails.domain.articulos.ArticuloVenta;
import jsges.nails.domain.articulos.Linea;
import org.springframework.stereotype.Component;

@Component
public class ArticuloVentaMapper {

    public ArticuloVentaDTO toDto(ArticuloVenta articuloVenta) {
        if (articuloVenta == null) return null;
        ArticuloVentaDTO dto = new ArticuloVentaDTO();
        dto.setId(articuloVenta.getId());
        dto.setDenominacion(articuloVenta.getDenominacion());
        dto.setLinea(articuloVenta.getLinea() != null ? articuloVenta.getLinea().getId() : null);
        return dto;
    }

    public ArticuloVenta toEntity(ArticuloVentaDTO dto, Linea linea) {
        if (dto == null) return null;
        ArticuloVenta entity = new ArticuloVenta();
        entity.setId(dto.getId());
        entity.setDenominacion(dto.getDenominacion());
        entity.setLinea(linea);
        return entity;
    }
}
