import { foodValues } from "./charts.js"

console.log("i amm history")
const addDataBtn = document.querySelector("#addDataBtn")
console.log(addDataBtn)

const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const labels = months({ count: 7 })

const userHistorydata = {
  labels: labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [34, 45, 46, 45, 89],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: CHART_COLORS.red,
    },
    {
      label: "Dataset 2",
      data: [23, 78, 11, 34],
      borderColor: CHART_COLORS.blue,
      backgroundColor: CHART_COLORS.red,
    },
  ],
}

const userHistoryconfig = {
  type: "line",
  data: userHistorydata,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "user history",
      },
    },
  },
}

const DATA_COUNT = 7
const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 }

const userHistory = new Chart(
  document.getElementById("userHistoryChart"),
  userHistoryconfig
)

// all utils function
function numbers(config) {
  var cfg = config || {}
  var min = valueOrDefault(cfg.min, 0)
  var max = valueOrDefault(cfg.max, 100)
  var from = valueOrDefault(cfg.from, [])
  var count = valueOrDefault(cfg.count, 8)
  var decimals = valueOrDefault(cfg.decimals, 8)
  var continuity = valueOrDefault(cfg.continuity, 1)
  var dfactor = Math.pow(10, decimals) || 0
  var data = []
  var i, value

  for (i = 0; i < count; ++i) {
    value = (from[i] || 0) + this.rand(min, max)
    if (this.rand() <= continuity) {
      data.push(Math.round(dfactor * value) / dfactor)
    } else {
      data.push(null)
    }
  }

  return data
}
function months(config) {
  var cfg = config || {}
  var count = cfg.count || 12
  var section = cfg.section
  var values = []
  var i, value

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12]
    values.push(value.substring(0, section))
  }

  return values
}

async function updateUserHistory(foodValues) {
  console.log(foodValues)
  const option = {
    method: "POST",
    body: JSON.stringify(foodValues),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  }

  const gotResponse = await fetch("/api", option)
  const body = await gotResponse.json()
  console.log(body)
}
//function calling
updateUserHistory(foodValues)
