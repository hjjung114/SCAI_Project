// data.js

import { useEffect, useState } from "react";

const ChartData = ({ onDataFetched }) => {
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) { // 데이터를 이미 가져왔다면 다시 가져오지 않도록
      fetch(`/chartdata`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // 데이터를 부모 컴포넌트로 전달
          onDataFetched(data);
          setDataFetched(true); // 데이터를 가져왔음을 표시
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  }, [dataFetched, onDataFetched]);

  return null;
};

export default ChartData;
