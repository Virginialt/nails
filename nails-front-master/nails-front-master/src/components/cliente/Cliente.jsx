import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerCliente } from "../../services/ClienteService";
import { Button, Input, FormControl, FormLabel, VStack, Box, Heading } from "@chakra-ui/react";

export default function Cliente({ title }) {
  const urlBase = "http://localhost:8080/nails/clientes";
  let navegacion = useNavigate();

  const { id } = useParams();
  const [cliente, setCliente] = useState({
    razonSocial: "",
    celular: "",
    mail: "",
  });

  const { razonSocial, celular, mail } = cliente;

  useEffect(() => {
    cargarCliente();
  }, []);

  const cargarCliente = async () => {
    if (id > 0) {
      const resultado = await obtenerCliente(id);
      setCliente(resultado);
    }
  };

  const onInputChange = ({ target: { name, value } }) => {
    setCliente({ ...cliente, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (id > 0) {
      await axios.put(`${urlBase}/${id}`, cliente);
    } else {
      await axios.post(urlBase, cliente);
    }
    navegacion("/cliente/listado");
  };

  return (
    <Box p={5} boxShadow="md" borderRadius="lg" maxWidth="500px" mx="auto">
      <Heading mb={4}>Gestión de Clientes / {title}</Heading>
      <form onSubmit={(e) => onSubmit(e)}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Apellido Nombre</FormLabel>
            <Input
              type="text"
              name="razonSocial"
              value={razonSocial}
              onChange={onInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Celular</FormLabel>
            <Input
              type="number"
              name="celular"
              value={celular}
              onChange={onInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Mail</FormLabel>
            <Input
              type="email"
              name="mail"
              value={mail}
              onChange={onInputChange}
            />
          </FormControl>

          <VStack spacing={3} align="stretch">
            <Button type="submit" colorScheme="green" size="lg">
              Guardar
            </Button>
            <Button variant="outline" colorScheme="blue" onClick={() => navegacion("/cliente/listado")} size="lg">
              Regresar
            </Button>
          </VStack>
        </VStack>
      </form>
    </Box>
  );
}
