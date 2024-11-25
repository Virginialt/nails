package jsges.nails.mapper;

import jsges.nails.DTO.articulos.LineaDTO;
import jsges.nails.domain.articulos.Linea;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LineaMapper {
    LineaDTO toDto(Linea linea);
    Linea toEntity(LineaDTO lineaDTO);
}
