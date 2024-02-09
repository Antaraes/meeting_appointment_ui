import React from "react";

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
    <div className="flex md:w-[650px] lg:w-[900px] xl:w-[1100px] mx-auto mt-2">
      <table className="table-auto w-full rounded-[10px]">
        <thead className="bg-secondary text-text-white border-none">
          <tr>
            {header.map((item) => (
              <th key={item.id} className="px-4 py-2">
                {item.Title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={item.id} className="">
              <td className="px-4 py-2 text-left">{item.room}</td>
              <td className="px-4 py-2 text-center">{item.date}</td>
              <td className="px-4 py-2 text-center">{item.startTime}</td>
              <td className="px-4 py-2 text-center">{item.endTime}</td>
              <td className="px-4 py-2 text-left">{item.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;