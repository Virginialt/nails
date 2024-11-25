import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../app.config";
import { TipoServicioContext } from "../../contexts/TipoServicioContext";
import { obtenerTiposServicios, eliminarTipoServicio } from "../../services/TipoServicioService";
import { Button, Input, Table, Thead, Tbody, Tr, Th, Td, Icon, Flex, Box, Heading, Center } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Layout from "../common/Layout"

export default function ListadoTipoServicio() {
  const { tiposServicios, setTiposServicios } = useContext(TipoServicioContext);
  const [consulta, setConsulta] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(ITEMS_PER_PAGE);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    getDatos();
  }, [page, pageSize, consulta]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getDatos = async () => {
    obtenerTiposServicios(consulta, page, pageSize)
      .then((response) => {
        setTiposServicios(response.content);
        setTotalPages(response.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };

  const handConsultaChange = (e) => {
    setConsulta(e.target.value);
  };

  const eliminar = async (id) => {
    try {
      const eliminacionExitosa = await eliminarTipoServicio(id);
      if (eliminacionExitosa) {
        getDatos();
      } else {
        console.error("Error al eliminar el tipo servicio");
      }
    } catch (error) {
      console.error("Error al eliminar el tipo servicios:", error);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sorted = [...tiposServicios];
    if (sortConfig.key !== null) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  };

  return (
    <Layout>
      <Center>
        <Box py={8} w="90%" maxWidth="1200px">
          <Heading as="h1" size="lg" textAlign="center" color="teal.500" mb={4}>Gestión de Tipo Servicio</Heading>
          <Flex>
            <Input
              placeholder="Buscar tipo de servicio..."
              value={consulta}
              onChange={handConsultaChange}
              width="auto"
              mr={4}
            />
            <Button onClick={getDatos} colorScheme="teal" >
              Buscar
            </Button>
            <Link to={`/tipo-servicio/nuevo`}>
              <Button ml={4} colorScheme="green">
                Agregar Tipo de Servicio
              </Button>
            </Link>
          </Flex>

          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                <Th onClick={() => handleSort("id")} cursor="pointer">
                  # {sortConfig.key === "id" && (
                    <Icon as={sortConfig.direction === "ascending" ? "🔼" : "🔽"} />
                  )}
                </Th>
                <Th onClick={() => handleSort("denominacion")} cursor="pointer">
                  Denominación {sortConfig.key === "denominacion" && (
                    <Icon as={sortConfig.direction === "ascending" ? "🔼" : "🔽"} />
                  )}
                </Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedData().map((tipoServicio) => (
                <Tr key={tipoServicio.id}>
                  <Td>{tipoServicio.id}</Td>
                  <Td>{tipoServicio.denominacion}</Td>
                  <Td>
                    <Flex justify="center">
                      <Link to={`/tipoServicio/${tipoServicio.id}`}>
                        <Button colorScheme="blue" size="sm" leftIcon={<FaEdit />}>
                          Editar
                        </Button>
                      </Link>
                      <Button
                        colorScheme="red"
                        size="sm"
                        leftIcon={<FaTrash />}
                        ml={3}
                        onClick={() => eliminar(tipoServicio.id)}
                      >
                        Eliminar
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Paginación */}
          <Flex mt={4} justify="center">
            {Array.from({ length: totalPages }, (_, i) => i).map((pageNumber) => (
              <Button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                colorScheme={page === pageNumber ? "teal" : "gray"}
                variant="outline"
                size="sm"
                m={1}
              >
                {pageNumber + 1}
              </Button>
            ))}
          </Flex>
        </Box>
      </Center>
    </Layout>
  );
}
