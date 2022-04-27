const router = require("express").Router()
const User = require("../models/user.model")
const { body, validationResult } = require("express-validator")
const passport = require("passport")

router.get("/login", ensureNOTAuthenticated, async (req, res, next) => {
  res.render("login.ejs")
})

router.get("/signup", ensureNOTAuthenticated, async (req, res, next) => {
  req.flash("error", "some error ")
  req.flash("error", "some error 2 ")
  req.flash("info", "some value ")
  req.flash("saved", "some value ")
  // const messages = req.flash()
  // console.log(messages)
  res.render("signup.ejs") //original
  doctor = {
    welcome: "Doctor's Registration",
    apply: "apply for registration",
  }
  res.render("doctorSignup.ejs", { doctor }) //for rendering doctor signup
})
///fix error in routing logout
router.get("/logout", ensureAuthenticated, async (req, res, next) => {
  req.logout()
  res.redirect("/")
})
///post requests

router.post(
  "/login",
  ensureNOTAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/user/profile",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
)
////

router.post(
  "/signup",
  ensureNOTAuthenticated,
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
      const doesExist = await User.findOne({ email })
      if (doesExist) {
        res.redirect("/auth/signin")
        return
      }
      const user = new User(req.body)
      await user.save()
      req.flash("Succes", `${user.email} registered succesfull you may login`)
      res.redirect("/auth/login")
      // res.send(user)
    } catch (error) {
      next(error)
    }
  }
)

////

router.post(
  "/login",
  ensureNOTAuthenticated,
  passport.authenticate("local", {
    // successRedirect: '/',
    successReturnToOrRedirect: "/user/profile",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
)
////

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect("/auth/login")
  }
}

function ensureNOTAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("back")
  } else {
    next()
  }
}

module.exports = router
