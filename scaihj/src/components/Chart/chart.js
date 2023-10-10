import React, { useEffect, useRef, useState } from "react";
import {Tooltip,Chart,LineController,CategoryScale,LinearScale,PointElement,LineElement,} from "chart.js";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const  ChartComponent = ({selectedChart}) => {
  let chartInstance = useRef(null);
  const chartRef = useRef(null);
  let KOSPIchartInstance = useRef(null);
  const KOSPIchartRef = useRef(null);
  const [period, setPeriod] = useState('month');
  const [chartData, setChartData] = useState({
    labels: [],
    data1: [],
    data2: [],
    KOSPI: []
    });

  const matches = useMediaQuery("(min-width:600px)");

  const periods = ["week", "month", "quarter", "year", "3year", "5year"];

  // Calculate the middle index of the labels array
  const middleIndex = Math.floor(chartData.labels.length / 2);
  const middleLabel = chartData.labels[middleIndex]

  const dash = (chartRef) => chartRef.chart.data.labels[chartRef.p0DataIndex] >= middleLabel ? [6,6] : [6,0];

  const getBorderColor1 = (context) =>
    context.chart.data.labels[context.p0DataIndex] >= middleLabel ? "#C0C0C0" : "rgba(44, 159, 237, 0.75)";

  const getBorderColor2 = (context) =>
    context.chart.data.labels[context.p0DataIndex] >= middleLabel ? "rgba(255, 99, 132, 0.5)" : "#CBCE91";

  useEffect(() => {
    
    fetch(`/chartdata?period=${period}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChartData({
          labels: data.Date,
          data1: data.Close['005930'],
          data2: data.Close['039030'],
          KOSPI: data.KOSPI
        })
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  },[period])

  useEffect(() => {
    // Create or update the chart when chartData changes
    if (selectedChart === 'chart' && chartRef.current) {
      createChart();
    }
    if (selectedChart === 'KOSPI' && KOSPIchartRef.current) {
      createKOSPI();
    }
  }, [chartData]);

  const createChart = () => {
    Chart.register(LineController,CategoryScale,LinearScale,PointElement,LineElement,Tooltip);

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
            data: chartData.data2,
            borderColor: "#CBCE91",
            segment: {
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
            type: 'linear', display: true, position: 'left',
          },
          y1: {
            type: 'linear', display: true, grid: {display: false}, position: 'right',
          },
          x: {
            ticks : {maxTicksLimit : 18}
          }
        },
        plugins: {
          legend: {position: 'bottom'},
        }
      },
    });
  };

  const createKOSPI = () => {
    Chart.register(LineController,CategoryScale,LinearScale,PointElement,LineElement);

    if (KOSPIchartInstance.current) {
      KOSPIchartInstance.current.destroy();
    }

    KOSPIchartInstance.current = new Chart(KOSPIchartRef.current, {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: "KOSPI",
            data: chartData.KOSPI,
            borderColor: "#D50000",
            // segment: {
            //   borderDash: context => dash(context),
            //   borderColor: context => getBorderColor1(context),
            // },  
            // backgroundColor: "#C0C0C0",
            pointRadius: 0,
            pointHitRadius: 5,
            // pointBackgroundColor: "rgba(255, 99, 132, 1)",
            // pointBorderColor: "rgba(255, 255, 255, 1)",
            pointHoverRadius: 0,
            pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
            pointHoverBorderColor: "rgba(255, 255, 255, 1)",
            fill: false,
            yAxisID: 'y'
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.2,
          },
        },
        scales: {
          y: {
            type: 'linear', display: true, position: 'left',
          },
          x: {
            // ticks : {maxTicksLimit : 5}
            display:false
          }
        },
        plugins: {
        legend: {position: 'bottom'}
        }
      },
    });
  };


  return(
    <>
      {chartData.labels.length > 0 ? (
        <div>

          {selectedChart === 'chart' && (
            <div>
              <ToggleButtonGroup
                value={period}
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
              </ToggleButtonGroup>
              <canvas ref={chartRef} />
            </div>
          )}
          {selectedChart === 'KOSPI' && (
            <canvas ref={KOSPIchartRef} />
          )}
          
        </div>
      ) : (
        <Box sx={{ display: 'flex' , justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default ChartComponent;