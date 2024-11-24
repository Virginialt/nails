import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { newLinea, obtenerLinea } from "../../services/LineaService";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";

export default function Linea({ title }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();

  const [linea, setLinea] = useState({ denominacion: "" });
  const { denominacion } = linea;

  useEffect(() => {
    cargarModel();
  }, []);

  const cargarModel = async () => {
    if (id > 0) {
      try {
        const resultado = await obtenerLinea(id);
        setLinea(resultado);
      } catch (error) {
        toast({
          title: "Error al cargar la línea",
          description: "No se pudo cargar la información. Intenta más tarde.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  const onInputChange = ({ target: { name, value } }) => {
    setLinea({ ...linea, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await newLinea(linea);
      toast({
        title: "Guardado exitoso",
        description: "La línea se guardó correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/linea/listado");
    } catch (error) {
      toast({
        title: "Error al guardar",
        description: "No se pudo guardar la línea. Intenta de nuevo.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" p={6}>
      <Box w="100%" maxW="500px" p={4} borderWidth="1px" borderRadius="md" shadow="lg">
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Gestión de Línea / {title}
        </Heading>
        <form onSubmit={onSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel>Denominación</FormLabel>
            <Input
              type="text"
              id="denominacion"
              name="denominacion"
              value={denominacion}
              onChange={onInputChange}
              placeholder="Ingrese la denominación"
            />
          </FormControl>
          <Flex justify="space-between" mt={6}>
            <Button colorScheme="teal" type="submit">
              Guardar
            </Button>
            <Button colorScheme="blue" onClick={() => navigate("/linea/listado")}>
              Regresar
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
}
