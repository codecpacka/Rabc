const Doctor = require("../models/doctor.model")
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
        res.render("signup", { email: req.body.email, messages: req.flash() })
        return
      }
      const { email } = req.body
      const doesExist = await Doctor.findOne({ email })
      if (doesExist) {
        res.redirect("/doctor/signin")
        return
      }
      const doctor = new Doctor(req.body)
      await doctor.save()
      req.flash("Succes", `${doctor.email} registered succesfull you may login`)
      res.redirect("/auth/login")
      // res.send(user)
    } catch (error) {
      next(error)
    }
  }
)

router.get("/dashboard", (req, res, next) => {
  res.render("doctor.ejs")
})
//changePassword
router.get("/changePassword", (req, res, next) => {
  res.render("changePassword.ejs")
})

module.exports = router
