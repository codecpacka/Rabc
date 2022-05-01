const router = require("express").Router()
const Suggestion = require("../models/suggestion.model")
const User = require("../models/user.model")

const { body, validationResult } = require("express-validator")
const passport = require("passport")
// / imp: routes below

router.post("/adddata", (req, res) => {})

// / imp: adding new data updatin routes
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
