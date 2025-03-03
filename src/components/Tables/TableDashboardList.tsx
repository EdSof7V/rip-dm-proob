'use client';
import { getDashboards } from '@/services/dashboardService';
import React, { useEffect, useState } from 'react';
import ModalFormIcon from '../Modal/ModalFormIcon';
import FormAssignDashboard from '../Forms/FormAssignDashboard';
import ModalDashboardView from '../Modal/ModalDashboardView';

interface Dashboard {
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

const TableDashboardList = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dashboardsPerPage = 5;

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const data = await getDashboards();
        setDashboards(data);
      } catch (error) {
        console.error("Error al obtener dashboards", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboards();
  }, []);

  const filteredDashboards = dashboards.filter(dashboard =>
    dashboard.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastDashboard = currentPage * dashboardsPerPage;
  const indexOfFirstDashboard = indexOfLastDashboard - dashboardsPerPage;
  const currentDashboards = filteredDashboards.slice(indexOfFirstDashboard, indexOfLastDashboard);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) return <p className="text-gray-500">Cargando dashboards...</p>;

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar dashboard..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-blue-700 rounded-md"
        />
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Nombre</th>
            <th scope="col" className="px-6 py-3">Descripción</th>
            <th scope="col" className="px-6 py-3">URL de Embebido</th>
            <th scope="col" className="px-6 py-3">Creador</th>
            <th scope="col" className="px-6 py-3">Etiquetas</th>
            <th scope="col" className="px-6 py-3">Estado</th>
            <th scope="col" className="px-6 py-3">Fecha de Creación</th>
            <th scope="col" className="px-6 py-3">Acción</th>
          </tr>
        </thead>
        <tbody>
          {currentDashboards.length > 0 ? (
            currentDashboards.map((dashboard, index) => (
              <tr
                key={dashboard.id}
                className={`border-b border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}`}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dashboard.name}</td>
                <td className="px-6 py-4">{dashboard.description}</td>
                <td className="px-6 py-4">
                  <ModalDashboardView
                    title={dashboard.name}
                    trigger={<button type="button" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </button>}
                  >
                    <div className="p-4">
                      <iframe src={dashboard.embedUrl} className="w-full h-150 border border-gray-300 rounded-lg" allowFullScreen></iframe>
                    </div>
                  </ModalDashboardView>
                </td>
                <td className="px-6 py-4">{dashboard.creatorId}</td>
                <td className="px-6 py-4">{dashboard.tags.join(", ")}</td>
                <td className="px-6 py-4">{dashboard.status ? "Activo" : "Inactivo"}</td>
                <td className="px-6 py-4">{dashboard.createdAt ? new Date(dashboard.createdAt).toLocaleDateString() : "N/A"}</td>
                <td className="px-6 py-4 flex gap-2 items-center">
                <ModalFormIcon
                  title="Editar dashboard"
                  trigger={
                    <button type="button" className="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center me-2 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                    </button>
                  }
                >
                  {(setOpen) => (
                    <p>text</p>
                  )}
                </ModalFormIcon>
                <ModalFormIcon
                  title="Asignar dashboard a grupo"
                  trigger={
                    <button type="button" className="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center me-2 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                      </svg>
                    </button>
                  }
                >
                  {(setOpen) => (
                    <FormAssignDashboard setOpen={setOpen} dashboardId={dashboard.id} dashboardName={dashboard.name} />
                  )}
                </ModalFormIcon>
              </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-6 py-4 text-center text-gray-500">No hay dashboards disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredDashboards.length / dashboardsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className="mx-1 px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300">
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TableDashboardList;

