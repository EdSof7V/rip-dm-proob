import ECommerce from "@/components/Dashboard/ProyectoPresupuesto";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "./signin/page";

export const metadata: Metadata = {
  title:
    "ACloud Dashboard Manager - RIPLEY | ACloudAdmin - ACloud Dashboard Manager",
  description: "This is ACloud Dashboard Manger - RIPLEY",
};

export default function Home() {
  return (
    <>
      <SignIn />
    </>
  );
}
