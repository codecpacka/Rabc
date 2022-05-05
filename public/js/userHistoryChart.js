import { foodValues } from "./charts.js"
console.log(foodValues)
var data
console.log("i amm history")
// const addDataBtn = document.querySelector("#addDataBtn") // modified
console.log(addDataBtn)
const userData = document.querySelector("#userData")
console.log(userData.value)
const allData = {
  foodValues: foodValues,
  user: userData.value,
}
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

const DATA_COUNT = 7
const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 }
async function renderUserHistory(userdata) {
  console.log(userdata.foodItems.length)
  const DATE_COUNT = userdata.foodItems.length
  const labels = ["date"]
  // imp: original
  // for (let i = 1; i < DATE_COUNT; ++i) {
  //   labels.push(i.toString())
  // }
  for (let i = 1; i < DATE_COUNT; ++i) {
    // labels.push(userdata.createdAt.getDate())
    var daydate = new Date(userdata.date)
    console.log(typeof daydate)
    console.log(
      `${daydate.getDate()}-${daydate.getMonth()}-${daydate.getFullYear()} `
    )
    let foodConsumedDate = `${daydate.getDate()}-${daydate.getMonth()}-${daydate.getFullYear()}`

    labels.push(foodConsumedDate)
  }
  const userHistorydata = {
    labels: labels,
    datasets: [
      {
        label: "protein",
        data: userdata.foodItems.map((element) => element.pro),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: CHART_COLORS.red,
      },
      {
        label: "fat",
        data: userdata.foodItems.map((element) => element.fat),
        borderColor: CHART_COLORS.blue,
        backgroundColor: CHART_COLORS.blue,
      },
      {
        label: "calories",
        data: userdata.foodItems.map((element) => element.cal),
        borderColor: CHART_COLORS.yellow,
        backgroundColor: CHART_COLORS.yellow,
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

  const userHistory = new Chart(
    document.getElementById("userHistoryChart"),
    userHistoryconfig
  )
}

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
// / imp: writing api code
async function sendUserData() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(allData),
  }

  const response = await fetch("/user/api/", options)
  data = await response.json()
  console.log(data)
  // note:  for reloading windows after each data is added
}

// note: for getting new data
// sendUserData()
addDataBtn.addEventListener("click", () => {
  sendUserData()
  location.reload()
})

//  imp: for updating new data thnutritionTypeis found
async function updateUserHistory() {
  const response = await fetch("/user/api")
  data = await response.json()
  console.log(data)

  renderUserHistory(data)
}
updateUserHistory() // note: for getting user history data

// helper function note: just for generating array of pro,fat,cal
