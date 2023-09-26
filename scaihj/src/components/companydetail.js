import React, { useEffect, useState } from "react";
import { Table } from 'antd'

const CompanyDetail = ({ inputValue }) => {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/companydetail?name=${inputValue}`)
      .then((response) => response.json())
      .then((fetchedData => {
        // 받아온 데이터를 data 변수에 업데이트
        setData(fetchedData);
        console.log(fetchedData);
      }))
      .catch(
        (err) => console.log(err)
      );
  }, [inputValue]);

  return (
    <div className='App'>
      <h1>test 하는 중...</h1>
      <div>
        {/* 삼항연산자 */}
        {data === null ? (
          // fetch가 완료되지 않았을 경우에 대한 처리
          <p>Loading...</p>
        ) : (
          <div>
            <p>Market Cap: {data.marketCap}</p>
            <p>Market Name: {data.marketName}</p>
            <p>Stock Code: {data.stockCode}</p>
            <p>Stock Name: {data.stockName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;
