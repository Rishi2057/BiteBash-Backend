const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: ""
    },
    houseNo: {
        type: String,
        default: ""
    },
    area: {
        type: String,
        default: ""
    },
    landmark: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    }

})




const users = mongoose.model("users", userSchema)
module.exports = users