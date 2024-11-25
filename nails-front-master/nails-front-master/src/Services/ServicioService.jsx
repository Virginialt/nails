import axios from "axios";

const BASE_URL = "http://localhost:4000/api/servicios";

export const obtenerTodosLosServicios = async () => {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (error) {
    console.error("Error obteniendo servicios:", error);
    return [];
  }
};

export const obtenerServicio = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${id}`);
    return data;
  } catch (error) {
    console.error("Error obteniendo el servicio:", error);
  }
};

export const newServicio = async (servicio) => {
  try {
    await axios.post(BASE_URL, servicio);
  } catch (error) {
    console.error("Error creando el servicio:", error);
  }
};
