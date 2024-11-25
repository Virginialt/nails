package jsges.nails.DTO.Organizacion;
import jsges.nails.domain.organizacion.Cliente;
import lombok.Data;

import java.util.Date;
@Data
public class ClienteDTO {
    private Integer id;
    private String celular;
    private String contacto;
    private String mail;
    private Date fechaInicio;
    private Date fechaNacimiento;

    public ClienteDTO(Cliente model) {
        this.id = model.getId();
        this.contacto = model.getContacto();
        this.celular = model.getCelular();
        this.fechaNacimiento=model.getFechaNacimiento();
        this.mail = model.getMail();
    }

    public ClienteDTO() {}
}

