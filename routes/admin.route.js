const router = require("express").Router()

router.get("/main", (req, res, next) => {
  res.render("admin.ejs")
})
// router.get("/signup", (req, res, next) => {
//   res.render("signup.ejs")
// })
// router.get("/login", (req, res, next) => {
//   res.render("login.ejs")
// })

// router.get("/about", (req, res, next) => {
//   res.render("about.ejs")
// })

module.exports = router
