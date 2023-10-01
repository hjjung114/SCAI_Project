import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";


const Charts = ({ inputValue1, inputValue2, inputValue3 }) => {
    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);
    const chartRef3 = useRef(null);
    
    let chartInstance = useRef(null); // Use a ref to store the chart instance
    const [chartData, setChartData] = useState({
      labels: [],
      data1: [],
      data2: [],
      data3: [],
    });

    const [chartData1, setChartData1] = useState({
        labels: [],
        data1: [],
    });
    
    const [chartData2, setChartData2] = useState({
        labels: [],
        data1: [],
    });

    const [chartData3, setChartData3] = useState({
        labels: [],
        data1: [],
    });
    

    const [initialFetchDone, setInitialFetchDone] = useState(false);

    // const ctx = chartRef.current?.getContext("2d");

// const Charts = ({ inputValue1, inputValue2, inputValue3 }) => {
//   // Refs and states for each chart
//   const chartRef1 = useRef(null);
//   const chartInstance1 = useRef(null);
//   const [chartData1, setChartData1] = useState({
//     labels: [],
//     data1: [],
//   });

//   const chartRef2 = useRef(null);
//   const chartInstance2 = useRef(null);
//   const [chartData2, setChartData2] = useState({
//     labels: [],
//     data1: [],
//   });

//   const chartRef3 = useRef(null);
//   const chartInstance3 = useRef(null);
//   const [chartData3, setChartData3] = useState({
//     labels: [],
//     data1: [],
//   });

  // Fetch and chart creation for each chart
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


//     fetch(`/chartdata?name1=${inputValue1}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setChartData1({
//           labels: data.Date,
//           data1: data.High[inputValue1],
//         });
//       })
//       .catch((error) => {
//         console.error("Fetch error:", error);
//       });
//   }, [inputValue1]);

//   useEffect(() => {
//     if (!inputValue2) {
//       return;
//     }

//     fetch(`/chartdata?name2=${inputValue2}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setChartData2({
//           labels: data.Date,
//           data1: data.High[inputValue2],
//         });
//       })
//       .catch((error) => {
//         console.error("Fetch error:", error);
//       });
//   }, [inputValue2]);

// useEffect(() => {
//     if (!inputValue3) {
//       return;
//     }

//     fetch(`/chartdata?name3=${inputValue3}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setChartData3({
//           labels: data.Date,
//           data1: data.High[inputValue3],
//         });
//       })
//       .catch((error) => {
//         console.error("Fetch error:", error);
//       });
//   }, [inputValue3]);



// useEffect(() => {
//     // Create or update the chart when chartData changes
//     createChart(data.High[inputValue1]);
//     createChart(data.High[inputValue2]);
//     createChart(data.High[inputValue3]);
//   }, [chartData]);

useEffect(() => {
    createChart(chartRef1, chartData1, inputValue1);
  }, [chartData1]);

  useEffect(() => {
    createChart(chartRef2, chartData2, inputValue2);
  }, [chartData2]);

  useEffect(() => {
    createChart(chartRef3, chartData3, inputValue3);
  }, [chartData3]);

  const createChart = (chartRef, chartData, label) => {
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
        labels: chartData.labels,
        datasets: [
          {
            label,
            data: chartData,
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
        <table>
            <tr>
                <canvas id="myChart1" ref={chartRef2} />
            </tr>
            <tr>
                <td>
                    <canvas id="myChart2" width="300" height="150" ref={chartRef2} />
                </td>
                <td>
                    <canvas id="myChart3" width="300" height="150" ref={chartRef3} />
                </td>
            </tr>
        </table>
    </div>
  );
};

export default Charts;
