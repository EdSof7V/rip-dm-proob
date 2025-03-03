'use client';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { updateUser } from "@/services/userService";
import Toast from "../Toast/Toast";

interface IFormInput {
    id: string;
    firstName: string;
    lastName: string;
    status: boolean;
    email: string;
}

const FormEditUser = ({ user, setOpen }: { user: IFormInput; setOpen: (open: boolean) => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue
    } = useForm<IFormInput>({
        defaultValues: user,
    });

    useEffect(() => {
        reset(user);
    }, [user, reset]);

    const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);

    const onSubmit = async (data: IFormInput) => {
        try {
            await updateUser(user.id, data);
            setToast({ message: "Usuario actualizado con éxito.", type: "success" });

            setTimeout(() => {
                setOpen(false);
            }, 1500);
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            setToast({ message: "Error al actualizar usuario.", type: "error" });
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
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent dark:bg-gray-800 border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <label className="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400">
                        Nombre
                    </label>
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        {...register("lastName", { required: "El apellido es obligatorio" })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-transparent dark:bg-gray-800 border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <label className="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400">
                        Apellido
                    </label>
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>

                <div className="relative z-0 w-full mb-5 group md:col-span-2">
                    <input
                        type="text"
                        value={user.email}
                        disabled
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 border-0 border-b-2 border-gray-300 dark:border-gray-600 peer"
                    />
                    <label className="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400">
                        Correo electrónico
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group md:col-span-2 flex items-center">
                    <input
                        type="checkbox"
                        {...register("status")}
                        defaultChecked={user.status}
                        onChange={(e) => setValue("status", e.target.checked)}
                        className="mr-2"
                    />
                    <label className="text-sm text-gray-500 dark:text-gray-400">Estado activo</label>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 p-2 bg-blue-600 text-white dark:bg-blue-500 rounded cursor-pointer disabled:opacity-50"
                >
                    {isSubmitting ? "Actualizando..." : "Actualizar"}
                </button>
            </form>
        </>
    );
};

export default FormEditUser;
