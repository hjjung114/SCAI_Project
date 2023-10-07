// data.js

import { useEffect, useState } from "react";

const ChartData = ({ period='month', onDataFetched }) => {
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    
    fetch(`/chartdata?period=${period}`)
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
  }, [period]);

  useEffect(() => {
    setDataFetched(false); // period가 바뀔 때마다 dataFetch 상태 초기화
  }, [period]);

  return null;
};

export default ChartData;