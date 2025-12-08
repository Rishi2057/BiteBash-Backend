const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({

    restuaratName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    profile: {
        type: String,
         required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    cuisine: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
         required: true
    },
    active: {
        type: String,
        default: "offline"
    },
    closing: {
        type: String,
        required: true
    },
    fssai: {
        type: String,
        required: true
    },
    gst: {
        type: String,
        required: true
    },
    open: {
        type: String,
        required: true
    },
    orders: {
        type: String,
        default: "0"
    },
    pan: {
        type: String,
         required: true
    },
    store: {
        type: String,
         required: true
    }


})

const clients = mongoose.model("clients", clientSchema)
module.exports = clients