const router = require("express").Router()

router.get("/profile", async (req, res, next) => {
  console.log(req.user)
  const person = req.user
  res.render("profile", { person })
})
router.get("/dashboard", async (req, res, next) => {
  console.log(req.user)
  const person = req.user
  res.render("user", { person })
})

module.exports = router
