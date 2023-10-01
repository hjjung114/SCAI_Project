import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

const ChartComponent = ({ labels, data, label }) => {
  const chartRef = useRef(null);
  let chartInstance = useRef(null);

  useEffect(() => {
    Chart.register(
      LineController,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement
    );

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label,
            data,
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
  }, [labels, data, label]);

  return (
    <div>
      <canvas ref={chartRef} width="600" height="300" />
    </div>
  );
};

export default ChartComponent;
