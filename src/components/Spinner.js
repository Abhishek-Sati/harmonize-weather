import React from "react";
import { Spin } from "antd";

export default function Spinner() {
  return (
    <div
      style={{
        display: "grid",
        gridColumn: "1/-1",
        height: "100vh",
        placeContent: "center",
      }}
    >
      <Spin />
    </div>
  );
}
