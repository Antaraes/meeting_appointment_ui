"use client";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../common/HeaderComponent";
import TextComponent from "../common/TextComponent";
import TableComponent from "../common/TableComponent";
import MobileHomeTable from "../common/MobileHomeTable";
import { FaEdit, FaSearch } from "react-icons/fa";
import useFetch from "@/hooks/useFetch";
import {
  getAllAppointment,
  getAppointmentById,
  getAppointmentByRoomID,
} from "@/services/api";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import PasscodeForm from "../Form/PasscodeForm";
import { useModalStatusStore } from "@/store/modalStatusStore";

const HomePageTable = () => {
  const modalStatusStore = useModalStatusStore();
  const columns = [
    {
      field: "room",
      headerName: "Room",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.5,
    },
    {
      field: "startTime",
      headerName: "Start-Time",
      flex: 1,
    },
    {
      field: "endTime",
      headerName: "End-Time",
      flex: 0.4,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "",
      headerName: "",
      flex: 0.5,
      renderCell: (params: any) => {
        const handleEdit = async (appointmentId: string) => {
          try {
            const appointmentDetails = await getAppointmentById({
              id: appointmentId,
            });

            modalStatusStore.setModal({
              isOpen: true,
              Modal: () => (
                <PasscodeForm event={appointmentDetails.data.data} />
              ),
            });
          } catch (error) {
            console.error("Error fetching appointment details:", error);
          }
        };

        return (
          <button
            className="transition-all duration-300 ease-in-out hover:text-secondary"
            onClick={() => handleEdit(params.id)}
          >
            <FaEdit size={20} />
          </button>
        );
      },
    },
  ];
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible((prevState) => !prevState);
  };
  const { data, isLoading } = useFetch("allAppointments", getAllAppointment);

  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (data) {
      const formattedAppointments = data.data.map((appointment: any) => ({
        id: appointment.id,
        room: appointment.room.name,
        date: dayjs(appointment.date).format("YYYY-MM-DD"),
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        department: appointment.department.name,
      }));
      setAppointments(formattedAppointments);
    }
  }, [data]);
  const filteredAppointments = appointments.filter((appointment) => {
    const values = Object.values(appointment).join("").toLowerCase();
    return values.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="mx-auto w-auto  p-0 ">
      <div className="m-0 hidden px-10 md:block">
        <div className="mx-auto flex justify-between lg:w-5/6">
          <HeaderComponent
            title="Appointment"
            className="pl-2 text-xl font-bold text-secondary/90"
          />
        </div>
        <TableComponent
          header={columns}
          tableData={appointments}
          isLoading={isLoading}
        />
      </div>
      <div className="mx-auto p-0 md:hidden">
        <div className="relative mb-3 flex justify-between px-5">
          {!isSearchVisible ? (
            <HeaderComponent
              title="Appointment"
              className="font-bold text-black"
            />
          ) : (
            <div></div>
          )}

          <button
            className={`items-end justify-end bg-transparent text-center`}
            onClick={toggleSearch}
          >
            <FaSearch size={20} />
          </button>
          <AnimatePresence>
            {isSearchVisible && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="absolute -top-2 left-0"
              >
                <input
                  type="text"
                  className="w-full rounded-3xl bg-secondary/20 px-5 py-1 text-secondary/70 outline-none placeholder:text-secondary/30"
                  placeholder="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <MobileHomeTable tableData={filteredAppointments} loading={isLoading} />
      </div>
    </div>
  );
};

export default HomePageTable;
