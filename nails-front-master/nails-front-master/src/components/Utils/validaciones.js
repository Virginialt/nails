export const validarFecha = (fecha) => {
    const hoy = new Date();
    const fechaIngresada = new Date(fecha);
    return fechaIngresada <= hoy;
  };
  
  export const validarClienteSeleccionado = (cliente) => {
    return cliente && cliente !== "";
  };
  