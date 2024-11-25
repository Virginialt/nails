package jsges.nails.service.organizacion;

import jsges.nails.DTO.Organizacion.ClienteDTO;
import jsges.nails.domain.organizacion.Cliente;
import jsges.nails.excepcion.RecursoNoEncontradoExcepcion;
import jsges.nails.mapper.ClienteMapper;
import jsges.nails.repository.organizacion.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class ClienteService implements IClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ClienteMapper clienteMapper;

    @Override
    public List<ClienteDTO> listarDTOs() {
        List<Cliente> clientes = clienteRepository.buscarNoEliminados();
        return clienteMapper.toDTOList(clientes);
    }

    @Override
    public ClienteDTO buscarPorId(Integer id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Cliente no encontrado con id: " + id));
        return clienteMapper.toDTO(cliente);
    }

    @Override
    public ClienteDTO guardar(ClienteDTO clienteDTO) {
        Cliente cliente = clienteMapper.toEntity(clienteDTO);
        Cliente clienteGuardado = clienteRepository.save(cliente);
        return clienteMapper.toDTO(clienteGuardado);
    }

    @Override
    public void eliminar(Integer id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Cliente no encontrado con id: " + id));
        cliente.setEstado(1);
        clienteRepository.save(cliente);
    }

    @Override
    public Page<ClienteDTO> findPaginated(Pageable pageable, String consulta) {
        List<Cliente> clientesFiltrados = clienteRepository.buscarNoEliminados(consulta);
        List<ClienteDTO> dtos = clienteMapper.toDTOList(clientesFiltrados);
        return new PageImpl<>(dtos, pageable, clientesFiltrados.size());
    }

    @Override
    public ClienteDTO actualizar(Integer id, ClienteDTO clienteDTO) {
        Cliente clienteExistente = clienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Cliente no encontrado con id: " + id));
        clienteExistente.setCelular(clienteDTO.getCelular());
        clienteExistente.setMail(clienteDTO.getMail());
        Cliente clienteActualizado = clienteRepository.save(clienteExistente);
        return clienteMapper.toDTO(clienteActualizado);
    }
}
