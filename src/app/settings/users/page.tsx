import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ModalForm from "@/components/Modal/ModalForm";
import FormAddUser from "@/components/Forms/FormAddUser";
import TableUserList from "@/components/Tables/TableUserList";

export const metadata: Metadata = {
  title: "Configuraciòn | DM Ripley",
  description:
    "DM Ripley",
};

const SettingsUsers = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto h-screen">
        <Breadcrumb pageName="Configuración de usuarios" />

        <div className="grid gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Usuarios
                </h3>
                <ModalForm title="Registrar nuevo usuario" buttonText="Añadir usuario" >
                  <FormAddUser />
                </ModalForm>
              </div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
                <TableUserList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SettingsUsers;
