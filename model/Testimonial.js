const mongoose = require("mongoose")

const TestimonialSchema = new mongoose.Schema({

    name:{type:String,required:true},
    email: { type: String, required: true },
    reviewRestuarent: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true },
    pic:{type:String,default:""},
    isReviewed: { type: Boolean, default: true }
})

const testimonials = mongoose.model("testimonials", TestimonialSchema)
module.exports = testimonials