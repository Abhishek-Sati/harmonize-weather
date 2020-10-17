import React, { useState, useEffect, memo } from "react";
import { useHistory } from "react-router-dom";
import { Input, AutoComplete } from "antd";
import axios from "axios";
import apiEndpoints from "../utils/api";

export default memo(function Search({ codes }) {
  const history = useHistory();
  const options = codes?.length ? codes.map((item) => ({ value: item })) : [];

  // NOTE : not using api for searching the data because i have already stored that inside use ref. Below commented code is for searching the data from the api.
  // Calling same api again is not good for performance that's why i have used useRef hook inside home component.

  //   const [options, setOptions] = useState([]);

  //   useEffect(() => {
  //     getSearchData();
  //   }, []);

  //   const getSearchData = async () => {
  //     const { data: { codes = [] } = {} } = await axios.get(apiEndpoints.home.base);
  //     const autocompleteData = codes?.length ? codes.map((item) => ({ value: item })) : [];
  //     setOptions(autocompleteData);
  //   };

  return (
    <AutoComplete
      style={{ width: 300 }}
      className="home_container__search"
      dropdownMatchSelectWidth={252}
      notFoundContent={"No Result's Found !!"}
      options={options}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      onSelect={(value) => history.push(`/${value}`)}
    >
      <Input.Search size="large" placeholder="Search Stations" enterButton />
    </AutoComplete>
  );
});
