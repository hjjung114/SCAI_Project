import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { TableHead } from "@mui/material";
import Typography from "@mui/material/Typography";

const CompanyDetail = ({ inputValue1 }) => {
  const [data, setData] = useState(null);
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    if (!inputValue1) {
      return; // Do nothing if inputValue1 is empty or initial fetch is done
    }

    fetch(`/companydetail?name=${inputValue1}`)
      .then((response) => response.json())
      .then((fetchedData) => {
        // 받아온 데이터를 data 변수에 업데이트
        setData(fetchedData);
        console.log(fetchedData);
        // Dynamically import the logo based on data.stockCode
        import(`./Images/Logo${fetchedData.stockCode}.jpg`)
          .then((logoModule) => setLogo(logoModule.default))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [inputValue1]);

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  const logoStyle = {
    width: "auto", // Adjust the width as needed
    height: "20px", // Maintains aspect ratio
  };

  const tableContainerStyle = {
    marginBottom: "20px", // Add 20px margin/padding below the table container
  };

  return (
    <div className="Companydetail">
      {/* <h3>Company Detail</h3> */}
      {data === null ? (
        // fetch가 완료되지 않았을 경우에 대한 처리
        <p></p>
      ) : (
        <TableContainer style={tableContainerStyle}>
          <Table aria-label="dense spanning table">
            <TableHead>
              <TableRow>
                <TableCell padding="none" align="center" colSpan={2}>
                  <h3>{data.stockName}</h3>
                  {logo && (
                    <img
                      src={logo}
                      alt={`Logo${data.stockCode}`}
                      style={logoStyle}
                    />
                  )}
                  <p>
                    {data.stockCode} / {data.marketName}{" "}
                  </p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding="none" align="center">
                  <Typography style={{ fontWeight: "bold" }}>
                    시가총액
                  </Typography>
                </TableCell>
                <TableCell padding="none" align="right">
                  <p>{formatNumber(data.marketCap)}</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding="none" align="center">
                  <Typography style={{ fontWeight: "bold" }}>
                    상장 주식 수
                  </Typography>
                </TableCell>
                <TableCell padding="none" align="right">
                  <p>{formatNumber(data.listedStocks)}</p>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default CompanyDetail;
