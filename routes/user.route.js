const router = require("express").Router()
const Suggestion = require("../models/suggestion.model")
const User = require("../models/user.model")

const { body, validationResult } = require("express-validator")
const passport = require("passport")

router.post("/api", async (req, res, next) => {
  try {
    console.log("found request")
    // console.log(req.body)
    var user = JSON.parse(req.body.user)
    console.log(req.body.foodValues)
    console.log(user.email)

    await User.findOneAndUpdate(
      { email: "tester@gmail.com" },
      { $push: { "foodConsumed.foodItems": req.body.foodValues } }
    )
    const op = await User.find({ email: user.email })
    console.log(op)
    console.log("query done")
    // console.log(user)
    // data = req.body
    // console.log("sending response")
    // res.json({
    //   status: "success",
    //   pro: data.food,
    //   fat: data.fat,
    //   cal: data.cal,
    // })
  } catch (e) {
    console.log("error found")
    console.log(e)
  }
})

router.get("/profile", async (req, res, next) => {
  console.log(req.user)
  const person = req.user
  res.render("profile", { person })
})

//my dashboard
router.get("/dashboard", async (req, res, next) => {
  console.log(req.user)

  const person = req.user
  res.render("user", { person })
})
router.get("/addsuggestions", async (req, res, next) => {
  console.log(req.user)
  const person = req.user
  res.render("./userAddSuggestion.ejs", { person })
})
//post suggestion
router.post("/addsuggestions", async (req, res, next) => {
  const suggestion = new Suggestion(req.body)
  await suggestion.save()
  res.send(req.body)
  // req.flash("Succes", `${user.email} registered succesfull you may login`)
  // res.render("./userAddSuggestion.ejs", { person })
})

module.exports = router
