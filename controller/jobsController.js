const jobs = require("../model/jobModal")

exports.addJobController = async (req, res) => {

    const { jobTitle,jobType, location, salary, qualification, experience, description } = req.body
    console.log( jobTitle,jobType, location, salary, qualification, experience, description);
    

    const existingJob = await jobs.findOne({ jobTitle, location })
    console.log(existingJob);
    

    if (existingJob) {
        res.status(401).json("Job Already Added")
    } else {
        try {
            const addjob = new jobs({
                jobTitle,jobType, location, salary, qualification, experience, description
            })
            await addjob.save()
            res.status(200).json(addjob)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

exports.getAllJobsController = async(req,res)=>{
    try {
        const getAllJobs = await jobs.find()
        res.status(200).json(getAllJobs)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.editJobStatusController = async (req,res)=>{
    const {id,status} = req.body
    console.log(id,status);
    

    try {
       const editStatus = await jobs.findByIdAndUpdate({_id:id},{status},{new:true}) 
       res.status(200).json(editStatus)
    } catch (error) {
        res.status(500).json(error)
    }
}