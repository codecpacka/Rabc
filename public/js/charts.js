// const axios = require("axios")
console.log("this is chart js ")
// <----all chart js code is below---->
//setup file
const searchBox = Array.from(document.getElementsByClassName("searchBox"))
const fooItem = searchBox[0].value
const Btn = Array.from(document.getElementsByClassName("searchBtn"))
// const searchBtn = Btn[0]
let testNode = document.querySelector(".searchBtn")
console.log(typeof testNode)
// console.log(searchBtn)

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
    console.log(`soup${foodItem}`)
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
      console.log(data)
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
// searchBtn.addEventListener('click',()=>{

// })
