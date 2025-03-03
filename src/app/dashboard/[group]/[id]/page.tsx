"use client"; 
import { Metadata } from "next";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DashboardView from "@/components/Dashboard/DashboardView";


export default function DashboardProyectoPresupuesto() {
    const { group, id } = useParams<{ group?: string; id?: string }>();


    return (
        <DefaultLayout>
            <DashboardView />
        </DefaultLayout>
    );
}