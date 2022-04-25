const router = require("express").Router()
const User = require("../models/user.model")
router.get("/login", async (req, res, next) => {
  res.render("login.ejs")
})

router.get("/signup", async (req, res, next) => {
  req.flash("error", "some error ")
  req.flash("error", "some error 2 ")
  req.flash("key", "some value ")
  const messages = req.flash()
  console.log(messages)
  res.render("signup.ejs", { messages })
})

router.get("/logout", async (req, res, next) => {
  res.send("logout get")
})
///post requests
router.post("/signup", async (req, res, next) => {
  try {
    const { email } = req.body
    const doesExist = await User.findOne({ email })
    if (doesExist) {
      res.redirect("/auth/signin")
      return
    }
    const user = new User(req.body)
    await user.save()
    res.send(user)
  } catch (error) {
    next(error)
  }
})

////
router.post("/login", async (req, res, next) => {})

////

module.exports = router
