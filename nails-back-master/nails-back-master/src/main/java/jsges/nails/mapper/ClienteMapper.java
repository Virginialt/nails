package jsges.nails.mapper;

import jsges.nails.DTO.Organizacion.ClienteDTO;
import jsges.nails.domain.organizacion.Cliente;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ClienteMapper {

    public ClienteDTO toDTO(Cliente cliente) {
        ClienteDTO dto = new ClienteDTO();
        dto.setId(cliente.getId());
        dto.setCelular(cliente.getCelular());
        dto.setContacto(cliente.getContacto());
        dto.setMail(cliente.getMail());
        dto.setFechaInicio(cliente.getFechaInicio());
        dto.setFechaNacimiento(cliente.getFechaNacimiento());
        return dto;
    }

    public Cliente toEntity(ClienteDTO dto) {
        Cliente cliente = new Cliente();
        cliente.setId(dto.getId());
        cliente.setCelular(dto.getCelular());
        cliente.setContacto(dto.getContacto());
        cliente.setMail(dto.getMail());
        cliente.setFechaInicio(dto.getFechaInicio());
        cliente.setFechaNacimiento(dto.getFechaNacimiento());
        return cliente;
    }

    // Método para convertir una lista de Clientes a una lista de ClienteDTOs
    public List<ClienteDTO> toDTOList(List<Cliente> clientes) {
        return clientes.stream().map(this::toDTO).collect(Collectors.toList());
    }
}
