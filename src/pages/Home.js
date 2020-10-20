import React, { useEffect, useState, memo, useCallback, useRef } from "react";
import axios from "axios";
import { BackTop, Skeleton, notification } from "antd";
import apiEndpoints from "../utils/api";
import StationCard from "../components/StationCard";
import BarChart from "../components/BarChart";
import Search from "../components/Search";

export default memo(function Home() {
  const searchData = useRef();
  const [loading, setLoading] = useState(false);
  const [allStations, setAllStations] = useState([]);
  const [stationsToShow, setStationToShow] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    getAllStations();
  }, []);

  useEffect(() => {
    if (!stationsToShow?.length) return;
    getGraphData();
  }, [stationsToShow]);

  const getAllStations = async () => {
    try {
      setLoading(true);
      const { data: { codes = [] } = {} } = await axios.get(apiEndpoints.home.base);
      searchData.current = codes;
      setAllStations(codes ?? []);

      // Not using filter because it will run upto n elements instead using FOR loop for getting first 30 elements.
      // const first30stations = codes.filter((item, index) => index < 30);

      let first30stations = [];
      for (let i = 0; i < 30; i++) {
        first30stations.push(codes[i]);
      }
      setStationToShow(first30stations);
    } catch (err) {
      notification.error({ message: "Something went wrong while fetching data !!" });
    } finally {
      setLoading(false);
    }
  };

  const getGraphData = async () => {
    try {
      setLoading(true);
      const response = await Promise.all(
        stationsToShow.map((item) =>
          axios.get(`${apiEndpoints.detail.base}/${item}/`).catch((err) => undefined)
        )
      );
      const graphData = response.map((item) => item.data);
      setGraphData(graphData);
    } catch (err) {
      notification.error({ message: "Something went wrong while fetching data !!" });
    } finally {
      setLoading(false);
    }
  };

  const removeStation = useCallback(
    (station_code) => {
      const index = allStations.findIndex((item) => item === station_code);
      allStations.splice(index, 1);

      // Not using filter because it will run upto n elements instead using FOR loop for getting first 30 elements.
      // const first30stations = allStations.filter((item, index) => index < 30);

      let first30stations = [];
      for (let i = 0; i < 30; i++) {
        first30stations.push(allStations[i]);
      }
      setStationToShow(first30stations);
      // after deleting a station smoothly scrolling window to top
      window.scroll({ top: 0, behavior: "smooth" });
    },
    [allStations]
  );

  return (
    <section className="home_container">
      <h1 className="home_container__heading">METAR APPLICATION</h1>
      <Search codes={searchData.current} />
      {loading ? <Skeleton active /> : <BarChart data={graphData} />}
      <h2>Top {stationsToShow?.length || "30"} Stations</h2>
      <section className="home_container__card_wrapper">
        {stationsToShow?.length
          ? stationsToShow.map((item, index) => (
              <StationCard key={index} code={item} removeStationCallback={removeStation} />
            ))
          : Array(30)
              .fill(true)
              .map((_, index) => <Skeleton key={index} active />)}
      </section>
      <BackTop className="home_container__backtop" />
    </section>
  );
});
