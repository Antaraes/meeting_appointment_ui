import React from "react";

export default function MobileHomeTable({ tableData }: any) {
  return (
    <>
      {tableData.map((data:any) => (
        <div className="card w-72" key={data.id}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[15px]">{data.room}</h2>
            <p className="text-[12px]">{data.date}</p>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[15px]">{data.department}</h2>
            <p className="text-[12px]">
              {data.startTime} - {data.endTime}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
