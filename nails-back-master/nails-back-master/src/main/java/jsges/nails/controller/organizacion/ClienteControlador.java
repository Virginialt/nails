package jsges.nails.controller.organizacion;

import jsges.nails.DTO.Organizacion.ClienteDTO;
import jsges.nails.service.organizacion.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${path_mapping}")
@CrossOrigin("${path_cross}")
public class ClienteControlador {

    @Autowired
    private ClienteService clienteServicio;

    // Obtener todos los clientes en forma de DTO
    @GetMapping("/clientes")
    public ResponseEntity<List<ClienteDTO>> getAll() {
        List<ClienteDTO> clientes = clienteServicio.listarDTOs();
        return ResponseEntity.ok(clientes);
    }

    // Obtener clientes paginados con búsqueda opcional
    @GetMapping("/clientesPageQuery")
    public ResponseEntity<Page<ClienteDTO>> getItems(@RequestParam(defaultValue = "") String consulta,
                                                     @RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "${max_page}") int size) {
        PageRequest pageable = PageRequest.of(page, size);
        Page<ClienteDTO> clientesPaginados = clienteServicio.findPaginated(pageable, consulta);
        return ResponseEntity.ok(clientesPaginados);
    }

    // Agregar un nuevo cliente
    @PostMapping("/clientes")
    public ResponseEntity<ClienteDTO> agregar(@RequestBody ClienteDTO clienteDTO) {
        ClienteDTO clienteGuardado = clienteServicio.guardar(clienteDTO);
        return ResponseEntity.ok(clienteGuardado);
    }

    // Eliminar un cliente (soft delete)
    @PutMapping("/clienteEliminar/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        clienteServicio.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener un cliente por ID
    @GetMapping("/cliente/{id}")
    public ResponseEntity<ClienteDTO> getPorId(@PathVariable Integer id) {
        ClienteDTO cliente = clienteServicio.buscarPorId(id);
        return ResponseEntity.ok(cliente);
    }

    // Actualizar un cliente existente
    @PutMapping("/clientes/{id}")
    public ResponseEntity<ClienteDTO> actualizar(@PathVariable Integer id,
                                                 @RequestBody ClienteDTO clienteDTO) {
        ClienteDTO clienteActualizado = clienteServicio.actualizar(id, clienteDTO);
        return ResponseEntity.ok(clienteActualizado);
    }
}
