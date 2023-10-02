import { useEffect, useState } from "react";

const fetchData = (inputValue1, inputValue2, inputValue3) => {
  return fetch(`/chartdata?name1=${inputValue1}&name2=${inputValue2}&name3=${inputValue3}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

const ChartData = ({ inputValue1, inputValue2, inputValue3, onDataFetched }) => {
  useEffect(() => {
    if (!inputValue1 || !inputValue2 || !inputValue3) {
      return; // Do nothing if any of the input values are empty
    }

    fetchData(inputValue1, inputValue2, inputValue3)
      .then((data) => {
        onDataFetched(data);
      });
  }, [inputValue1, inputValue2, inputValue3]);

  return null;
};

export default ChartData;