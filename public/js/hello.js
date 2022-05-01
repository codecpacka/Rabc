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
const emptyArray = []
async function getApiResponse() {
  const gotResponse = await fetch("/api", option)
  const body = await gotResponse.json()
  console.log(body)
}
getApiResponse()
