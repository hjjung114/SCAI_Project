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
  const dash = (chartRef, value) => chartRef.p0DataIndex >= 6 ? value : [6,0];
  const border = (chartRef) => chartRef.p0DataIndex >= 6 ? "#C0C0C0" : "#CBCE91";

// const dash = (chartRef, value) => chartRef.label > '2023-09-19' ? value : [6,0];
    // const dash = (chartRef, value) => {
    //     console.log(chartRef)
    // }
  


  let chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) { // chartRef가 null이 아닐 때만 실행
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
          datasets: [{
            label,
            data,
            borderColor: "#CBCE91",
            segment: {
              borderDash: context => dash(context, [6, 6] || [6,0]),
              borderColor: context => border(context, "#CBCE91" || "#C0C0C0"),
            },
            backgroundColor: "#C0C0C0",
            pointRadius: 1,
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
            pointBorderColor: "rgba(255, 255, 255, 1)",
            pointHoverRadius: 7,
            pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
            pointHoverBorderColor: "rgba(255, 255, 255, 1)",
            fill: false,
          }],
        },
        options: {
          responsive: true,
          elements: {
            line: {
              tension: 0.4,
            },
          },
        },
      });
    }
  }, [labels, data, label]);

  return (
    <div>
      {labels.length > 0 ? (
        <canvas ref={chartRef} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ChartComponent;
