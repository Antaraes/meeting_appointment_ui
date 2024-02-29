"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Spinner from "./common/Spinner";

let loginAdmin: string | null;

const Navbar = () => {
  const [shouldSideBarOpen, setShouldSidebarOpen] = useState(false);
  const [loginAdmin, setLoginAdmin] = useState<any>();
  const pathname = usePathname();
  const router = useRouter();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const admin = getCookie("admin");

  useEffect(() => {
    // if (typeof window !== "undefined") {
    //   // Check if window is defined (browser environment)
    //   loginAdmin = localStorage.getItem("admin");
    // } else {
    //   // Handle case where localStorage is not available (e.g., server-side rendering)
    //   loginAdmin = null; // or any default value you want to use
    // }
    setLoginAdmin(admin);
  }, [admin]);
  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await deleteCookie("admin");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLogoutLoading(false);
    }
  };

  console.log(loginAdmin);

  return (
    <>
      <nav className=" sticky top-0 z-10 mx-auto flex h-16 items-center justify-between bg-secondary  px-4 ">
        <Link
          className=" font-signature link-underline ml-2 text-4xl  font-bold text-text-white"
          href="/"
        >
          ACE
        </Link>
        {loginAdmin ? (
          <>
            <ul className="mr-5 hidden items-center gap-x-6 font-medium text-text-white md:flex">
              <li
                className={`${pathname === "/" ? "font-semibold text-accent" : "text-text-white"}`}
              >
                <Link href="/" target="_blank">
                  Visit Site
                </Link>
              </li>
              <li
                className={`${pathname === "/dashboard" ? "font-semibold text-accent" : "text-text-white"}`}
              >
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li
                className={`${pathname === "/dashboard/appointment" ? "font-semibold text-accent" : "text-text-white"}`}
              >
                <Link href="/dashboard/appointment">Appointments</Link>
              </li>
              <li
                className={`${pathname === "/dashboard/rooms" ? "font-semibold text-accent" : "text-text-white"}`}
              >
                <Link href="/dashboard/rooms">Rooms</Link>
              </li>
              <li
                className={`${pathname === "/dashboard/departments" ? "font-semibold text-accent" : "text-text-white"}`}
              >
                <Link href="/dashboard/departments">Departments</Link>
              </li>
              <li
                className={`${pathname === "/dashboard/holidays" ? "font-semibold text-accent" : "text-text-white"}`}
              >
                <Link href="/dashboard/holidays">Holidays</Link>
              </li>
              <li>
                <button
                  className=" rounded-3xl bg-accent p-2 font-bold text-text-white transition-all duration-300 ease-in-out hover:bg-[#05c780]"
                  onClick={handleLogout}
                >
                  {logoutLoading ? <Spinner sm /> : "Logout"}
                </button>
              </li>
            </ul>
            <FaBars
              size={25}
              className="text-accent md:hidden"
              onClick={() => setShouldSidebarOpen(true)}
            />
          </>
        ) : (
          <ul>
            <li className=" rounded-3xl bg-accent p-2 font-bold text-text-white transition-all duration-300 ease-in-out hover:bg-[#05c780]">
              <Link href="/login">Login</Link>
            </li>
          </ul>
        )}
      </nav>

      <div
        onClick={() => setShouldSidebarOpen(false)}
        className={`${shouldSideBarOpen ? "z-20 opacity-100" : "-z-20 opacity-0"} fixed bottom-0 left-0 right-0 top-0 h-screen w-screen  bg-secondary/30 transition-all duration-100`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-secondary ${shouldSideBarOpen ? "translate-x-1/3" : "translate-x-full"} flex h-full flex-col justify-between p-5 transition-all duration-500 ease-in-out`}
        >
          <div>
            <FaCircleXmark
              size={20}
              className="mb-6 inline-block text-accent"
              onClick={() => setShouldSidebarOpen(false)}
            />
            <ul className="mr-5 font-medium text-text-white">
              <li
                className={`${pathname === "/" ? "font-semibold text-accent" : "text-text-white"} mt-8`}
              >
                <Link href="/" target="_blank">
                  Visit Site
                </Link>
              </li>
              <li
                className={`${pathname === "/dashboard" ? "font-semibold text-accent" : "text-text-white"} mt-8`}
              >
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li
                className={`${pathname === "/dashboard/appointment" ? "font-semibold text-accent" : "text-text-white"} mt-8`}
              >
                <Link href="/dashboard/appointment">Appointments</Link>
              </li>
              <li
                className={`${pathname === "/dashboard/rooms" ? "font-semibold text-accent" : "text-text-white"} mt-8`}
              >
                <Link href="/dashboard/rooms">Rooms</Link>
              </li>
              <li
                className={`${pathname === "/dashboard/departments" ? "font-semibold text-accent" : "text-text-white"} mt-8`}
              >
                <Link href="/dashboard/departments">Departments</Link>
              </li>
              <li
                className={`${pathname === "/dashboard/holidays" ? "font-semibold text-accent" : "text-text-white"} mt-8`}
              >
                <Link href="/dashboard/holidays">Holidays</Link>
              </li>
            </ul>
          </div>
          <button
            onClick={handleLogout}
            className="w-3/5 rounded-3xl bg-accent p-2 text-sm font-bold text-text-white"
          >
            {logoutLoading ? <Spinner sm /> : "Logout"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
