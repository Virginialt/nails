package jsges.nails.mapper;

import org.mapstruct.MapperConfig;

import jsges.nails.DTO.articulos.LineaDTO;
import jsges.nails.domain.articulos.Linea;

@MapperConfig(componentModel = "spring")
public interface LineaMapper {
    LineaDTO toDto(Linea linea);
    Linea toEntity(LineaDTO lineaDTO);
}
