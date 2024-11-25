package jsges.nails.domain.servicios;

import jakarta.persistence.*;
import jsges.nails.DTO.Organizacion.ClienteDTO;
import jsges.nails.domain.organizacion.Cliente;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;
import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@ToString
public class Servicio {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        private int estado;

        @ManyToOne(cascade = CascadeType.ALL)
        private Cliente cliente;

        private Timestamp fechaRegistro;
        private Timestamp fechaRealizacion;
        private double total;


    public Servicio() {

    }


    public void setCliente(ClienteDTO buscarPorId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setCliente'");
    }


    public void setCliente(Cliente cliente2) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setCliente'");
    }



}
