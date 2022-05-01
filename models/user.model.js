const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { roles } = require("../utils/constants") //importing roles
const Admin = require("../models/admin.model")
const { json } = require("express/lib/response")

const itemsSchema = new mongoose.Schema({
  foodName: String,
  pro: Number,
  fat: Number,
  cal: Number,
})

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [roles.admin, roles.moderator, roles.client],
    default: roles.client,
  },
  foodConsumed: {
    date: {
      type: String,
      default: "no date ",
    },
    foodItems: [itemsSchema],
  },
})
//this runs whenever someone saves a document
UserSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword
      if (this.email === process.env.ADMIN_EMAIL.toLowerCase()) {
        this.role = roles.admin
        const newAdmin = await new Admin(this)
        await newAdmin.save()
      }
    }
    next()
  } catch (error) {
    next(error)
  }
})

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw createHttpError.InternalServerError(error.message)
  }
}

const User = mongoose.model("User", UserSchema)
module.exports = User
