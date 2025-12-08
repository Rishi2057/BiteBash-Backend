const mongoose = require("mongoose")
// const clients = require("./clientmodel")


const adminSchema = new mongoose.Schema({
    userName: {
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
})





const admins = mongoose.model("admins", adminSchema)
module.exports = admins