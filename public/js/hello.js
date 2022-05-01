console.log("requesting done succesfull")

console.log("hi an index .js javascript file")
const data = {
  foodName: "burger",
  cal: 34,
}
const option = {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
}
fetch("/api", option)
