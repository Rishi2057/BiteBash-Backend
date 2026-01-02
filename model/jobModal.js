const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    jobType: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default:"Active" },
    date: {type: Date,default: Date.now}
})

const jobs = mongoose.model("jobs", jobSchema)
module.exports = jobs