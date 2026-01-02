const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Highly recommended to ensure unique emails
    },
    // --- Fields made optional for Google Auth Flow ---
    password: {
        type: String,
        // Set required to false for Google Auth users
        required: false 
    },
    phoneNumber: {
        type: String,
        // Set required to false for Google Auth users
          default: ""
    },
    // --- UID is required for Google/Firebase users and optional for local users ---
    uid: {
        type: String,
        required: false, // Set to false since local users won't have a Firebase UID
        default: null
    },
    // --- Profile and Address Fields ---
    profile: {
        type: String, // Used for the photoURL from Google
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
});

const users = mongoose.model("users", userSchema);
module.exports = users;