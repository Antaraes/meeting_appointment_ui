import { useModalStatusStore } from "@/store/modalStatusStore";
import React from "react";
import PasscodeForm from "../Form/PasscodeForm";
import { getAppointmentById } from "@/services/api";

export default function MobileHomeTable({ tableData, loading }: any) {
  const modalStatusStore = useModalStatusStore();

  const handleEdit = async (appointmentId: string) => {
    try {
      const appointmentDetails = await getAppointmentById({
        id: appointmentId,
      });

      modalStatusStore.setModal({
        isOpen: true,
        Modal: () => <PasscodeForm event={appointmentDetails.data.data} />,
      });
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  return (
    <div className="mb-10 grid max-h-[400px] grid-cols-1 gap-4 overflow-y-scroll sm:grid-cols-2">
      {loading
        ? Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                role="status"
                className="card w-full min-w-72 max-w-sm animate-pulse bg-gray-200 transition-all duration-300 ease-in-out hover:-translate-y-1 dark:bg-gray-700"
              >
                <div className="mb-4 h-4 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <span className="sr-only">Loading...</span>
              </div>
            ))
        : tableData.map((data: any) => (
            <div
              className="card my-4 w-auto cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1"
              key={data.id}
              onClick={() => handleEdit(data.id)}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">{data.room}</h2>
                <p className="text-xs text-secondary/70">{data.date}</p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-secondary/80">
                  {data.department}
                </h2>
                <p className="text-xs text-secondary/70">
                  {data.startTime} - {data.endTime}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
}
