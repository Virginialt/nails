import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { newTipoServicio, obtenerTipoServicio } from "../../services/TipoServicioService";
import { Button, FormControl, FormLabel, Input, Box, Heading, Flex } from "@chakra-ui/react";

export default function TipoServicio({ title }) {
  const navegacion = useNavigate();
  const { id } = useParams();
  const [tipoServicio, setTipoServicio] = useState({ denominacion: "" });
  const { denominacion } = tipoServicio;

  useEffect(() => {
    cargarModel();
  }, []);

  const cargarModel = async () => {
    if (id > 0) {
      const resultado = await obtenerTipoServicio(id);
      setTipoServicio(resultado);
    }
  };

  const onInputChange = ({ target: { name, value } }) => {
    setTipoServicio({ ...tipoServicio, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await newTipoServicio(tipoServicio);
    navegacion("/tipo-servicio/listado");
  };

  return (
    <Box p={6}>
      <Heading as="h1" mb={4}>
        Gestión de tipo servicio / {title}
      </Heading>

      <form onSubmit={onSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="denominacion">Denominación</FormLabel>
          <Input
            id="denominacion"
            name="denominacion"
            type="text"
            value={denominacion}
            onChange={onInputChange}
            placeholder="Ingresa la denominación"
          />
        </FormControl>

        <Flex justify="flex-end" gap={4}>
          <Button type="submit" colorScheme="teal" size="sm">
            Guardar
          </Button>
          <Button
            size="sm"
            variant="outline"
            colorScheme="blue"
            onClick={() => navegacion("/tipo-servicio/listado")}
          >
            Regresar
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
