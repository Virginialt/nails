import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../app.config";
import { ClienteContext } from "../../contexts/ClienteContext";
import { obtenerClientes, eliminarCliente } from "../../services/ClienteService";
import { Button, Input, Table, Thead, Tbody, Tr, Th, Td, Box, Flex, HStack, Heading, Center } from "@chakra-ui/react";
import Layout from "../common/Layout"

export default function ListadoCliente() {
  const navigate = useNavigate();
  const { clientes, setClientes } = useContext(ClienteContext);
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

  const handlePageChange = (newPage) => setPage(newPage);

  const getDatos = async () => {
    try {
      const response = await obtenerClientes(consulta, page, pageSize);
      setClientes(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handConsultaChange = (e) => setConsulta(e.target.value);

  const eliminar = async (id) => {
    try {
      const eliminacionExitosa = await eliminarCliente(id);
      if (eliminacionExitosa) getDatos();
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
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
    const sorted = [...clientes];
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
          <Heading as="h1" size="lg" textAlign="center" color="teal.500" mb={4}>Gestión de Clientes</Heading>

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
            <Button colorScheme="green" onClick={() => navigate("/cliente/nuevo")}>
              Agregar Cliente
            </Button>
          </HStack>

          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th onClick={() => handleSort("id")}>
                  ID {sortConfig.key === "id" && (sortConfig.direction === "ascending" ? "🔽" : "🔼")}
                </Th>
                <Th onClick={() => handleSort("razonSocial")}>
                  Apellido y Nombre {sortConfig.key === "razonSocial" && (sortConfig.direction === "ascending" ? "🔽" : "🔼")}
                </Th>
                <Th onClick={() => handleSort("celular")}>
                  Celular {sortConfig.key === "celular" && (sortConfig.direction === "ascending" ? "🔽" : "🔼")}
                </Th>
                <Th onClick={() => handleSort("mail")}>
                  Mail {sortConfig.key === "mail" && (sortConfig.direction === "ascending" ? "🔽" : "🔼")}
                </Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedData().map((cliente, index) => (
                <Tr key={index}>
                  <Td>{cliente.id}</Td>
                  <Td>{cliente.razonSocial}</Td>
                  <Td>{cliente.celular}</Td>
                  <Td>{cliente.mail}</Td>
                  <Td>
                    <HStack spacing={3} justify="center">
                      <Link to={`/cliente/${cliente.id}`}>
                        <Button variant="outline" colorScheme="blue" size="sm">
                          Editar
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        colorScheme="red"
                        size="sm"
                        onClick={() => eliminar(cliente.id)}
                      >
                        Eliminar
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Flex justify="space-between" mt={4}>
            <HStack spacing={3}>
              {Array.from({ length: totalPages }, (_, i) => i).map((pageNumber) => (
                <Button
                  key={pageNumber}
                  variant="outline"
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber + 1}
                </Button>
              ))}
            </HStack>
          </Flex>
        </Box>
      </Center>
    </Layout>
  );
}
