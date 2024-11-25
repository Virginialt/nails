package jsges.nails.controller.services;

import jsges.nails.DTO.Organizacion.ClienteDTO;
import jsges.nails.DTO.servicios.ItemServicioDTO;
import jsges.nails.DTO.servicios.ServicioDTO;
import jsges.nails.domain.servicios.ItemServicio;
import jsges.nails.domain.servicios.Servicio;
import jsges.nails.excepcion.RecursoNoEncontradoExcepcion;
import jsges.nails.mapper.ItemServicioMapper;
import jsges.nails.mapper.ServicioMapper;
import jsges.nails.service.servicios.IServicioService;
import jsges.nails.service.servicios.ITipoServicioService;
import jsges.nails.service.organizacion.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "${path_mapping}")
@CrossOrigin(value = "${path_cross}")
public class ServicioController {

    @Autowired
    private IServicioService servicioService;

    @Autowired
    private IClienteService clienteService;

    @Autowired
    private ITipoServicioService tipoServicioService;

    @Autowired
    private ItemServicioMapper itemServicioMapper;

    @Autowired
    private ServicioMapper servicioMapper;

    @GetMapping("/servicios")
    public List<ServicioDTO> getAll() {
        return servicioService.listar().stream()
                .map(servicio -> ServicioMapper.toDTO(servicio, servicioService.obtenerItems(servicio.getId())))
                .toList();
    }

    @GetMapping("/servicio/{id}")
    public ResponseEntity<ServicioDTO> getPorId(@PathVariable Integer id) {
        Servicio servicio = servicioService.buscarPorId(id);
        if (servicio == null) {
            throw new RecursoNoEncontradoExcepcion("No se encontró el servicio con ID " + id);
        }
        List<ItemServicio> items = servicioService.obtenerItems(id);
        return ResponseEntity.ok(ServicioMapper.toDTO(servicio, items));
    }

    @PostMapping("/servicios")
    public ResponseEntity<ServicioDTO> agregar(@RequestBody ServicioDTO model) {
        // Convertir ClienteDTO a Cliente usando ClienteMapper
        ClienteDTO cliente = clienteService.buscarPorId(model.cliente);
        if (cliente == null) {
            throw new RecursoNoEncontradoExcepcion("Cliente no encontrado");
        }

        // Crear el nuevo servicio
        Servicio servicio = ServicioMapper.fromDTO(model, cliente);
        Servicio nuevoServicio = servicioService.guardar(servicio);

        // Guardar los items asociados al servicio
        List<ItemServicio> items = model.listaItems.stream()
                .map(dto -> ItemServicioMapper.fromDTO(dto, nuevoServicio, tipoServicioService.buscarPorId(dto.getTipoServicioId())))
                .toList();

        servicioService.guardarItems(items, nuevoServicio);

        return ResponseEntity.status(HttpStatus.CREATED).body(ServicioMapper.toDTO(nuevoServicio, items));
    }
}
