"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, List, LayoutDashboard, Warehouse } from "lucide-react";

const sidebarLinks = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard className="mr-3" />,
  },
  {
    name: "Packing",
    path: "/admin/packing",
    icon: <Package className="mr-3" />,
  },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className=" bg-[#0d409c] text-white h-screen flex flex-col  sticky top-0 shadow-md">
      <div className="p-4  text-2xl font-bold">
              <Link href="/" passHref className="flex items-center md:gap-1.5">
                  <Warehouse/>
          <span className="text-white lg:block hidden">Warehouse</span>
        </Link>
      </div>

      <div className="mt-8">
        <ul>
          {sidebarLinks.map((link) => (
            <li key={link.path}>
              
              <Link
                href={link.path}
                className={`p-4 flex items-center hover:bg-gray-700 ${
                  router.pathname === link.path ? "bg-blue-600" : ""
                }`}
              >
                <div className="lg:w-30 w-inherit">
                {link.icon}
                </div>
                <span className="lg:block hidden">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
