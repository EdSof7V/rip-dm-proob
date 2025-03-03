"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useSession } from "next-auth/react";
import { getGroupsByUser } from "@/services/groupService";
import { getDashboardsByGroup } from "@/services/dashboardService";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

interface MenuItem {
  icon: JSX.Element | null;
  label: string;
  route: string;
  children?: { label: string; route: string; icon?: JSX.Element }[];
}

interface GroupDashboard {
  id: string;
  dashboardId: string;
  groupId: string;
  createdAt: string;
}

interface MenuSection {
  name: string;
  menuItems: MenuItem[];
}


const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  const [dashboardItems, setDashboardItems] = useState<MenuItem[]>([]);

  const { data: session, status } = useSession();
  /* const isAdmin = session?.user?.roles?.includes("Admin"); */
  const isAdmin = true;
  const userId = "user_02"



  const menuReader: MenuSection[] = [
    {
      name: "DASHBOARDS",
      menuItems: dashboardItems,
    },
  ];

  const menuAdmin: MenuSection[] = [
    {
      name: "DASHBOARDS",
      menuItems: dashboardItems,
    },

    {
      name: "ADMINITRACIÓN",
      menuItems: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
            </svg>

          ),
          label: "Configuración",
          route: "#",
          children: [
            {
              label: "Usuarios", route: "/settings/users",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
              ),
            },
            { label: "Grupos", route: "/settings/groups", },
            { label: "Dashboards", route: "/settings/dashboards", },
            { label: "Permisos", route: "/settings/permissions", },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groups = await getGroupsByUser(userId);
  
        const menuItemPromises = groups.map(async (group) => {
          let dashboards: MenuItem['children'] = [];
  
          try {
            const dashboardList = await getDashboardsByGroup(group);
  
            dashboards = dashboardList.map(({ dashboardId, name }) => ({
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                </svg>
              ),
              label: `Dashboard ${name}`, 
              route: `/dashboard/${group}/${dashboardId}`
            }));
          } catch (error) {
            console.error(`Error al obtener dashboards para el grupo ${group}:`, error);
          }
  
          return {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
              </svg>
            ),
            label: group,
            route: "#",
            children: dashboards
          };
        });
  
        const menuItems = await Promise.all(menuItemPromises);
        setDashboardItems(menuItems);
      } catch (error) {
        console.error("Error al obtener los grupos:", error);
      }
    };
  
    fetchGroups();
  }, [userId]);

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">
            <Image
              width={176}
              height={32}
              src={"/images/logo/ripley-white.png"}
              alt="Logo"
              priority
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {
              isAdmin ?
                menuAdmin.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                      {group.name}
                    </h3>

                    <ul className="mb-6 flex flex-col gap-1.5">
                      {group.menuItems.map((menuItem, menuIndex) => (
                        <SidebarItem
                          key={menuIndex}
                          item={menuItem}
                          pageName={pageName}
                          setPageName={setPageName}
                        />
                      ))}
                    </ul>
                  </div>
                ))
                : menuReader.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                      {group.name}
                    </h3>

                    <ul className="mb-6 flex flex-col gap-1.5">
                      {group.menuItems.map((menuItem, menuIndex) => (
                        <SidebarItem
                          key={menuIndex}
                          item={menuItem}
                          pageName={pageName}
                          setPageName={setPageName}
                        />
                      ))}
                    </ul>
                  </div>
                )
                )}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
