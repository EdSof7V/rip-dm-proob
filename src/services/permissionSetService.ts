import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

export interface PermissionSet {
  name: string;
  description: string;
  permissions: string[];
  isCustom: boolean;
  status: boolean;
}

export const getPermissionSets = async (): Promise<PermissionSet[]> => {
  try {
    const response = await axios.get<PermissionSet[]>(`${API_URL}/permissionsets`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los conjuntos de permisos', error);
    throw error;
  }
};
