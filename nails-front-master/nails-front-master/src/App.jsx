import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Estilos
import "./styles/App.css"

// Layout
import Menu from "./components/common/Menu"

// Cliente
import ListadoCliente from "./components/cliente/ListadoCliente";
import Cliente from "./components/cliente/Cliente";
import ClienteProvider from "./contexts/ClienteContext";

// Línea
import ListadoLinea from "./components/linea/ListadoLinea";
import Linea from "./components/linea/Linea";
import LineaProvider from "./contexts/LineaContext";

// Artículos de Venta
import ListadoArticulosVenta from "./components/articulo/ListadoArticulosVenta";
import ArticuloVenta from "./components/articulo/ArticuloVenta";
import ArticuloVentaProvider from "./contexts/ArticuloVentaContext";

// Tipo de Servicio
import ListadoTipoServicio from "./components/tipoServicio/ListadoTipoServicio";
import TipoServicio from "./components/tipoServicio/TipoServicio";
import TipoServicioProvider from "./contexts/TipoServicioContext";

// Servicio
import ListadoServicio from "./components/servicio/ListadoServicio";
import Servicio from "./components/servicio/Servicio";
import ServicioProvider from "./contexts/ServicioContext";

// Componente para proteger rutas con Provider
const withProvider = (Provider, Component, props) => (
  <Provider>
    <Component {...props} />
  </Provider>
);

const App = () => {
  return (
    <Router>
        <Routes>
          {/* Rutas vacia */}
          <Route
            path="/"
            element={(<Menu />)}
          />
          {/* Rutas de Cliente */}
          <Route
            path="/cliente/listado"
            element={withProvider(ClienteProvider, ListadoCliente)}
          />
          <Route
            path="/cliente/nuevo"
            element={withProvider(ClienteProvider, Cliente, { title: "Nuevo" })}
          />
          <Route
            path="/cliente/editar/:id"
            element={withProvider(ClienteProvider, Cliente, { title: "Editar" })}
          />

          {/* Rutas de Línea */}
          <Route
            path="/linea/listado"
            element={withProvider(LineaProvider, ListadoLinea)}
          />
          <Route
            path="/linea/nuevo"
            element={withProvider(LineaProvider, Linea, { title: "Nuevo" })}
          />
          <Route
            path="/linea/editar/:id"
            element={withProvider(LineaProvider, Linea, { title: "Editar" })}
          />

          {/* Rutas de Artículos de Venta */}
          <Route
            path="/articulo/listado"
            element={withProvider(
              ArticuloVentaProvider,
              ListadoArticulosVenta
            )}
          />
          <Route
            path="/articulo/nuevo"
            element={withProvider(ArticuloVentaProvider, ArticuloVenta, {
              title: "Nuevo",
            })}
          />
          <Route
            path="/articulo/editar/:id"
            element={withProvider(ArticuloVentaProvider, ArticuloVenta, {
              title: "Editar",
            })}
          />

          {/* Rutas de Tipo de Servicio */}
          <Route
            path="/tipo-servicio/listado"
            element={withProvider(
              TipoServicioProvider,
              ListadoTipoServicio
            )}
          />
          <Route
            path="/tipo-servicio/nuevo"
            element={withProvider(TipoServicioProvider, TipoServicio, {
              title: "Nuevo",
            })}
          />
          <Route
            path="/tipo-servicio/editar/:id"
            element={withProvider(TipoServicioProvider, TipoServicio, {
              title: "Editar",
            })}
          />

          {/* Rutas de Servicio */}
          <Route
            path="/servicio/listado"
            element={withProvider(ServicioProvider, ListadoServicio)}
          />
          <Route
            path="/servicio/nuevo"
            element={withProvider(ServicioProvider, Servicio, {
              title: "Nuevo",
            })}
          />
          <Route
            path="/servicio/editar/:id"
            element={withProvider(ServicioProvider, Servicio, {
              title: "Editar",
            })}
          />
        </Routes>
    </Router>
  );
};

export default App;
