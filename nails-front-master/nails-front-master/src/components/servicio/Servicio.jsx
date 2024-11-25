import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Heading,
  Text,
  IconButton,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { newServicio, obtenerServicio } from "../../services/ServicioService";
import { obtenerClientesForCombo } from "../../services/ClienteService";
import { obtenerTiposServiciosForCombo } from "../../services/TipoServicioService";

export default function Servicio({ title }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [servicio, setServicio] = useState({ denominacion: "" });
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [tiposServicio, setTiposServicio] = useState([]);
  const [itemsServicio, setItemsServicio] = useState([]);
  const [total, setTotal] = useState(0);
  const [errores, setErrores] = useState({ fecha: "", cliente: "", items: [] });

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  useEffect(() => {
    calcularTotal();
  }, [itemsServicio]);

  const cargarDatosIniciales = async () => {
    if (id > 0) {
      const datosServicio = await obtenerServicio(id);
      setServicio(datosServicio);
      setClienteSeleccionado(String(datosServicio.cliente.id));
      setFecha(new Date(datosServicio.fechaDocumento).toISOString().split("T")[0]);
      setItemsServicio(datosServicio.listaItems);
    }
    setClientes(await obtenerClientesForCombo());
    setTiposServicio(await obtenerTiposServiciosForCombo());
  };

  const calcularTotal = () => {
    const totalCalculado = itemsServicio.reduce(
      (acumulado, item) => acumulado + (parseFloat(item.precio) || 0),
      0
    );
    setTotal(totalCalculado);
  };

  const agregarItemServicio = () => {
    setItemsServicio([...itemsServicio, { tipoServicio: "", precio: "", observaciones: "" }]);
  };

  const eliminarItemServicio = (indice) => {
    const nuevosItems = [...itemsServicio];
    nuevosItems.splice(indice, 1);
    setItemsServicio(nuevosItems);
  };

  const actualizarItemServicio = (indice, campo, valor) => {
    const nuevosItems = [...itemsServicio];
    nuevosItems[indice] = { ...nuevosItems[indice], [campo]: valor };
    setItemsServicio(nuevosItems);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!clienteSeleccionado) {
      setErrores((prev) => ({ ...prev, cliente: "Debe seleccionar un cliente" }));
      return;
    }

    if (new Date(fecha) > new Date()) {
      setErrores((prev) => ({ ...prev, fecha: "La fecha no puede ser mayor a la actual" }));
      return;
    }

    const datos = {
      ...servicio,
      cliente: clienteSeleccionado,
      fechaDocumento: fecha,
      listaItems: itemsServicio,
      total,
    };

    await newServicio(datos);
    navigate("/servicioList");
  };

  return (
    <Box maxW="6xl" mx="auto" mt={8} p={6} bg="white" boxShadow="md" borderRadius="lg">
      <Heading as="h1" size="lg" mb={6} color="teal.500">
        {title}
      </Heading>
      <form onSubmit={manejarEnvio}>
        <FormControl mb={4} isInvalid={errores.cliente}>
          <FormLabel>Cliente:</FormLabel>
          <Select
            placeholder="Seleccione..."
            value={clienteSeleccionado}
            onChange={(e) => setClienteSeleccionado(e.target.value)}
          >
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.razonSocial}
              </option>
            ))}
          </Select>
          {errores.cliente && (
            <Alert mt={2} status="error">
              <AlertIcon />
              {errores.cliente}
            </Alert>
          )}
        </FormControl>

        <FormControl mb={4} isInvalid={errores.fecha}>
          <FormLabel>Fecha:</FormLabel>
          <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          {errores.fecha && (
            <Alert mt={2} status="error">
              <AlertIcon />
              {errores.fecha}
            </Alert>
          )}
        </FormControl>

        <Heading as="h3" size="md" mt={8} mb={4} color="gray.600">
          Items del Servicio
        </Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead bg="teal.500">
              <Tr>
                <Th color="white">Tipo de Servicio</Th>
                <Th color="white">Precio</Th>
                <Th color="white">Observaciones</Th>
                <Th color="white">Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {itemsServicio.map((item, index) => (
                <Tr key={index}>
                  <Td>
                    <Select
                      placeholder="Seleccione..."
                      value={item.tipoServicio || ""}
                      onChange={(e) => actualizarItemServicio(index, "tipoServicio", e.target.value)}
                    >
                      {tiposServicio.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>
                          {tipo.denominacion}
                        </option>
                      ))}
                    </Select>
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      value={item.precio || ""}
                      onChange={(e) => actualizarItemServicio(index, "precio", e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="text"
                      value={item.observaciones || ""}
                      onChange={(e) => actualizarItemServicio(index, "observaciones", e.target.value)}
                    />
                  </Td>
                  <Td>
                    <IconButton
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      onClick={() => eliminarItemServicio(index)}
                      aria-label="Eliminar item"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Button
          mt={4}
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={agregarItemServicio}
        >
          Agregar Item
        </Button>

        <Text fontSize="xl" fontWeight="bold" mt={6} color="gray.700">
          Total: ${total.toFixed(2)}
        </Text>

        <div>
          <Button mt={6} colorScheme="teal" type="submit">
            Guardar
          </Button>
          <Button  mt={6} type="button" style={{ backgroundColor: "grey", marginLeft: "10px" }} onClick={() => navigate("/servicio/listado")}>
            Volver
          </Button>
        </div>
      </form>
    </Box>
  );
}
