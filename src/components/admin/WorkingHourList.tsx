import { useWorkingHoursSlice } from "@/store/WorkingHoursZustand";
import React from "react";

const WorkingHourList = ({
  dataServer,
  handleDeleteClick,
}: {
  dataServer: any;
  handleDeleteClick: any;
}) => {
  const { setIsEdit, setTime } = useWorkingHoursSlice();
  return (
    <div className="mx-10 flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Start Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    End Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {dataServer?.data?.map((item: any) => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-center text-sm text-gray-900">
                        {item.id}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-center text-sm text-gray-900">
                        {(parseInt(item.startTime.split(":").slice(0, 2)[0]) >=
                        12
                          ? [
                              parseInt(
                                item.startTime.split(":").slice(0, 2)[0],
                              ) - 12,
                              item.startTime.split(":").slice(0, 2)[1] + "PM",
                            ]
                          : [
                              parseInt(
                                item.startTime.split(":").slice(0, 2)[0],
                              ),
                              item.startTime.split(":").slice(0, 2)[1] + "AM",
                            ]
                        ).join(":")}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-center text-sm text-gray-900">
                        {(parseInt(item.endTime.split(":").slice(0, 2)[0]) >= 12
                          ? [
                              parseInt(item.endTime.split(":").slice(0, 2)[0]) -
                                12,
                              item.endTime.split(":").slice(0, 2)[1] + "PM",
                            ]
                          : [
                              parseInt(item.endTime.split(":").slice(0, 2)[0]),
                              item.endTime.split(":").slice(0, 2)[1] + "AM",
                            ]
                        ).join(":")}
                      </div>
                    </td>
                    <td className="flex justify-center gap-3 whitespace-nowrap px-6 py-4">
                      <div
                        onClick={() => {
                          setIsEdit(true);
                          setTime(item.id, item.startTime, item.endTime);
                        }}
                        className="w-10 rounded-lg border border-green-900 py-1 text-center text-sm text-green-900 hover:bg-green-900 hover:text-white"
                      >
                        Edit
                      </div>
                      <div
                        onClick={(e) => handleDeleteClick(e, item.id)}
                        className="w-13 rounded-lg border border-red-900 px-2 py-1 text-center text-sm text-red-900 hover:bg-red-900 hover:text-white"
                      >
                        DELETE
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingHourList;
