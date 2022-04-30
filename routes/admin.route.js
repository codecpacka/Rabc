const User = require("../models/user.model")
const Doctor = require("../models/doctor.model")
const Suggestion = require("../models/suggestion.model")
const router = require("express").Router()
const mongoose = require("mongoose")
const { body, validationResult } = require("express-validator")
const passport = require("passport")
const { roles } = require("../utils/constants")

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find()
    // res.send(users) //diplauy raw data

    res.render("manage-users", { users })
  } catch (error) {
    next(error)
  }
})

//creating custom when on click is done
router.get("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params //now we need to validate if its a valid id for the we import
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash("error", "invalid id")
      res.redirect("/admin/users")
      return
    }
    const person = await User.findById(id)
    res.render("profile", { person }) //render profile of that person
  } catch (error) {
    next(error)
  }
})
//update user role
router.post("/update-role", async (req, res, next) => {
  const { id, role } = req.body
  ///checcking for id and role in request body
  if (!id || !role) {
    req.flash("error", "invalid request")
    return res.redirect("back")
  }
  //check for valid mongoose id
  if (!mongoose.Types.ObjectId(id)) {
    req.flash("error", "invalid id")
    return res.redirect("back")
  }
  //check for valid role
  const rolesArray = Object.values(roles)
  if (!rolesArray.includes(role)) {
    req.flash("error", "invalid Role")
    return res.redirect("back")
  }
  //admin cannot remove himself
  if (req.user.id === id) {
    req.flash("error", "Admins cannot remove themselves ask another admin")
    return res.redirect("back")
  }
  // finally update the user
  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true }
  )
  req.flash("info", `update role for ${user.email} to ${user.role}`)
  res.redirect("./users")
})

// my project routes dashboard
router.get("/dashboard", async (req, res, next) => {
  const userCount = await User.find({ role: "CLIENT" }).count()
  const doctorCount = await Doctor.find({ role: "DOCTOR" }).count()
  const suggestionCount = await Suggestion.find().count()
  console.log(`total number of users are ${userCount}`)
  console.log(`total number of Doctor are ${doctorCount}`)
  console.log(`total number of Suggestions are ${suggestionCount}`)
  info = {
    userCount: userCount,
    doctorCount: doctorCount,
    suggestionCount: suggestionCount,
  }
  res.render("admin.ejs", { info })
})
//changePassword
router.get("/changePassword", (req, res, next) => {
  res.render("changePassword.ejs")
})
//adminlogin
router.get("/login", (req, res, next) => {
  res.render("adminLogin.ejs")
})
//admn login post
router.post(
  "/login",
  passport.authenticate("AdminMiddleWare", {
    // successRedirect: "/user/profile", //original
    successRedirect: "/doctor/dashboard", //modified
    failureRedirect: "/doctor/login",
    failureFlash: true,
  })
)

module.exports = router
