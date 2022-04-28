console.log("i amm history")

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
      borderColor: CHART_COLORS.red,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
    },
    {
      label: "Dataset 2",
      data: [23, 78, 11, 34],
      borderColor: Utils.CHART_COLORS.blue,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
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
        text: "Chart.js Line Chart",
      },
    },
  },
}

const DATA_COUNT = 7
const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 }

const userHistory = new Chart(
  document.getElementById("userHistoryChart"),
  config
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
