const mongoose = require("mongoose")


const foodSchema = new mongoose.Schema({
    picture : { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    email: { type: String, required: true },
    restuarent:{ type: String, required: true }
})


const foods = mongoose.model("foods", foodSchema)
module.exports = foods