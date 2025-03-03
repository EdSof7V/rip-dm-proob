import api from "./api";

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  embedUrl: string;
  creatorId: string;
  tags: string[];
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GroupDashboard {
  id: string;
  dashboardId: string;
  groupId: string;
  name: string;
  createdAt: string;
}

export interface AssignDashboardPayload {
  dashboardId: string;
  groupId: string;
}


export const getDashboards = async (): Promise<Dashboard[]> => {
  try {
    const response = await api.get<Dashboard[]>("/dashboards");
    return response.data;
  } catch (error) {
    console.error("Error al obtener dashboards:", error);
    throw error;
  }
};

export const getDashboardById = async (id: string): Promise<Dashboard> => {
  try {
    const response = await api.get<Dashboard>(`/dashboards/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el dashboard:", error);
    throw error;
  }
};

export const getDashboardsByGroup = async (groupId: string): Promise<{ dashboardId: string; name: string }[]> => {
  try {
    const response = await api.get<GroupDashboard[]>(`/dashboard-groups/group/${groupId}`);
    return response.data.map(dashboard => ({
      dashboardId: dashboard.dashboardId,
      name: dashboard.name
    }));
  } catch (error) {
    console.error(`Error al obtener dashboards del grupo ${groupId}:`, error);
    throw error;
  }
};

export const assignDashboardToGroup = async (data: AssignDashboardPayload) => {
  try {
    const response = await api.post("/dashboard-groups", data);
    return response.data;
  } catch (error) {
    console.error("Error al asignar el dashboard al grupo:", error);
    throw error;
  }
};