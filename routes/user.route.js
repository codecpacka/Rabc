const router = require("express").Router()

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

module.exports = router
