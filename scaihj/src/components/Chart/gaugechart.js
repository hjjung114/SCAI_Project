import React, { useEffect, useRef, useState } from "react";
import Chart from 'chart.js/auto'


const GaugeChart = ({data, var1, var2}) => {
    const chartRef = useRef(null);
    const [value1, setValue1] = useState(data[0]);
    const [value2, setValue2] = useState(null);
  
  const gaugeNeedle = {
    id: 'gaugeNeedle',
    afterDatasetsDraw(chart, args, plugins) {
        const {ctx, data} = chart;

        ctx.save();

        // console.log(chart.getDatasetMeta(0).data[0])

        const needleValue = data.datasets[0].needleValue;
        const xCenter = chart.getDatasetMeta(0).data[0].x;
        const yCenter = chart.getDatasetMeta(0).data[0].y;
        const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius-6;
        const angle = Math.PI;
        
        const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0)
        let circumference = ((chart.getDatasetMeta(0).data[0].circumference) / Math.PI) / data.datasets[0].data[0] * needleValue;
        const needleValueAngle = circumference + 1.5;

        ctx.translate(xCenter, yCenter);
        ctx.rotate(angle * needleValueAngle);
        //Needle
        ctx.beginPath();
        ctx.strokeStyle = 'darkgrey';
        ctx.fillStyle = 'darkgrey';
        ctx.moveTo(0 -5, 0)
        ctx.lineTo(0, -outerRadius)
        ctx.lineTo(0 +5, 0);
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, 5, angle * 0, angle * 2, false);
        ctx.fill();
        ctx.restore();

    }
  }
    const initialNeedleValue = data[0];

  let chartInstance = useRef(null);

  useEffect(() => {
    console.log(data); // cordata 배열을 출력

    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: "doughnut",  // 원하는 차트 유형 지정 (예: "line", "bar", "doughnut" 등)
        data: {
          datasets: [{
            label: 'Correlation',
            data: [25, 25, 25, 25],
            borderColor: [
                'rgba(255, 26, 104, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(0, 0, 0, 0.2)'],
            backgroundColor: [
                'rgba(255, 26, 104, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(0, 0, 0, 0.2)'],
            pointRadius: 1,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: 'rgba(255, 255, 255, 1)',
            pointHoverRadius: 7,
            pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointHoverBorderColor: 'rgba(255, 255, 255, 1)',
            fill: false,
            borderWidth:1,
            circumference: 180,
            rotation: 270,
            cutout: '95%', //두께
            borderRadius: 10, //rounded edge
            needleValue: value1 !== null ? data[0] : data[1]
            // needleValue: value1 !== null ? value1 : initialNeedleValue

          }],
        },
        options: {
            aspectRatio: 1.8,
          plugins: {
            legend: {
                display: false
            }
          }
        },
        plugins: [gaugeNeedle]
      });
    }
  }, [data, value1, value2]);

  return (

    <div>
        {var1 !== "" ? (
        <div>
        <button onClick={() => { setValue1(data[0]); setValue2(null); }}>{var1}</button>
        <button onClick={() => { setValue2(data[1]); setValue1(null); }}>{var2}</button>
        

        <canvas ref={chartRef} />
        </div>
        ) : (<div></div>)
        };
    </div>

        // {/* {var1 !== null && (
        //     <button onClick={() => { setValue1(data[0]); setValue2(null); }}>{var1}</button>
        // )}

        // {var2 !== null && (
        //     <button onClick={() => { setValue2(data[1]); setValue1(null); }}>{var2}</button>
        // )} */}

        // <canvas ref={chartRef} />
  );
};

export default GaugeChart;
