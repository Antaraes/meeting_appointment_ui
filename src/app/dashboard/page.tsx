"use client";

import HomePageTable from "@/components/home/HomePageTable";
import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Departments", "Test"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

const page = () => {
  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 mb-4">
        <Chart
          chartType="PieChart"
          data={data}
          options={{ title: "test" }}
          width={"100%"}
          height={"400px"}
        />
        <Chart
          chartType="PieChart"
          data={data}
          options={{ title: "test" }}
          width={"100%"}
          height={"400px"}
        />
      </div>
      <HomePageTable />
    </div>
  );
};

export default page;
