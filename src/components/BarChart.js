import React, { memo } from "react";
import { Bar } from "react-chartjs-2";
import { Result } from "antd";

const state = {
  labels: [],
  //labels:["A302","AABP","AABS","AAXX","ABBN","AGGC"]
  datasets: [
    {
      label: "Temperature",
      backgroundColor: "#faca45",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      data: [],
      //   data: [65, 59, 80, 81, 56, 35, 67, 20],
    },
  ],
};

export default memo(function ChartBar({ data }) {
  const generatedData = data.map((item) => item?.split("\n")?.[1]) ?? "";
  state.labels = generatedData?.map((item) => item?.split(" ")?.[0]) ?? "";
  state.datasets[0].data = generatedData.map(
    (item) =>
      item
        ?.split(" ")
        ?.find((item) => /[a-z0-9]+[\/?]+[a-z0-9]/g.test(item))
        ?.split("/")?.[0]
        ?.replace(/\M/g, "-") ?? ""
  );
  if (!data?.length)
    return (
      <Result status="warning" title="Sorry, Something went wrong while loading graph data !!" />
    );
  return (
    <section className="barchart_container">
      <Bar
        height={100}
        data={state}
        options={{
          title: {
            display: true,
            text: "METAR TEMPERATURE",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "bottom",
          },
        }}
      />
    </section>
  );
});
