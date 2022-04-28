const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { roles, status } = require("../utils/constants") //importing roles
const DoctorSchema = new mongoose.Schema({
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
    enum: [roles.admin, roles.doctor, roles.client],
    default: roles.doctor,
  },
  status: {
    type: String,
    enum: [status.pending, status.approved],
    default: status.pending,
  },
})
//this runs whenever someone saves a document
DoctorSchema.pre("save", async function (next) {
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

DoctorSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw createHttpError.InternalServerError(error.message)
  }
}

const Doctor = mongoose.model("Doctor", DoctorSchema)
module.exports = Doctor
