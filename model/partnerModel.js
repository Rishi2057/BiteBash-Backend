const mongoose = require("mongoose")

const partnerSchema = new mongoose.Schema({
    photo:{type:String,required: true},
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    vehicle: { type: String, required:true },
    vehicleNo: { type: String, required: true },
    status: { type: String, default: "Offline" },
    document: { type: String, required: true },
    orders: { type: String, default: "0"},
    actions: { type: String,default: "Pending" }
})

const partners = mongoose.model("partners", partnerSchema)
module.exports = partners