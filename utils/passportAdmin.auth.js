const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const Admin = require("../models/admin.model")
const User = require("../models/user.model")

passport.use(
  "adminMiddleWare",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const admin = await Admin.findOne({ email }) //mongodb command
        // Username/email does NOT exist
        if (!admin) {
          return done(null, false, {
            message: "Username/email not registered",
          })
        }
        // Email exist and now we need to verify the password
        console.log("password is" + password)
        if (password === "pass") {
          done(null, admin)
        } else {
          done(null, false, { message: "Incorrect password" })
        }
      } catch (error) {
        done(error)
      }
    }
  )
)
//session + cookie automatically for traferring user details if succesfull by decrypting it
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  Admin.findById(id, function (err, user) {
    done(err, user)
  })
})
