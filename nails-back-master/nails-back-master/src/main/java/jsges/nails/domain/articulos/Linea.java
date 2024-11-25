package jsges.nails.domain.articulos;

import jakarta.persistence.*;
import jsges.nails.DTO.articulos.LineaDTO;
import jsges.nails.domain.TipoObjeto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@ToString
public class Linea extends TipoObjeto {

    // Anotación para marcar 'id' como la clave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Esto asegura que el campo id se autoincremente
    private Integer id;  // El id será autogenerado por la base de datos

    @Column(columnDefinition = "TEXT")  // Especificamos que 'denominacion' es un campo de texto
    private String denominacion;

    private int estado;  // El estado de la línea, típicamente se usa para indicar si está activa o no


    // Constructor por defecto necesario para JPA
    public Linea() {}

    // Constructor con nombre
    public Linea(String nombre) {
        this.setDenominacion(nombre);
    }

    // Constructor con DTO (Data Transfer Object)
    public Linea(LineaDTO model) {
        this.setDenominacion(model.denominacion);
    }
}

