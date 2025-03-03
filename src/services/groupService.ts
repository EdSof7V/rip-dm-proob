import api from "./api";

export interface Group {
  id: string;
  name: string;
  description: string;
  ownerIds: string[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserGroup {
  id: string;
  userId: string;
  groupId: string;
  joinedAt: string;
}

export const getGroups = async (): Promise<Group[]> => {
  try {
    const response = await api.get<Group[]>("/groups");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los grupos", error);
    throw error;
  }
};

export const getGroupsByUser = async (userId: string): Promise<string[]> => {
  try {
    const response = await api.get<UserGroup[]>(`/user-groups/user/${userId}`);
    return response.data.map(userGroup => userGroup.groupId);
  } catch (error) {
    console.error(`Error al obtener los grupos del usuario ${userId}:`, error);
    throw error;
  }
};