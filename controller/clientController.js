const clients = require("../model/clientmodel");
const jwt = require("jsonwebtoken")


// register
exports.registerController = async (req, res) => {
    const { restuaratName, email, address, password, phoneNo, cuisine, ownerName, open, closing, fssai, gst, pan } = req.body
    console.log(restuaratName, email, address, password, phoneNo, cuisine, ownerName, open, closing, fssai, gst, pan);

    const store = req.files.store?.[0]?.filename;
    const profile = req.files.profile?.[0]?.filename;

    console.log(store);
    console.log(profile);

    try {
        const existingClient = await clients.findOne({ email })
        if (existingClient) {
            res.status(406).json("Clients already Registered")
        } else {
            console.log("hai");
            try {
                console.log("oooo");
                const newClient = new clients({
                    restuaratName, email, address, password, phoneNo, cuisine, ownerName, open, closing, fssai, gst, pan, store, profile
                })
                console.log("hello");

                await newClient.save()
                // console.log("saved");
                res.status(200).json(newClient)
            } catch (error) {
                res.status(400).json(error)
            }



        }
    } catch (error) {
        res.status(500).json(error)
    }


}

// login

exports.loginController = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password);

    try {
        const existingClient = await clients.findOne({ email })
        if (existingClient) {
            if (existingClient.password == password) {
                const token = jwt.sign({ userMail: existingClient.email }, process.env.secret)
                res.status(200).json({ existingClient, token })
            } else {
                res.status(406).json("Incorrect Credentials")
            }
        } else {
            res.status(500).json("User does not exist")
        }

    } catch (error) {

    }
}

// get all client
exports.getAllClientsController = async (req, res) => {
    try {
        const allClients = await clients.find()
        res.status(200).json(allClients)

    } catch (error) {
        res.status(500).json(error)
    }
}

// get client details controller

exports.getClientDetailsController = async (req, res) => {
    const userMail = req.payload
    try {
        const getClientData = await clients.findOne({ email: userMail })
        res.status(200).json(getClientData)
    } catch (error) {
        res.status(500).json(error)
    }
}

// update client active status
exports.updateActiveStatusController = async (req, res) => {
    const userMail = req.payload
    const { active } = req.body
    try {
        console.log("hai");

        const upDateActive = await clients.findOneAndUpdate({ email: userMail }, { active }, { new: true })
        res.status(200).json(upDateActive)
    } catch (error) {
        res.status(500).json(error)
    }
}

// update client profile
exports.updateclientprofile = async (req, res) => {

    const userMail = req.payload
    console.log(userMail);

    const profile = req.file.filename;
    console.log(profile);


    try {
        const updateProfile = await clients.findOneAndUpdate({ email: userMail }, { profile }, { new: true })
        res.status(200).json(updateProfile)
    } catch (error) {
        res.status(500).json(error)
    }

}

// update storepic
exports.updateStorePicController = async (req, res) => {
    const userMail = req.payload
    const store = req.file.filename

    try {
        const updateStorPic = await clients.findOneAndUpdate({ email: userMail }, { store }, { new: true })
        res.status(200).json(updateStorPic)
    } catch (error) {
        res.status(500).json(error)
    }
}

// update client details
exports.updateClientDetailsController = async (req, res) => {
    const { restuaratName, ownerName, phoneNo, cuisine, address, open, closing } = req.body
    console.log(restuaratName, ownerName, phoneNo, cuisine, address, open, closing);

    const userMail = req.payload

    try {
        const updateDetails = await clients.findOneAndUpdate({ email: userMail }, { restuaratName, ownerName, phoneNo, cuisine, address, open, closing }, { new: true })
        res.status(200).json(updateDetails)
    } catch (error) {
        res.status(500).json(error)
    }
}