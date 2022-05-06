const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.render("index.ejs") //modified
})

// router.get("/signup", (req, res, next) => {
//   res.render("signup.ejs")
// })
// router.get("/login", (req, res, next) => {
//   res.render("login.ejs")
// })

router.get("/about", (req, res, next) => {
  res.render("about.ejs")
})
router.get("/contact", (req, res, next) => {
  res.send("contact us on 9033880483")
})

module.exports = router
