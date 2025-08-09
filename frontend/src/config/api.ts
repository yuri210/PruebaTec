import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
const API_KEY = import.meta.env.VITE_API_KEY || 'esto-es-pruebas-yuri';

export const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
    'Accept': 'application/json',
  },
});

// Interceptor para manejo centralizado de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Manejo específico de errores comunes
    if (error.response?.status === 401) {
      console.error('API Key inválida o faltante');
    } else if (error.response?.status === 429) {
      console.error('Rate limit excedido');
    } else if (error.response?.status >= 500) {
      console.error('Error del servidor');
    }
    
    return Promise.reject(error);
  }
);