const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const Doctor = require("../models/doctor.model")

passport.use(
  "DoctorMiddleWare",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const doctor = await Doctor.findOne({ email }) //mongodb command
        // Username/email does NOT exist
        if (!doctor) {
          return done(null, false, {
            message: "Username/email not registered",
          })
        }
        // Email exist and now we need to verify the password
        const isMatch = await doctor.isValidPassword(password)

        if (isMatch) {
          const isapproved = await doctor.isApproved()
          console.log(isapproved)
          if (isapproved) {
            done(null, doctor)
          } else {
            done(null, false, { message: "Request pending " })
          }
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
passport.serializeUser(function (doctor, done) {
  done(null, doctor.id)
})

passport.deserializeUser(function (id, done) {
  Doctor.findById(id, function (err, user) {
    done(err, user)
  })
})
