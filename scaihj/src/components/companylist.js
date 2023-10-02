import React, { useEffect, useState } from "react";

const Companylist = () => {
  useEffect(() => {
    fetch(`/companylist`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onDataFetched(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return null;
};

export default Companylist;