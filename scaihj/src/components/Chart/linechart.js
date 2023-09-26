import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

const LineChart = ({ inputValue }) => {
  const chartRef = useRef(null);
  let chartInstance = useRef(null); // Use a ref to store the chart instance
  const [chartData, setChartData] = useState({
    labels: [],
    data: [],
  });

  // Define ctx outside of the useEffect
  const ctx = chartRef.current?.getContext("2d");

  useEffect(() => {
    fetch(`/chartdata?name=${inputValue}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setChartData({
          labels: data.Date,
          data: data.High,
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [inputValue]);

  const createChart = () => {
    Chart.register(
      LineController,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement
    );

    // Destroy the previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: "Data 1",
            data: chartData.data,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            pointRadius: 5, // 포인트 크기
            pointBackgroundColor: "rgba(255, 99, 132, 1)", // 포인트 배경색
            pointBorderColor: "rgba(255, 255, 255, 1)", // 포인트 테두리 색
            pointHoverRadius: 7, // 호버 시 포인트 크기
            pointHoverBackgroundColor: "rgba(255, 99, 132, 1)", // 호버 시 포인트 배경색
            pointHoverBorderColor: "rgba(255, 255, 255, 1)", // 호버 시 포인트 테두리 색
            fill: false, // 라인 그래프에서 영역 채우기 비활성화
          },
        ],
      },
      options: {
        //   scales: {
        //     x: {
        //       display: true,
        //     },
        //     y: {
        //       beginAtZero: true,
        //       max: 3000, // 최대값 설정
        //     },
        //   },
      },
    });
  };

  const initializeChart = () => {
    createChart();
  };

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 차트 초기화
    initializeChart();
  }, [chartData]);

  useEffect(() => {
    return () => {
      // 컴포넌트가 unmount될 때 차트 파괴
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default LineChart;