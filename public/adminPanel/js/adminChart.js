// import { CHART_COLORS } from "./Utils.js"
console.log("inside admin chart")
const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
}

userDoctorChart("userDoctorGrowthChart")

//user doctor chart
function userDoctorChart(canvasId) {
  const DATA_COUNT = 10
  const labels = ["day"]
  for (let i = 1; i < DATA_COUNT; ++i) {
    labels.push(i.toString())
  }
  const doctors = [10, 20, 50]
  const users = [100, 20, 50]
  const data = {
    labels: labels,
    datasets: [
      {
        label: "doctors",
        data: doctors,
        borderColor: CHART_COLORS.red,
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.4,
      },
      {
        label: "Users",
        data: users,
        borderColor: CHART_COLORS.blue,
        fill: false,
        tension: 0.4,
      },
    ],
  }
  //config file
  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "User and doctor Count",
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Value",
          },
          suggestedMin: -10,
          suggestedMax: 100,
        },
      },
    },
  }
  new Chart(document.getElementById(canvasId), config)
}
