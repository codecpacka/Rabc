const express = require("express")
const createHttpError = require("http-errors")
const morgan = require("morgan")
const mongoose = require("mongoose")
const { error } = require("console")
const { reset } = require("nodemon")
require("dotenv").config()
const session = require("express-session")
const connectFlash = require("connect-flash")
const passport = require("passport")
const { ensureLoggedIn } = require("connect-ensure-login")
const mongoStore = require("connect-mongo")
const path = require("path")
const { roles } = require("./utils/constants")

//initialization
const app = express()
// note: the above line should always be first

app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "views/doctor"),
  path.join(__dirname, "views/layouts/adminSubLayouts/"),
  path.join(__dirname, "views/layouts/"),
])

app.use(morgan("dev"))
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false,
  })
)

///init session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure:true,
      httpOnly: true,
    },
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
)
//for passport js authenticaton
app.use(passport.initialize())
app.use(passport.session())
require("./utils/passport.auth")

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

app.use(connectFlash())

app.use((req, res, next) => {
  res.locals.messages = req.flash()
  next()
})

//initial route which will handle "/anyroute"
app.use("/", require("./routes/index.route"))
app.use("/auth", require("./routes/auth.route"))
app.use(
  "/user",
  ensureLoggedIn({ redirectTo: "/auth/login" }),
  require("./routes/user.route")
)
app.use(
  "/admin",
  ensureLoggedIn({ redirectTo: "/auth/login" }),
  ensureAdmin,
  require("./routes/admin.route")
)
//if any route is not handeled
app.use((req, res, next) => {
  next(createHttpError.NotFound())
})
//if error comes from above route

app.use((error, req, res, next) => {
  error.status = error.status || 500
  res.status(error.status)
  res.send(error)
})
//init session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  })
)

//to see which route we are hitting (display on console)

//listening to a port value defined in .env file or by default 3000

mongoose
  .connect("mongodb://localhost:27017/rbac_tutorial", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected")
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err.message)
  })

//port configuration
const PORT = process.env.PORT || 3000

//supporting functions
function ensureAdmin(req, res, next) {
  if (req.user.role === roles.admin) {
    next()
  } else {
    req.flash("warning", "you are not Authorized to see this route")
    res.redirect("/")
  }
}

function ensureModerator(req, res, next) {
  if (req.user.role === roles.moderator) {
    next()
  } else {
    req.flash("warning", "you are not Authorized to see this route")
    res.redirect("/")
  }
}
