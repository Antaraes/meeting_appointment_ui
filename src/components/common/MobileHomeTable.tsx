import React from "react";

export default function MobileHomeTable({ tableData }: any) {
  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mb-10">
      {tableData.map((data: any) => (
        <div className="card w-auto my-4" key={data.id}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-base">{data.room}</h2>
            <p className="text-xs text-secondary/70">{data.date}</p>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-base text-secondary/80">
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
