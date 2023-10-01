import React, { useEffect, useState } from "react";

const CompanyDetail = ({ inputValue1 }) => {

  const [data, setData] = useState(null);
  const [initialFetchDone, setInitialFetchDone] = useState(false); // Track if the initial fetch is done


  useEffect(() => {

    if (!inputValue1 || initialFetchDone) {
      return; // Do nothing if inputValue1 is empty or initial fetch is done
    }


    fetch(`/companydetail?name=${inputValue1}`)
      .then((response) => response.json())
      .then((fetchedData => {
        // 받아온 데이터를 data 변수에 업데이트
        setData(fetchedData);
        console.log(fetchedData);
      }))
      .catch(
        (err) => console.log(err)
      );
  }, [inputValue1]);

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  return (
    <div className='App'>
      <h3>Company Detail</h3>
      <div>
        {/* 삼항연산자 */}
        {data === null ? (
          // fetch가 완료되지 않았을 경우에 대한 처리
          <p></p>
        ) : (
          <div>
            <p>{data.stockCode} / {data.marketName} </p>
            <p>종목명: {data.stockName}</p>
            <p>시가총액: {formatNumber(data.marketCap)}</p>
            <p>상장 주식 수: {formatNumber(data.listedStocks)}</p>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;
