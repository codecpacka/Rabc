const mongoose = require("mongoose")
const Doctor = require("./models/doctor.model")
console.log("helo");
mongoose.connect("mongodb://localhost:27017/rbac_tutorial")
testData();
async function testData() {
    try {

        console.log("ping............................");
        const userdata = await Doctor.find({ email: "approved@gmail.com" }).populate("subscribers.sub")
        console.log(userdata);
        // userdata.subscribers = "62746178a94f423d0fa315f3";
        // userdata[0].subscribers = "62746178a94f423d0fa315f3"
        await userdata[0].save();
        console.log(userdata);
        console.log("ping............................");
    } catch (error) {
        console.log("error");
        console.log(error.message);
    }
}
