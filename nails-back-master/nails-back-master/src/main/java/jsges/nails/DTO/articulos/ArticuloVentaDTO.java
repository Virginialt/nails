package jsges.nails.DTO.articulos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jsges.nails.DTO.TipoObjetoDTO;
import jsges.nails.domain.articulos.ArticuloVenta;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticuloVentaDTO extends TipoObjetoDTO {
    public Integer id;
    public String denominacion;
    public Integer linea;

    public ArticuloVentaDTO(ArticuloVenta model) {
        this.id = model.getId();
        this.denominacion = model.getDenominacion();
        this.linea = model.getLinea().getId();
    }
}
