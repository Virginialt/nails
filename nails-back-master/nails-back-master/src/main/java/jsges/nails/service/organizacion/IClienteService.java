package jsges.nails.service.organizacion;

import jsges.nails.DTO.Organizacion.ClienteDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IClienteService {
    
    // Listar todos los clientes como DTOs
    List<ClienteDTO> listarDTOs();

    // Buscar un cliente por ID y devolverlo como DTO
    ClienteDTO buscarPorId(Integer id);

    // Guardar un cliente usando DTO
    ClienteDTO guardar(ClienteDTO clienteDTO);

    // Eliminar un cliente por ID
    void eliminar(Integer id);

    // Listar clientes con filtro de búsqueda y devolver como DTOs
    Page<ClienteDTO> findPaginated(Pageable pageable, String consulta);

    // Actualizar un cliente
    ClienteDTO actualizar(Integer id, ClienteDTO clienteDTO);
  }
