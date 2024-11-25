import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LineaContext } from "../../contexts/LineaContext";
import {
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  IconButton,
  Heading,
  Center,
  HStack
} from "@chakra-ui/react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { obtenerLineas, eliminarLineas } from "../../services/LineaService";
import Layout from "../common/Layout";

export default function ListadoLinea() {
  const navigate = useNavigate();
  const { lineas, setLineas } = useContext(LineaContext);
  const [consulta, setConsulta] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    getDatos();
  }, [consulta]);

  const handConsultaChange = (e) => setConsulta(e.target.value);

  const getDatos = async () => {
    setLoading(true);
    try {
      const response = await obtenerLineas(consulta);
      setLineas(response.content);
    } catch (error) {
      toast({
        title: "Error al cargar líneas",
        description: "No se pudieron cargar los datos. Intenta más tarde.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (id) => {
    try {
      await eliminarLineas(id);
      toast({
        title: "Eliminación exitosa",
        description: "La línea se eliminó correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      getDatos();
    } catch (error) {
      toast({
        title: "Error al eliminar",
        description: "No se pudo eliminar la línea. Intenta más tarde.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Center>
        <Box py={8} w="90%" maxWidth="1200px">
          <Heading as="h1" size="lg" textAlign="center" color="teal.500" mb={4}>Gestión de Lineas</Heading>
          <HStack mb={4}>
            <Input
              placeholder="Buscar cliente..."
              value={consulta}
              onChange={handConsultaChange}
              maxWidth="300px"
            />
            <Button colorScheme="teal" onClick={getDatos}>
              Buscar
            </Button>
            <Button colorScheme="green" onClick={() => navigate("/lista/nuevo")}>
              Agregar Cliente
            </Button>
          </HStack>

          {loading ? (
            <Flex justify="center" mt={6}>
              <Spinner size="lg" />
            </Flex>
          ) : (
            <TableContainer>
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Denominación</Th>
                    <Th>Acciones</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {lineas.map((linea) => (
                    <Tr key={linea.id}>
                      <Td>{linea.id}</Td>
                      <Td>{linea.denominacion}</Td>
                      <Td>
                        <Flex gap={3}>
                          <Link to={`/linea/${linea.id}`}>
                            <IconButton
                              icon={<FiEdit />}
                              aria-label="Editar"
                              colorScheme="blue"
                            />
                          </Link>
                          <IconButton
                            icon={<FiTrash />}
                            aria-label="Eliminar"
                            colorScheme="red"
                            onClick={() => eliminar(linea.id)}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
          
        </Box>
      </Center>
    </Layout>
  );
}
