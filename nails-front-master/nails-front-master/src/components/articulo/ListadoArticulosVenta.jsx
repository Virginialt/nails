import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  IconButton,
  Flex,
  Center
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  obtenerArticulosVenta,
  eliminarArticulosVenta,
} from "../../services/ArticuloVentaService";
import { ArticuloVentaContext } from "../../contexts/ArticuloVentaContext";
import Layout from "../common/Layout";

export default function ListadoArticulosVenta() {
  const navigate = useNavigate();
  const handlePageChange = (newPage) => setPage(newPage);
  const { articulos, setArticulos } = useContext(ArticuloVentaContext);

  const [consulta, setConsulta] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getDatos();
  }, [page, pageSize, consulta]);

  const getDatos = async () => {
    obtenerArticulosVenta(consulta, page, pageSize)
      .then((response) => {
        setArticulos(response.content);
        setTotalPages(response.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };

  const eliminar = async (id) => {
    try {
      await eliminarArticulosVenta(id);
      getDatos();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <Layout>
      <Center>
        <Box py={8} w="90%" maxWidth="1200px">
          <Heading as="h1" size="lg" textAlign="center" color="teal.500" mb={4}>
            Gestión de Artículos Venta
          </Heading>
          <HStack mb={6}>
            <Input
              placeholder="Buscar..."
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              maxWidth="300px"
            />
            <Button colorScheme="teal" onClick={getDatos}>
              Buscar
            </Button>
            <Button colorScheme="green" onClick={() => navigate("/articulo/nuevo")}>
              Agregar Articulo
            </Button>
          </HStack>

          <Table variant="striped" colorScheme="gray" width="100%">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Denominación</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {articulos.map((articulo) => (
                <Tr key={articulo.id}>
                  <Td>{articulo.id}</Td>
                  <Td>{articulo.denominacion}</Td>
                  <Td>
                    <HStack>
                      <Link to={`/articulo/${articulo.id}`}>
                        <IconButton
                          icon={<EditIcon />}
                          aria-label="Editar"
                          colorScheme="blue"
                        />
                      </Link>
                      <IconButton
                        icon={<DeleteIcon />}
                        aria-label="Eliminar"
                        colorScheme="red"
                        onClick={() => eliminar(articulo.id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Flex mt={4}>
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
