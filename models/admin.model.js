const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { roles } = require("../utils/constants") //importing roles
const AdminSchema = new mongoose.Schema({
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
    default: roles.admin,
  },
})
//this runs whenever someone saves a document
AdminSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword
      if (this.email === process.env.ADMIN_EMAIL.toLowerCase()) {
        this.role = roles.admin
      }
    }
    next()
  } catch (error) {
    next(error)
  }
})

AdminSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw createHttpError.InternalServerError(error.message)
  }
}

const Admin = mongoose.model("Admin", AdminSchema)
module.exports = Admin
