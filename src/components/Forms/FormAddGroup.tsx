'use client';
import { useForm } from "react-hook-form";

interface IFormInput {
    name: string;
    description: string;
    ownerIds: string[];
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const FormAddGroup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>();

    const onSubmit = (data: IFormInput) => {
        alert(JSON.stringify(data));
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    {...register("name", { required: true })}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Nombre del grupo
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group md:col-span-2">
                <textarea
                    {...register("description", { required: true })}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Descripción del grupo
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group md:col-span-2">
                <input
                    type="text"
                    {...register("ownerIds", { required: true })}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    IDs de administradores
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group md:col-span-2">
                <input
                    type="checkbox"
                    {...register("status")}
                    className="mr-2"
                />
                <label className="text-sm text-gray-500 dark:text-gray-400">Estado activo</label>
            </div>
            <input type="hidden" {...register("createdAt")} />
            <input type="hidden" {...register("updatedAt")} />
            <input type="submit" className="mt-4 p-2 bg-blue-600 text-white rounded cursor-pointer" />
        </form>
    );
};

export default FormAddGroup;
