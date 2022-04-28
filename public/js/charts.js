// const axios = require("axios")
console.log("this is chart js ")
const DATA_COUNT = 3
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 }

const searchbox = document.querySelector("#floating-input")

const searchBtn = document.querySelector("#search-btn")
let template = document.querySelector("#list-item-template")
const output = document.querySelector(".output")
// console.log(box)
console.log(searchbox)
console.log(searchBtn)
getCaloriesChart("myCalorimeterChart")

function getCaloriesChart(element, foodName = "food Name") {
  const data = {
    labels: ["Protein", "fat", "carbs"],
    datasets: [
      {
        label: "Dataset 1",
        data: [
          getRandomInt(10, 200),
          getRandomInt(100, 400),
          getRandomInt(10, 300),
        ],
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
          text: foodName,
        },
      },
    },
  }

  myChart = new Chart(document.getElementById(element), config) //for index
  // myChart.destroy()
  // const myChart = new Chart(document.getElementById("myArea"), config
}

////function for getting api data

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    "X-RapidAPI-Key": "f65f584af5msh030af865518d1adp107905jsn58fcbac1c9e2",
  },
}

async function getApiData(foodItem) {
  try {
    // console.log(`soup${foodItem}`)
    //changing food item string

    let response = await fetch(
      `https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=${foodItem.replace(
        " ",
        "%20"
      )}`,
      options
    )
    if (response.ok) {
      let data = await response.json()
      console.log("connection succesfull")
      console.log(data.results.display)
      data.results.forEach((element) => {
        console.log(element.display)
        renderList(element.display)
      })
      test()
    } else {
      console.log("unable to get data")
    }
  } catch (error) {
    console.log("api connection failed")
    console.log(error)
  }
}
// getApiData("chicken soup")

///onclick sarchbutton functionality
searchBtn.addEventListener("click", () => {
  output.innerHTML = ""
  getApiData(searchbox.value)
})

function renderList(element) {
  const templatClone = template.content.cloneNode(true)
  // console.log(templatClone)
  const textElement = templatClone.querySelector(".list-item")
  textElement.innerText = element
  output.appendChild(templatClone)
}

///random value generator
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}
//testing code
function test() {
  let items = document.querySelectorAll(".list-item")
  console.log(items)
  items.forEach((element) => {
    element.addEventListener("click", (e) => {
      // console.log(getRandomInt(3, 10))
      myChart.destroy()
      getCaloriesChart("myPieChart", e.target.innerText)
    })
  })
}
