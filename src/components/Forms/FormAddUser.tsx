'use client';
import { useForm } from "react-hook-form";
import { createUser } from "@/services/userService";
import { useState, useEffect } from "react";
import Toast from "../Toast/Toast";

interface IFormInput {
  email: string;
  firstName: string;
  lastName: string;
  status: boolean;
}



const FormAddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInput>();

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const onSubmit = async (data: IFormInput) => {
    try {
      await createUser(data);
      setToast({ message: "Usuario registrado con éxito.", type: "success" });
      reset(); 
      setTimeout(() => {
        setToast(null);
      }, 2000);
    } catch (error) {
      setToast({ message: "Error al registrar usuario.", type: "error" });
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            {...register("firstName", { required: "El nombre es obligatorio" })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600">
            Nombre
          </label>
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            {...register("lastName", { required: "El apellido es obligatorio" })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600">
            Apellido
          </label>
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>

        <div className="relative z-0 w-full mb-5 group md:col-span-2">
          <input
            type="email"
            {...register("email", { required: "El correo es obligatorio" })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600">
            Correo electrónico
          </label>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="relative z-0 w-full mb-5 group md:col-span-2 flex items-center">
          <input type="checkbox" {...register("status")} className="mr-2" />
          <label className="text-sm text-gray-500 dark:text-gray-400">Estado activo</label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 p-2 bg-blue-600 text-white rounded cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </>
  );
};

export default FormAddUser;
