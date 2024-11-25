import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Heading,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  newArticuloVenta,
  obtenerArticuloVenta,
} from "../../services/ArticuloVentaService";
import { obtenerLineas2 } from "../../services/LineaService";

export default function ArticuloVenta({ title }) {
  const navegacion = useNavigate();
  const toast = useToast();
  const { id } = useParams();

  const [articulo, setArticulo] = useState({
    denominacion: "",
    linea: 0,
  });

  const [listaLineas, setListaLineas] = useState([]);
  const [selectedLinea, setSelectedLinea] = useState("");

  useEffect(() => {
    cargarModel();
    cargarLineas();
  }, []);

  const cargarModel = async () => {
    if (id > 0) {
      const resultado = await obtenerArticuloVenta(id);
      setArticulo(resultado);
      setSelectedLinea(resultado.linea);
    }
  };

  const cargarLineas = async () => {
    const resultado = await obtenerLineas2();
    setListaLineas(resultado);
  };

  const onInputChange = ({ target: { name, value } }) => {
    setArticulo({ ...articulo, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...articulo,
      linea: selectedLinea,
    };

    try {
      await newArticuloVenta(data);
      toast({
        title: "Artículo guardado",
        status: "success",
        isClosable: true,
      });
      navegacion("/articulo/listado");
    } catch (error) {
      toast({
        title: "Error al guardar",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="600px" mx="auto" py={8}>
      <Heading size="lg" mb={4}>
        Gestión de Artículo / {title}
      </Heading>
      <Divider mb={6} />
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Denominación</FormLabel>
            <Input
              type="text"
              name="denominacion"
              value={articulo.denominacion}
              onChange={onInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Selecciona una línea</FormLabel>
            <Select
              placeholder="Seleccione..."
              value={selectedLinea}
              onChange={(e) => setSelectedLinea(e.target.value)}
            >
              {listaLineas.map((linea) => (
                <option key={linea.id} value={linea.id}>
                  {linea.denominacion}
                </option>
              ))}
            </Select>
          </FormControl>

          <Stack direction="row" spacing={4} justify="flex-end">
            <Button type="submit" colorScheme="green">
              Guardar
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={() => navegacion("/articulo/listado")}
            >
              Regresar
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}
