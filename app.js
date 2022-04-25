const express = require("express")
const createHttpError = require("http-errors")
const morgan = require("morgan")
const mongoose = require("mongoose")
const { error } = require("console")
const { reset } = require("nodemon")
const session = require("express-session")
const flash = require("connect-flash")
require("dotenv").config()

const app = express()
app.use(morgan("dev"))
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false,
  })
)
app.use(flash())

//initial route which will handle "/anyroute"
app.use("/", require("./routes/index.route"))
app.use("/auth", require("./routes/auth.route"))
app.use("/user", require("./routes/user.route"))
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
