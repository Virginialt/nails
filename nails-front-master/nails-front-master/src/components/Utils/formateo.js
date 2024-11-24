export const formatearMoneda = (cantidad) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(cantidad);
  };
  