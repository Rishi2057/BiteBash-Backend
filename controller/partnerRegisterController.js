const partners = require("../model/partnerModel")

exports.partnerRegisterController = async (req, res) => {
    console.log("inside");

    const { name, phone, password, email, vehicle, vehicleNo } = req.body
    console.log(name, phone, password, email, vehicle, vehicleNo);

    const photo = req.files.photo[0].filename
    const document = req.files.document[0].filename
    console.log("Uploaded image:", photo);
    console.log("Upload Document", document);




    const existingPartner = await partners.findOne({ email })
    if (existingPartner) {
        res.status(402).json("Partner Already Registered")
    } else {
        try {
            const newPartner = new partners({
                photo, name, phone, password, email, vehicle, vehicleNo, document
            })
            await newPartner.save()
            res.status(200).json(newPartner)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}




// ----------------------------------adminside------------------------------

// get all partners controller
exports.getAllPartnersController = async (req, res) => {
    try {
        const allPartners = await partners.find()
        res.status(200).json(allPartners)
    } catch (error) {
        res.status(500).json(error)
    }
}


// update partner status 

exports.updatePartnerDetailsController = async (req, res) => {
    const { id } = req.params
    console.log(id);
    const { status } = req.body
    console.log(status);
    try {
        const updatePartnerStatus = await partners.findByIdAndUpdate({ _id: id }, { status }, { new: true })
        res.status(200).json(updatePartnerStatus)
    } catch (error) {
        res.status(500).json(error)
    }
}

// update partner actions status
exports.updatePartnerActionController = async (req, res) => {
    const { id } = req.params
    console.log(id);
    const  {actions}  = req.body
    console.log(actions)

    try {
        const approvePartner = await partners.findByIdAndUpdate({ _id: id }, { actions }, { new: true })
        res.status(200).json(approvePartner)
    } catch (error) {
        res.status(500).json(error)

    }




}