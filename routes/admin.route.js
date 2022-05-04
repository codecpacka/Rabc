const User = require("../models/user.model")
const Doctor = require("../models/doctor.model")
const Suggestion = require("../models/suggestion.model")
const router = require("express").Router()
const mongoose = require("mongoose")
const { body, validationResult } = require("express-validator")
const passport = require("passport")
const { roles } = require("../utils/constants")
const connctEnsure = require("connect-ensure-login")

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
  console.log(req.user)
  console.log(req.admin)
  const userCount = await User.find({ role: "CLIENT" }).count()
  const doctorCount = await Doctor.find({ role: "DOCTOR" }).count()
  const suggestionCount = await Suggestion.find().count()

  console.log(`total number of users are ${userCount}`)
  console.log(`total number of Doctor are ${doctorCount}`)
  console.log(`total number of Suggestions are ${suggestionCount}`)

  info = {
    userCount: userCount,
    doctorCount: doctorCount,
    // suggestions: suggestions,
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

//admin view suggestion
router.get("/suggestions", async (req, res, next) => {
  // res.send("all suggestions")
  const suggestions = await Suggestion.find()
  console.log(suggestions)
  res.render("viewSuggestions.ejs", { suggestions })
})

//admn post login
router.post(
  "/login",
  passport.authenticate("adminMiddleWare", {
    // successRedirect: "/user/profile", //original
    successRedirect: "/admin/dashboard", //original

    failureRedirect: "/admin/login",
    failureFlash: true,
  }),
  (req, res, next) => {
    console.log("sending admin response")
    res.send(req.body)
  }
)
router.get("/logout", async (req, res, next) => {
  req.logout()
  res.redirect("/")
})
// getting all users data
router.get("/adduser", async (req, res, next) => {
  const allUsers = await User.find()
  userRegLink = "/auth/signup/"
  res.render("allUsers.ejs", { allUsers, userRegLink })
  // res.send(allUsers)
})
//for viewing user profile

//note:  for deleting user profile
router.post("/deleteuser", async (req, res, next) => {
  try {
    const { _id } = req.body
    console.log(_id)
    await User.findByIdAndDelete(_id)
    req.flash("error", "id updated Succesfully")
    return res.redirect("/admin/adduser") //returing back to page
  } catch (error) {
    console.log("unable to delete")
    console.log(error)
  }
})

router.get("/adddoctor", async (req, res, next) => {
  const allUsers = await Doctor.find()
  userRegLink = "/doctor/signup"
  res.render("allUsers.ejs", { allUsers, userRegLink })
  // res.send(allUsers)
})
//for viewing user profile

//note:  for deleting user profile
router.post("/deleteuser", async (req, res, next) => {
  try {
    const { _id } = req.body
    console.log(_id)
    await User.findByIdAndDelete(_id)
    req.flash("error", "id updated Succesfully")
    return res.redirect("/admin/adduser") //returing back to page
  } catch (error) {
    console.log("unable to delete")
    console.log(error)
  }
})

module.exports = router
