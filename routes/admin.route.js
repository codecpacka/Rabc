const User = require("../models/user.model")
const router = require("express").Router()

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find()
    res.send(users)
    // res.render("manage-users", { users })
  } catch (error) {
    next(error)
  }
})

router.get("/main", (req, res, next) => {
  res.render("admin.ejs")
})
//changePassword
router.get("/changePassword", (req, res, next) => {
  res.render("changePassword.ejs")
})

module.exports = router
