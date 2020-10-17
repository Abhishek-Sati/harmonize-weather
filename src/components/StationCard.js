import React, { memo } from "react";
import { useHistory } from "react-router-dom";

export default memo(function Stationcard({ code, removeStationCallback }) {
  const history = useHistory();
  return (
    <article onClick={() => history.push(`/${code}`)} className="station_card">
      <img
        className="station_card__img"
        alt="example"
        src={require("../images/Weather-Forecast.jpg")}
      />
      <section className="station_card__section_1">
        <span>Station Code : </span>
        <h3 className="station_card__section_1__h3">{code}</h3>
      </section>
      <section className="station_card__btn_wrapper">
        <button className="secondary-btn">Detail</button>
        <button
          className="primary-btn"
          onClick={(e) => {
            // for stopping event bubbling :
            e.stopPropagation();
            removeStationCallback(code);
          }}
        >
          Delete
        </button>
      </section>
    </article>
  );
});
