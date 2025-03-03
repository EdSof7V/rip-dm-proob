import { useForm } from "react-hook-form";
import { assignDashboardToGroup } from "@/services/dashboardService";
import { getGroups } from "@/services/groupService";
import { useEffect, useState } from "react";
import Toast from "../Toast/Toast";

interface IFormInput {
  groupId: string;
}

interface Group {
  id: string;
  name: string;
}

const FormAssignDashboard = ({ setOpen, dashboardId, dashboardName }: { setOpen: (open: boolean) => void, dashboardId: string, dashboardName: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const [groups, setGroups] = useState<Group[]>([]);
  const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getGroups();
        setGroups(data);
      } catch (error) {
        console.error("Error al obtener los grupos", error);
      }
    };

    fetchGroups();
  }, []);

  const onSubmit = async (data: IFormInput) => {
    try {
      await assignDashboardToGroup({ dashboardId, groupId: data.groupId });

      setToast({ message: "Dashboard asignado con éxito.", type: "success" });

      setTimeout(() => {
        setOpen(false);
        window.location.reload(); 
      }, 2500);
    } catch (error) {
      setToast({ message: "Error al asignar dashboard.", type: "error" });
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dashboard</label>
          <input
            type="text"
            value={dashboardName}
            disabled
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="groups" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Seleccionar Grupo
          </label>
          <select
            id="groups"
            {...register("groupId", { required: "Selecciona un grupo" })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Seleccione un grupo</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
          {errors.groupId && <p className="text-red-500 text-sm">{errors.groupId.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 p-2 bg-blue-600 text-white rounded-lg w-full disabled:opacity-50"
        >
          {isSubmitting ? "Asignando..." : "Asignar Dashboard"}
        </button>
      </form>
    </>
  );
};

export default FormAssignDashboard;
