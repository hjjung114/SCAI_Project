import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

const ChartComponent = ({labels, data1, data2}) => {
  const chartRef = useRef(null);

  // Calculate the middle index of the labels array
  const middleIndex = Math.floor(labels.length / 2);
  const middleLabel = labels[middleIndex]

  const dash = (chartRef) => chartRef.chart.data.labels[chartRef.p0DataIndex] >= middleLabel ? [6,6] : [6,0];
  const getBorderColor1 = (context) =>
    context.chart.data.labels[context.p0DataIndex] >= middleLabel ? "#C0C0C0" : "rgba(44, 159, 237, 0.75)";

  const getBorderColor2 = (context) =>
    context.chart.data.labels[context.p0DataIndex] >= middleLabel ? "rgba(255, 99, 132, 0.5)" : "#CBCE91";

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
        labels: labels,
        datasets: [
          {
            label: "삼성전자",
            data: data1,
            borderColor: "rgba(44, 159, 237, 0.75)",
            segment: {
              borderDash: context => dash(context),
              borderColor: context => getBorderColor1(context),
            },  
            backgroundColor: "#C0C0C0",
            pointRadius: 0,
            pointHitRadius: 8,
            // pointBackgroundColor: "rgba(255, 99, 132, 1)",
            // pointBorderColor: "rgba(255, 255, 255, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
            pointHoverBorderColor: "rgba(255, 255, 255, 1)",
            fill: false,
            yAxisID: 'y'
          },
          {
            label: "이오테크닉스",
            data: data2,
            borderColor: "#CBCE91",
            segment: {
              // borderDash: chartRef => down(chartRef, [6, 6] || [6,0]),
              
              borderDash: context => dash(context),
              borderColor: context => getBorderColor2(context),
            },
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            pointRadius: 0,
            pointHitRadius: 8,
            // pointBackgroundColor: "rgba(255, 99, 132, 1)",
            // pointBorderColor: "rgba(255, 255, 255, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
            pointHoverBorderColor: "rgba(255, 255, 255, 1)",
            fill: false,
            yAxisID: 'y1'
          },
        ],
      },
      options: {
        responsive: true,
        // maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4,
          },
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
          },
          x: {
            ticks : {
              maxTicksLimit : 20
            }
          }
        }
      },
      });
    };
  },[labels, data1, data2]);

  return (
    <div>
      {labels.length > 0 ? (
        <canvas ref={chartRef} />
      ) : (
        <div></div>
      )}
    </div>
  );
  
}

export default ChartComponent;
