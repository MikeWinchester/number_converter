import axios from 'axios';
import { RespuestaCompleta } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const convertirTexto = async (texto: string): Promise<RespuestaCompleta> => {
  const response = await api.post<RespuestaCompleta>('/api/convertir', { texto });
  return response.data;
};

export const convertirArchivo = async (archivo: File): Promise<RespuestaCompleta> => {
  const formData = new FormData();
  formData.append('file', archivo);

  const response = await api.post<RespuestaCompleta>('/api/convertir-archivo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const verificarSalud = async (): Promise<{ status: string; mensaje: string }> => {
  const response = await api.get('/health');
  return response.data;
};