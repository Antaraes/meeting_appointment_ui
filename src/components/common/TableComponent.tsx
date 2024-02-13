import React from "react";
import { FaEdit } from "react-icons/fa";
type Header = {
  id: number;
  Title: string;
};

type TableData = {
  id: number;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  department: string;
};

interface TableComponentProps {
  header: Header[];
  tableData: TableData[];
}

const TableComponent: React.FC<TableComponentProps> = ({
  header,
  tableData,
}) => {
  return (
    <div className="flex w-full lg:w-5/6 mx-auto  rounded-lg mt-2 mb-20">
      <table className="table-auto w-full border p-1">
        <thead className="bg-secondary text-text-white border-none">
          <tr>
            {header.map((item) => (
              <th key={item.id} className="px-4 text-left py-2">
                {item.Title}
              </th>
            ))}
            <th className="px-4 text-left py-2"></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr
              key={item.id}
              className={` break-words text-secondary/80 ${index % 2 == 0 && "bg-gray-200/50"}`}
            >
              <td className="px-4 py-2 ">{item.room}</td>
              <td className="px-4 py-2 ">{item.date}</td>
              <td className="px-4 py-2 ">{item.startTime}</td>
              <td className="px-4 py-2 ">{item.endTime}</td>
              <td className="px-4 py-2 ">{item.department}</td>
              <td className="px-4 py-2 ">
                <button className=" hover:text-secondary transition-all duration-300 ease-in-out">
                  <FaEdit className=" " size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
