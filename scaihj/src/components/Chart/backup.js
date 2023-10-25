import React, { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
} from "chart.js";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import zoomPlugin from "chartjs-plugin-zoom";

const ChartComponent = ({ selectedChart }) => {
  let chartInstance = useRef(null);
  const chartRef = useRef(null);
  let KOSPIchartInstance = useRef(null);
  const KOSPIchartRef = useRef(null);
  const [period, setPeriod] = useState("month");
  const [chartData, setChartData] = useState({
    labels: [],
    data1: [],
    data2: [],
    data3: [],
    KOSPI: [],
  });

  const matches = useMediaQuery("(min-width:600px)");

  // const periods = ["week", "month", "quarter", "year", "3year", "5year"];

  // Calculate the middle index of the labels array
  const middleIndex = Math.floor(chartData.labels.length / 2);
  const middleLabel = chartData.labels[middleIndex];

  useEffect(() => {
    fetch(`/chartdata?period=${period}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChartData({
          labels: data.Date,
          data1: data["005930"],
          data2: data["039030"],
          data3: data.Predict,
          KOSPI: data.KOSPI,
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [period]);

  useEffect(() => {
    // Create or update the chart when chartData changes
    if (selectedChart === "chart" && chartRef.current) {
      createChart();
    }
    if (selectedChart === "KOSPI" && KOSPIchartRef.current) {
      createKOSPI();
    }
  }, [chartData]);

  const createChart = () => {
    Chart.register(
      Legend,
      LineController,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Tooltip
    );

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: "삼성전자",
            data: chartData.data1,
            borderColor: "rgba(44, 159, 237, 0.5)",
            borderWidth: 1,
            backgroundColor: "rgba(44, 159, 237, 0.5)",
            pointRadius: 0,
            pointHitRadius: 8,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(44, 159, 237, 0.5)",
            pointHoverBorderColor: "rgba(44, 159, 237, 0.5)",
            fill: false,
            yAxisID: "y",
          },
          {
            label: "이오테크닉스",
            data: chartData.data2,
            borderColor: "#CBCE91",
            borderWidth: 2,
            // segment: {
            //   borderDash: (context) => dash(context),
            //   borderColor: (context) => getBorderColor2(context),
            // },
            backgroundColor: "#CBCE91",
            pointRadius: 0,
            pointHitRadius: 8,
            // pointBackgroundColor: "rgba(255, 99, 132, 1)",
            // pointBorderColor: "rgba(255, 255, 255, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "#CBCE91",
            pointHoverBorderColor: "#CBCE91",
            fill: false,
            yAxisID: "y1",
          },
          {
            label: "AI_이오테크닉스",
            data: chartData.data3,
            borderColor: "rgba(125, 99, 132, 0.9)",
            borderWidth: 2,
            segment: {
              borderDash: [6, 6],
            },
            // backgroundColor: ,
            pointRadius: 0,
            pointHitRadius: 8,
            // pointBackgroundColor: "rgba(255, 99, 132, 1)",
            // pointBorderColor: "rgba(255, 255, 255, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(125, 99, 132, 0.9)",
            pointHoverBorderColor: "rgba(125, 99, 132, 0.9)",
            fill: false,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        layout: {
          padding: 35,
        },
        responsive: true,
        // maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4,
          },
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
          },
          y1: {
            type: "linear",
            display: true,
            grid: { display: false },
            position: "right",
          },
          x: {
            ticks: { maxTicksLimit: 10 },
          },
        },
        plugins: {
          legend: {
            display: "true",
            position: "bottom",
            labels: {
              usePointStyle: true, //<-- 동그라미 모양
              // pointStyleWidth: 10,
            },
          },
          zoom: {
            limits: {
              // x: { min: 0, max: "2023-09-14" },
              y1: { min: 40000, max: 200000 },
              y: { min: 50000, max: 75000 },
            },
            zoom: {
              wheel: {
                enabled: true,
                speed: 0.01,
              },
              drag: {
                enabled: true,
              },
              // pinch: {
              //   enabled: true,
              // },
            },
          },
        },
      },
    });
  };

  return (
    <>
      {chartData.labels.length > 0 ? (
        <div>
          {selectedChart === "chart" && (
            <div>
              {/* <ToggleButtonGroup
                value={period} //value vs inputvalue
                exclusive
                onChange={(event, newValue) => setPeriod(newValue)}
                aria-label="text alignment"
                orientation={`${matches ? `horizontal` : `vertical`}`}
                size={`${matches ? `large` : `small`}`}
              >
                {periods.map((periodOption) => (
                  <ToggleButton key={periodOption} value={periodOption}>
                    {periodOption}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup> */}
              <canvas ref={chartRef} />
            </div>
          )}
          {selectedChart === "KOSPI" && (
            <div style={{ position: "relative", height: "30vh" }}>
              <h3 style={{ textAlign: "center" }}>KOSPI</h3>
              <canvas ref={KOSPIchartRef} />
            </div>
          )}
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "10vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default ChartComponent;
