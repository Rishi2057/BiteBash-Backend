const applications = require("../model/applicationModel")


exports.addApplicationController = async (req, res) => {
    const { fullname, email, qualification, phone, coverletter, jobTitle } = req.body
    const resumepdf = req.file.filename

    console.log(fullname, email, qualification, phone, coverletter, jobTitle);
    console.log(resumepdf);


    try {
        const addApply = new applications({
            fullname, email, qualification, phone, jobTitle, coverletter, resume: resumepdf
        })
        await addApply.save()
        res.status(200).json(addApply)
    } catch (error) {
        res.status(500).json(error)
    }

}


exports.getApplicantionsController = async (req, res) => {
    const {state} = req.params
    console.log(state);
    

    try {
        const getApplicants = await applications.find({jobTitle:state})
        res.status(200).json(getApplicants)
    } catch (error) {
        res.status(500).json(error)
    }
}