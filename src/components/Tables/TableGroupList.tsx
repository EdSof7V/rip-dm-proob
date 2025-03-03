'use client';
import { getGroups } from '@/services/groupService';
import React, { useEffect, useState } from 'react';
import ModalFormIcon from '../Modal/ModalFormIcon';

interface Group {
    name: string;
    description: string;
    ownerIds: string[];
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

const TableGroupList = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const data = await getGroups();
                setGroups(data);
                setFilteredGroups(data);
            } catch (error) {
                console.error("Error al obtener grupos");
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    useEffect(() => {
        const filtered = groups.filter(group =>
            group.name.toLowerCase().includes(search.toLowerCase()) ||
            group.description.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredGroups(filtered);
        setCurrentPage(1);
    }, [search, groups]);

    const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
    const paginatedGroups = filteredGroups.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) return <p className="text-gray-500">Cargando grupos...</p>;

    return (
        <div className="w-full">
            <input
                type="text"
                placeholder="Buscar grupo..."
                className="mb-4 p-2 border border-blue-700 rounded-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Nombre</th>
                        <th className="px-6 py-3">Descripción</th>
                        <th className="px-6 py-3">Administradores</th>
                        <th className="px-6 py-3">Estado</th>
                        <th className="px-6 py-3">Fecha de Creación</th>
                        <th className="px-6 py-3">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedGroups.length > 0 ? (
                        paginatedGroups.map((group, index) => (
                            <tr
                                key={group.name}
                                className={`border-b border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}`}
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {group.name}
                                </td>
                                <td className="px-6 py-4">{group.description}</td>
                                <td className="px-6 py-4">{group.ownerIds.join(", ")}</td>
                                <td className="px-6 py-4">{group.status ? "Activo" : "Inactivo"}</td>
                                <td className="px-6 py-4">{new Date(group.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 flex gap-2">
                                    <ModalFormIcon
                                        title="Agregar Usuario"
                                        trigger={
                                            <button type="button" className="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center me-2 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                                </svg>
                                            </button>
                                        }
                                    >
                                        {(setOpen) => (
                                            <div>
                                                <p>Formulario o contenido del modal aquí.</p>
                                                <button
                                                    onClick={() => setOpen(false)}
                                                    className="mt-4 p-2 bg-red-500 text-white rounded"
                                                >
                                                    Cerrar
                                                </button>
                                            </div>
                                        )}
                                    </ModalFormIcon>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                No se encontraron resultados
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div className="mt-4 flex justify-center items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span className="px-4 py-2">{currentPage} de {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}

export default TableGroupList;
