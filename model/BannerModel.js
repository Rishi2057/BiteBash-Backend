const mongoose = require("mongoose")

const bannerSchema = new mongoose.Schema({
    title: { type: String, default: "Order your Favourite food here" },
    subtitle: { type: String, default: "Choose from a diverse menu featuring a delectable array of dishes crafted with finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience,one delicious meal at time." },
    button: { type: String, default: "View Menu" },
    link: { type: String, default: "all-menu" },
    banner:{type:String,default:"image - header_img.png"}
})

const banners = mongoose.model("banners",bannerSchema)
module.exports = banners