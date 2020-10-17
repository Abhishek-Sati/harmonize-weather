import React, { useEffect, memo, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { notification, Button } from "antd";
import axios from "axios";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import Error500 from "../components/Error500";

export default memo(function Detail() {
  const { station_code } = useParams();
  const history = useHistory();
  const [details, setDetails] = useState(undefined);
  useEffect(() => {
    getStationData();
  }, []);

  const getStationData = async () => {
    try {
      // i have used heroku here because detail api was showing cors issue => /utils/api.js
      const { data } = await axios.get(`${api.detail.heroku}/${station_code}`);
      setDetails(data?.split("\n")?.flat()?.join(" ")?.split(" ") ?? []);
    } catch (err) {
      setDetails([]);
      notification.error({ message: "Something went wrong while fetching data !!" });
    }
  };

  if (!details) return <Spinner />;
  else if (!details?.length) return <Error500 />;
  return (
    <section className="detail_container">
      <section className="detail_container__section1">
        <h2 className="detail_container__h2">{station_code}</h2>
        <Button type="primary" onClick={() => window.location.reload(false)}>
          Refresh
        </Button>
        <Button type="secondary" onClick={() => history.push("/")}>
          Back Home
        </Button>
      </section>
      <section className="detail_container__table_wrapper">
        <table border={1} className="detail_container__table">
          <tbody>
            <tr>
              {details.map((item, index) => (
                <td key={index} className="detail_container__td">
                  {item}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  );
});
