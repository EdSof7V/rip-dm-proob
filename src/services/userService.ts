import api from "./api";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const createUser = async (userData: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> => {
  try {
    const response = await api.post<User>("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

export const updateUser = async (
  userId: string,
  data: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
) => {
  try {
    const response = await api.put<User>(`/users/${userId}`, { 
      ...data, 
      status: data.status ?? true 
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario ${userId}:`, error);
    throw error;
  }
};