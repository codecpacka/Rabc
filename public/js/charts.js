console.log("this is chart js ")

//setup file

const DATA_COUNT = 3
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 }

const data = {
  labels: ["Protein", "fat", "carbs"],
  datasets: [
    {
      label: "Dataset 1",
      data: [3, 4, 6],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
    },
  ],
}
//config file
const config = {
  type: "doughnut",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Doughnut Chart",
      },
    },
  },
}

const myChart = new Chart(document.getElementById("myPieChart"), config)
