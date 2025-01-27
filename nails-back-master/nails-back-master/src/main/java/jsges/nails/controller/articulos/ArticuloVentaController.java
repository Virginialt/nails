package jsges.nails.controller.articulos;

import jsges.nails.DTO.articulos.ArticuloVentaDTO;
import jsges.nails.DTO.articulos.LineaDTO;
import jsges.nails.domain.articulos.ArticuloVenta;
import jsges.nails.domain.articulos.Linea;
import jsges.nails.excepcion.RecursoNoEncontradoExcepcion;
import jsges.nails.service.articulos.IArticuloVentaService;
import jsges.nails.service.articulos.ILineaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static java.lang.Integer.parseInt;

@RestController
@RequestMapping(value="${path_mapping}")
@CrossOrigin(value="${path_cross}")
public class ArticuloVentaController {
    private static final Logger logger = LoggerFactory.getLogger(ArticuloVentaController.class);
    @Autowired
    private IArticuloVentaService  modelService;

    @Autowired
    private ILineaService lineaService;

    public ArticuloVentaController() {

    }

    @GetMapping({"/articulos"})
    public List<ArticuloVentaDTO> getAll() {
        logger.info("enta en  traer todas los articulos");
        List<ArticuloVenta> list = modelService.listar();
        List<ArticuloVentaDTO> listadoDTO    =  new ArrayList<>();
        list.forEach((model) -> {
            listadoDTO.add(new ArticuloVentaDTO(model));
        });
        return listadoDTO;
    }

    @GetMapping({"/articulosPageQuery"})
    public ResponseEntity<Page<ArticuloVentaDTO>> getItems(@RequestParam(defaultValue = "") String consulta, @RequestParam(defaultValue = "0") int page,
                                                        @RequestParam(defaultValue = "${max_page}") int size) {
        List<ArticuloVenta> listado = modelService.listar(consulta);
        List<ArticuloVentaDTO> listadoDTO    =  new ArrayList<>();
        listado.forEach((model) -> {
            listadoDTO.add(new ArticuloVentaDTO(model));
        });
        Page<ArticuloVentaDTO> bookPage = modelService.findPaginated(PageRequest.of(page, size),listadoDTO);
        return ResponseEntity.ok().body(bookPage);
    }


    @PostMapping("/articulos")
    public ArticuloVenta agregar(@RequestBody ArticuloVentaDTO model){
        logger.info("entra" );

        Integer idLinea = model.linea;

        ArticuloVenta newModel =  new ArticuloVenta();
        newModel.setDenominacion(model.denominacion);
        newModel.setLinea(lineaService.buscarPorId(idLinea));

        ArticuloVenta modelSave= modelService.guardar(newModel);
        return modelSave;
    }


    @DeleteMapping("/articuloEliminar/{id}")
    public ResponseEntity<ArticuloVenta> eliminar(@PathVariable Integer id){
        ArticuloVenta model = modelService.buscarPorId(id);
        if (model == null){
            throw new RecursoNoEncontradoExcepcion("El id recibido no existe: " + id);
        }

        model.asEliminado();
        modelService.guardar(model);
        return ResponseEntity.ok(model);
    }

    @GetMapping("/articulos/{id}")
    public ResponseEntity<ArticuloVentaDTO> getPorId(@PathVariable Integer id){
        ArticuloVenta articuloVenta = modelService.buscarPorId(id);
        if(articuloVenta == null){
            throw new RecursoNoEncontradoExcepcion("No se encontro el id: " + id);
        }
        ArticuloVentaDTO model = new ArticuloVentaDTO(articuloVenta);
        return ResponseEntity.ok(model);
    }

    @PutMapping("/articulos/{id}")
    public ResponseEntity<ArticuloVenta> actualizar(@PathVariable Integer id,
                                                    @RequestBody ArticuloVentaDTO modelRecibido){
        logger.info("articulo " +modelRecibido);
        ArticuloVenta model = modelService.buscarPorId(id);
        logger.info("articulo " +model);
        if (model == null){
            throw new RecursoNoEncontradoExcepcion("El id recibido no existe: " + id);
        }
        logger.info("articulo " +model);
        model.setDenominacion(modelRecibido.denominacion);
        model.setLinea(lineaService.buscarPorId(modelRecibido.linea));
        modelService.guardar(model);
        return ResponseEntity.ok(model);
    }

}

