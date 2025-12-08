const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    cartItems: [
        {
            name: { type: String, required: true },
            price: { type: String, required: true },
        }
    ],
    status: { type: String, default: "Processing" },
    fullName: { type: String, required: true },
    houseNo: { type: String, required: true },
    landmark: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    fullprice: { type: String, required: true },
    restuarent: { type: String, required: true },
    date: {type: Date,default: Date.now}
})

const orders = mongoose.model("orders", orderSchema)
module.exports = orders