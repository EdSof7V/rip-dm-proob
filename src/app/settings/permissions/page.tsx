import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ModalForm from "@/components/Modal/ModalForm";
import FormAddPermissionSet from "@/components/Forms/FormAddPermissionSet";
import TablePermissionSetList from "@/components/Tables/TablePermissionSetList";

export const metadata: Metadata = {
  title: "Configuraciòn | DM Ripley",
  description:
    "DM Ripley",
};

const SettingsPermission = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto h-screen">
        <Breadcrumb pageName="Configuración de Permisos" />

        <div className="grid gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Permisos
                </h3>
                <ModalForm title="Asignar permisos" buttonText="Asignar permisos" >
                  <FormAddPermissionSet />
                </ModalForm>
              </div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
                <TablePermissionSetList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SettingsPermission;
