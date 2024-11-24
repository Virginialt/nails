import { useEffect, useState } from "react";
import { Box, Heading, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Text, Button, Flex, Input } from "@chakra-ui/react";
import { obtenerTodosLosServicios } from "../../services/ServicioService";
import Layout from "../common/Layout";
import { useNavigate } from "react-router-dom";

export default function ListadoServicio() {
  const navigate = useNavigate();
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [consulta, setConsulta] = useState(""); // Estado para la consulta de búsqueda

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    const serviciosObtenidos = await obtenerTodosLosServicios();
    setServicios(serviciosObtenidos);
    setLoading(false);
  };

  const columnas = ["Cliente", "Fecha", "Estado"];

  // Función para manejar el cambio en el input de búsqueda
  const handConsultaChange = (event) => {
    setConsulta(event.target.value);
  };

  // Filtrar los servicios por tipo (en este caso, por cliente o cualquier otro campo)
  const serviciosFiltrados = servicios.filter((servicio) =>
    servicio.tipo.toLowerCase().includes(consulta.toLowerCase()) // Cambiar "tipo" por el campo que desees buscar
  );

  return (
    <Layout>
      <Box maxW="7xl" mx="auto" mt={8} p={4} bg="white" boxShadow="md" borderRadius="lg">
        
        {/* Título estilizado */}
        <Heading as="h1" size="lg" textAlign="center" color="teal.500">
          Listado de Servicios
        </Heading>
        <Flex justify="space-around" mb={6} className="listado-acciones">
          <Button mt={6} colorScheme="teal" type="button" onClick={() => navigate("/servicio/nuevo")}>Agregar Servicio</Button>
          <Input
              placeholder="Buscar tipo de servicio..."
              mt={6}
              value={consulta}
              onChange={handConsultaChange}
              width="auto"
            />
          <Button mt={6} colorScheme="teal" type="button" onClick={() => navigate("/itemsTable")}>Ver Items</Button>
        </Flex>

        {/* Indicador de carga */}
        {loading ? (
          <Box textAlign="center" py={8}>
            <Spinner size="xl" color="teal.500" />
            <Text mt={4} fontSize="lg" color="gray.600">
              Cargando servicios...
            </Text>
          </Box>
        ) : serviciosFiltrados.length === 0 ? (
          <Text textAlign="center" fontSize="lg" color="gray.600">
            No hay servicios disponibles.
          </Text>
        ) : (
          <TableContainer>
            {/* Tabla estilizada */}
            <Table variant="simple" size="md">
              <Thead bg="teal.500">
                <Tr>
                  {columnas.map((columna) => (
                    <Th key={columna} color="white" textTransform="capitalize">
                      {columna}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {serviciosFiltrados.map((servicio, index) => (
                  <Tr key={index} _hover={{ bg: "teal.50" }}>
                    <Td>{servicio.cliente}</Td>
                    <Td>{new Date(servicio.fecha).toLocaleDateString()}</Td>
                    <Td>
                      <Text
                        color={
                          servicio.estado === "completado"
                            ? "green.500"
                            : servicio.estado === "pendiente"
                            ? "orange.500"
                            : "red.500"
                        }
                        fontWeight="bold"
                      >
                        {servicio.estado}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Layout>
  );
}
