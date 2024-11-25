import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  VStack,
  useBreakpointValue,
  useDisclosure,
  Collapse,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function Layout() {
  const { isOpen, onToggle } = useDisclosure();
  const displayNavItems = useBreakpointValue({ base: "none", md: "flex" });

  return (
    <Box bg="teal.500" px={4} boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Box>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Nails System
          </Link>
        </Box>

        {/* IconButton for mobile menu */}
        <IconButton
          display={{ md: "none" }}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={onToggle}
          borderRadius="full"
          bg="white"
          color="teal.500"
          _hover={{ bg: "teal.100" }}
          size="lg"
        />

        {/* Desktop Menu */}
        <HStack spacing={8} display={displayNavItems} alignItems="center">
          <Box position="relative">
            <Button
              variant="link"
              color="white"
              fontWeight="medium"
              _hover={{ textDecoration: "underline" }}
              onClick={onToggle}
            >
              Configuración
            </Button>

            {/* Dropdown Menu */}
            <Collapse in={isOpen} animateOpacity>
              <VStack
                align="start"
                bg="teal.600"
                position="absolute"
                mt={2}
                boxShadow="lg"
                py={2}
                px={4}
                borderRadius="md"
                spacing={1}
              >
                <Link to="/cliente/listado">
                  <Text
                    color="white"
                    fontWeight="medium"
                    _hover={{ color: "teal.100", transform: "translateX(4px)", transition: "all 0.2s" }}
                  >
                    Cliente
                  </Text>
                </Link>
                <Link to="/linea/listado">
                  <Text
                    color="white"
                    fontWeight="medium"
                    _hover={{ color: "teal.100", transform: "translateX(4px)", transition: "all 0.2s" }}
                  >
                    Linea
                  </Text>
                </Link>
                <Link to="/articulo/listado">
                  <Text
                    color="white"
                    fontWeight="medium"
                    _hover={{ color: "teal.100", transform: "translateX(4px)", transition: "all 0.2s" }}
                  >
                    Articulo
                  </Text>
                </Link>
                <Link to="/tipo-servicio/listado">
                  <Text
                    color="white"
                    fontWeight="medium"
                    _hover={{ color: "teal.100", transform: "translateX(4px)", transition: "all 0.2s" }}
                  >
                    Tipo Servicio
                  </Text>
                </Link>
                <Link to="/servicio/listado">
                  <Text
                    color="white"
                    fontWeight="medium"
                    _hover={{ color: "teal.100", transform: "translateX(4px)", transition: "all 0.2s" }}
                  >
                    Servicio
                  </Text>
                </Link>
              </VStack>
            </Collapse>
          </Box>
        </HStack>
      </Flex>

      {/* Mobile Menu */}
      <Collapse in={isOpen} animateOpacity>
        <VStack
          bg="teal.600"
          display={{ md: "none" }}
          spacing={4}
          p={4}
          align="start"
          rounded="md"
          mt={4}
          boxShadow="lg"
        >
          <Link to="/cliente/listado">
            <Text color="white" fontWeight="medium" _hover={{ color: "teal.100" }}>
              Cliente
            </Text>
          </Link>
          <Link to="/linea/listado">
            <Text color="white" fontWeight="medium" _hover={{ color: "teal.100" }}>
              Linea
            </Text>
          </Link>
          <Link to="/articulo/listado">
            <Text color="white" fontWeight="medium" _hover={{ color: "teal.100" }}>
              Articulo
            </Text>
          </Link>
          <Link to="/tipo-servicio/listado">
            <Text color="white" fontWeight="medium" _hover={{ color: "teal.100" }}>
              Tipo Servicio
            </Text>
          </Link>
          <Link to="/servicio/listado">
            <Text color="white" fontWeight="medium" _hover={{ color: "teal.100" }}>
              Servicio
            </Text>
          </Link>
        </VStack>
      </Collapse>
    </Box>
  );
}
