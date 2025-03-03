"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { Dashboard } from "@/types/dashboard";
import { getDashboardById } from "@/services/dashboardService";

const DashboardView: React.FC = () => {
  const { id, group } = useParams<{ id: string; group?: string }>();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getDashboardById(id)
        .then(setDashboard)
        .catch(() => setError("Error al cargar el dashboard"));
    }
  }, [id]);

  return (
    <>
      <Breadcrumb pageName={dashboard ? dashboard.name : "Cargando..."} />

      {error && <p className="text-red-500">{error}</p>}
      {dashboard ? (
        <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
          <p>{dashboard.description}</p>

          {dashboard.tags && (
            <div className="mt-2">
              <strong>Tags:</strong>{" "}
              {dashboard.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-md text-sm mr-2">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <iframe
            width="100%"
            height="650"
            src={dashboard.embedUrl}
            allowFullScreen
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            className="rounded-lg shadow-md  dark:bg-gray-800 dark:border dark:border-gray-700 transition-all mt-2"
          />
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </>
  );
};

export default DashboardView;
