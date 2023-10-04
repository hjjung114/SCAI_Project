import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

const LineChart = ({ inputValue1, inputValue2, inputValue3 }) => {
  const chartRef = useRef(null);
  let chartInstance = useRef(null); // Use a ref to store the chart instance
  const [chartData, setChartData] = useState({
    labels: [],
    data1: [],
    data2: [],
    data3: [],
  });

  // Track if the initial fetch is done
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  // Define ctx outside of the useEffect
  const ctx = chartRef.current?.getContext("2d");

  useEffect(() => {
    if (!inputValue1 || !inputValue2 || !inputValue3) {
      return; // Do nothing if any of the input values are empty or initial fetch is done
    }
  
    fetch(`/chartdata?name1=${inputValue1}&name2=${inputValue2}&name3=${inputValue3}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Update the state with the fetched data
        setChartData({
          labels: data.Date,
          data1: data.High[inputValue1],
          data2: data.High[inputValue2],
          data3: data.High[inputValue3],
        });
        setInitialFetchDone(true);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [inputValue1, inputValue2, inputValue3, initialFetchDone]);

  useEffect(() => {
    // Create or update the chart when chartData changes
    createChart();
  }, [chartData]);

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
            data: chartData.data1,
            borderColor: "#CBCE91",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            pointRadius: 1,
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
            pointBorderColor: "rgba(255, 255, 255, 1)",
            pointHoverRadius: 7,
            pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
            pointHoverBorderColor: "rgba(255, 255, 255, 1)",
            fill: false,
          },
          {
            label: "Data 2",
            data: chartData.data2,
            borderColor: "#CBCE91",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            pointRadius: 1,
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
            pointBorderColor: "rgba(255, 255, 255, 1)",
            pointHoverRadius: 7,
            pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
            pointHoverBorderColor: "rgba(255, 255, 255, 1)",
            fill: false,
          },
          {
            label: "Data 3",
            data: chartData.data3,
            borderColor: "#CBCE91",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            pointRadius: 1,
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
            pointBorderColor: "rgba(255, 255, 255, 1)",
            pointHoverRadius: 7,
            pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
            pointHoverBorderColor: "rgba(255, 255, 255, 1)",
            fill: false,
          },
        ],
      },
      options: {
        responsive: false,
        elements: {
          line: {
            tension: 0.4,
          },
        },
      },
    });
  };

  return (
    <div>
      <canvas id="myChart" width="1800" height="900" ref={chartRef} />
    </div>
  );
};

export default LineChart;