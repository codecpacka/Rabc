const mongoose = require("mongoose")
const Doctor = require("./models/doctor.model")
console.log("helo")
mongoose.connect("mongodb://localhost:27017/rbac_tutorial")
testData()
async function testData() {
  try {
    await Doctor.find({ email: "approved@gmail.com" })
      .populate("subscribers")
      .exec(function (err, doctor) {
        try {
          if (err) return handleError(err)
          console.log("The author is %s", doctor.email)
        } catch (e) {
          console.log("error foung")
          console.log(e.message)
        }
      })

    // userdata.subscribers = "62746178a94f423d0fa315f3";
    // userdata[0].subscribers = "62746178a94f423d0fa315f3"
  } catch (error) {
    console.log("error")
    console.log(error.message)
  }
}
