import axios from 'axios';

const API = 'http://192.168.1.77:3000/api'; // Asegúrate de que la URL sea correcta y accesible desde tu dispositivo

export const addPropertyRequest = async (formData) => {
  try {
    const response = await axios.post(`${API}/properties`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response; // Devuelve la respuesta del backend
  } catch (error) {
    console.error('Error al agregar propiedad:', error);
    throw error; // Propaga el error para que pueda ser manejado por el frontend
  }
};

export const getProperties = async () => {
  try {
    const response = await axios.get(`${API}/properties`);
    return response; // Devuelve la respuesta del backend
  } catch (error) {
    console.error('Error al obtener propiedades:', error);
    throw error; // Propaga el error para que pueda ser manejado por el frontend
  }
};
