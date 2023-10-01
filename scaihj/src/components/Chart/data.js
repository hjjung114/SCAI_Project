import React, { useEffect, useState } from "react";

const ChartData = ({ inputValue1, inputValue2, inputValue3, onDataFetched }) => {
  useEffect(() => {
    if (!inputValue1 || !inputValue2 || !inputValue3) {
      return; // Do nothing if any of the input values are empty
    }

    fetch(`/chartdata?name1=${inputValue1}&name2=${inputValue2}&name3=${inputValue3}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onDataFetched(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [inputValue1, inputValue2, inputValue3]);

  return null;
};

export default ChartData;
