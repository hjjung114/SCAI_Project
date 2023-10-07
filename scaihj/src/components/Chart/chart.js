import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material'; // Import createTheme and ThemeProvider
import useMediaQuery from '@mui/material/useMediaQuery';



const ChartComponent = ({labels, data1, data2, onChangePeriod }) => {
  const chartRef = useRef(null);
  const [period, setPeriod] = useState('month');
  const matches = useMediaQuery("(min-width:600px)");

  // const theme = createTheme({
  //   components: {
  //     // Name of the component
  //     MuiButtonBase: {
  //       defaultProps: {
  //         // The props to change the default for.
  //         disableRipple: true, // No more ripple, on the whole application 💣!
  //       },
  //     },
  //   },
  // });

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
    onChangePeriod(period);
  }, [period]);


  useEffect(() => {

    onChangePeriod(period);

    if (chartRef.current) { // chartRef가 null이 아닐 때만 실행
      Chart.register(
        LineController,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement
      );
      console.log(1)
  
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
            grid: {
              display: false,
            },
            position: 'right',
          },
          x: {
            ticks : {
              maxTicksLimit : 18
            }
          }
        },
        plugins: {
         legend: {
            position: 'bottom',
          }
        }
      },
      });
    };
  },[labels, data1, data2])

  return (
  <div>
    {labels.length > 0 ? (
      <div>
        {/* <button onClick={() => setPeriod("week")}>Week</button>
        <button onClick={() => setPeriod("month")}>Month</button>
        <button onClick={() => setPeriod("quarter")}>Quarter</button>
        <button onClick={() => setPeriod("year")}>Year</button>
        <button onClick={() => setPeriod("3year")}>3Year</button>
        <button onClick={() => setPeriod("5year")}>5Year</button> */}
      {/* <ThemeProvider theme={theme}> */}
      <ToggleButtonGroup
        value={period}
        exclusive
        onChange={(event, newValue) => setPeriod(newValue)} // Use onChange instead of onClick
        aria-label="text alignment"
        orientation={`${matches ? `horizontal` : `vertical`}`}
        size={`${matches ? `large` : `small`}`}
      >
      <ToggleButton value="week" aria-label="left aligned">
        Week
      </ToggleButton>
      <ToggleButton value="month" aria-label="centered">
        month
      </ToggleButton>
      <ToggleButton value="quarter" aria-label="right aligned">
        Quarter
      </ToggleButton>
      <ToggleButton value="year" aria-label="right aligned">
        Year
      </ToggleButton>
      <ToggleButton value="3year" aria-label="right aligned">
        3Year
      </ToggleButton>
      <ToggleButton value="5year" aria-label="right aligned">
        5Year
      </ToggleButton>
    </ToggleButtonGroup>
    {/* </ThemeProvider> */}

        
        <canvas ref={chartRef} />
      </div>
    ) : (
      <div></div>
    )}
  </div>
  );
}

export default ChartComponent;