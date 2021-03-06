const Doctor = require("../models/doctor.model")
const User = require("../models/user.model")
const router = require("express").Router()
const { body, validationResult } = require("express-validator")
const passport = require("passport")

//doctor get
router.get("/signup", async (req, res, next) => {
  req.flash("error", "some error ")
  req.flash("error", "some error 2 ")
  req.flash("info", "some value ")
  req.flash("saved", "some value ")
  // const messages = req.flash()
  // console.log(messages)
  // res.render("signup.ejs") //original
  doctor = {
    welcome: "Doctor's Registration",
    apply: "apply for registration",
  }
  res.render("doctorSignup.ejs", { doctor }) //for rendering doctor signup
})
router.get("/login", async (req, res, next) => {
  req.flash("error", "some error ")
  req.flash("error", "some error 2 ")
  req.flash("info", "some value ")
  req.flash("saved", "some value ")
  // const messages = req.flash()
  // console.log(messages)
  // res.render("signup.ejs") //original
  doctor = {
    welcome: "Doctor's Registration",
    apply: "apply for registration",
  }
  res.render("doctorLogin.ejs", { doctor }) //for rendering doctor signup
})
//doctor post
router.post(
  "/signup",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email must be a valid email")
      .normalizeEmail()
      .toLowerCase(),
    body("password")
      .trim()
      .isLength(2)
      .withMessage("password must be min  2 character"),
    body("re_pass").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password do not match")
      }
      return true
    }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
          req.flash("error", error.msg)
        })
        res.render("doctorSignup", {
          email: req.body.email,
          messages: req.flash(),
        })
        return
      }
      const { email } = req.body
      const doesExist = await Doctor.findOne({ email })
      if (doesExist) {
        res.redirect("/doctor/signup/")
        return
      }
      const doctor = new Doctor(req.body)
      await doctor.save()
      req.flash("Succes", `${doctor.email} registered succesfull you may login`)
      res.redirect("/doctor/login")
      // res.send(user)
    } catch (error) {
      next(error)
    }
  }
)
//  passport.authenticate("type of stratergy",{options})
//note: login post code is below
router.post(
  "/login",
  passport.authenticate("DoctorMiddleWare", {
    // successRedirect: "/user/profile", //original
    successRedirect: "/doctor/dashboard", //modified
    failureRedirect: "/doctor/login",
    failureFlash: true,
  })
)
router.get("/dashboard", (req, res, next) => {
  console.log("printing dashboard data")
  console.log(req.user)
  console.log(req.doctor)
  doctor = req.user;
  res.render("doctor.ejs", { doctor })
})
//changePassword
router.get("/changePassword", (req, res, next) => {
  res.render("changePassword.ejs")
})
//logout
router.get("/logout", async (req, res, next) => {
  req.logout()
  res.redirect("/")
})

router.get("/viewsubscriber", async (req, res, next) => {
  try {
    console.log("below");
    // console.log(res.locals.user);
    const { _id } = res.locals.user
    console.log(_id)
    const allSubs = await Doctor.findById(_id)
    console.log(allSubs);
    userRegLink = "/doctor/signup"
    // res.render("allUsers.ejs", { allSubs, userRegLink })
    res.send(allSubs)
  } catch (error) {
    console.log("unable to approve")
    console.log(error)
  }
})




module.exports = router
function ensureNOTAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("back")
  } else {
    next()
  }
}
