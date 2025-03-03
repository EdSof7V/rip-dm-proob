'use client';
import { getPermissionSets } from '@/services/permissionSetService';
import React, { useEffect, useState } from 'react';

interface PermissionSet {
  name: string;
  description: string;
  permissions: string[];
  isCustom: boolean;
  status: boolean;
}

const TablePermissionSetList = () => {
  const [permissionSets, setPermissionSets] = useState<PermissionSet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPermissionSets = async () => {
      try {
        const data = await getPermissionSets();
        setPermissionSets(data);
      } catch (error) {
        console.error("Error al obtener conjuntos de permisos");
      } finally {
        setLoading(false);
      }
    };

    fetchPermissionSets();
  }, []);

  if (loading) return <p className="text-gray-500">Cargando conjuntos de permisos...</p>;

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">Nombre</th>
          <th scope="col" className="px-6 py-3">Descripción</th>
          <th scope="col" className="px-6 py-3">Permisos</th>
          <th scope="col" className="px-6 py-3">Personalizado</th>
          <th scope="col" className="px-6 py-3">Estado</th>
          <th scope="col" className="px-6 py-3">Acción</th>
        </tr>
      </thead>
      <tbody>
        {permissionSets.length > 0 ? (
          permissionSets.map((set, index) => (
            <tr
              key={set.name}
              className={`border-b border-gray-200 dark:border-gray-700 ${
                index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"
              }`}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {set.name}
              </td>
              <td className="px-6 py-4">{set.description}</td>
              <td className="px-6 py-4">{set.permissions.join(", ")}</td>
              <td className="px-6 py-4">{set.isCustom ? "Sí" : "No"}</td>
              <td className="px-6 py-4">{set.status ? "Activo" : "Inactivo"}</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Editar
                </a>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
              Actualmente no hay conjuntos de permisos disponibles
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TablePermissionSetList;
