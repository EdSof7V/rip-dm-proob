import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableDashboardList from "@/components/Tables/TableDashboardList";
import ModalForm from "@/components/Modal/ModalForm";
import FormAddDashboard from "@/components/Forms/FormAddDashboard";

export const metadata: Metadata = {
  title: "Configuraciòn | DM Ripley",
  description:
    "DM Ripley",
};

const SettingsDashboards = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto h-screen">
        <Breadcrumb pageName="Configuración de dashboards" />

        <div className="grid gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Dashboards
                </h3>
                <ModalForm title="Registrar nuevo dashboard" buttonText="Crear dashboard" >
                  <FormAddDashboard />
                </ModalForm>
              </div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
                <TableDashboardList />
              </div>

            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SettingsDashboards;
