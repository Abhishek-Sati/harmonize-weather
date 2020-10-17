import React from "react";
import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";

export default function Error500() {
  const history = useHistory();
  return (
    <section style={{ gridColumn: "1/-1" }}>
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong. Please try again later !!"
        extra={
          <Button type="primary" onClick={() => history.push("/")}>
            Back Home
          </Button>
        }
      />
      ,
    </section>
  );
}
